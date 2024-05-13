import { NextResponse } from "next/server";
import got from "got";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "querystring";
import {
  docClient,
  PutCommand,
  GetCommand,
} from "@/aws/dynamodb/DynamoDBClient";

export const revalidate = 0;

const consumer_key = process.env.TWITTER_CONSUMER_KEY!;
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET!;

type TokenType = {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
  screen_name: string;
};

// console.log("====================================");
// console.log({ consumer_key, consumer_secret });
// console.log("====================================");

const oauth = new OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString: string, key: string) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

async function accessToken(oauth_token: string, oauth_verifier: string) {
  const request_data = {
    url: "https://api.twitter.com/oauth/access_token",
    method: "POST",
    data: { oauth_verifier },
  };
  const token = { key: oauth_token, secret: "" };
  const authHeader = oauth.toHeader(oauth.authorize(request_data, token));
  const response = await got.post(request_data.url, {
    headers: { Authorization: authHeader.Authorization },
  });
  return qs.parse(response.body);
}

async function createRecord(tableName: string, newToken: any) {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      ...newToken,
      active: true,
      activity: "Alive",
      replyTargets: [],
      ranOnce: false,
      keyword: "javascript",
      undressai_mode: false,
      like_and_retweet: false,
      current_position: 0,
      configuration: "1) First point goes here",
      stats: {
        today: 0,
        yesterday: 0,
        totalValue: 0,
      },
    },
  });

  const response = await docClient.send(command);

  // console.log(response);
  return response;
}

async function getRecord(tableName: string, key: string) {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      screen_name: key,
    },
  });

  const response = await docClient.send(command);
  // const { oauth_token_secret, screen_name, oauth_token } = response.Item;

  // console.log({ oauth_token_secret, screen_name, oauth_token });

  if (response.Item) {
    return true;
  }

  return false;
}

async function createRepliedIdsNewRow(
  screen_name: string,
  tableName = "alreadyReplied"
) {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      screen_name,
      replied_ids: [],
    },
  });

  const response = await docClient.send(command);

  console.log(response);
  return response;
}

export async function POST(req: Request) {
  try {
    const { oauth_token, oauth_verifier } = await req.json();

    const newToken = await accessToken(oauth_token, oauth_verifier);

    // console.log(
    //   "from api route: newToken",
    //   newToken?.oauth_token,
    //   newToken?.oauth_token_secret
    // );

    const tableName = "accounts";

    // const command = new PutCommand({
    //   TableName: tableName,
    //   Item: { ...newToken, active: true },
    // });

    // const response = await docClient.send(command);

    // console.log(response);

    // const result = await createRecord(tableName, newToken);
    const hasAccount = await getRecord(
      tableName,
      newToken?.screen_name as string
    );
    // console.log("from api route", hasAccount);

    if (!hasAccount) {
      console.log("Account not exist. Creating new account...");
      const response = await createRecord(tableName, newToken);
      await createRepliedIdsNewRow(newToken?.screen_name as string);
      // console.log({ response });
    } else {
      console.log("Account exist already");
    }
    return NextResponse.json({
      newToken,
      hasAccount,
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed Access Token", error });
  }
}
