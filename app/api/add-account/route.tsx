import { NextResponse } from "next/server";
import got from "got";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import qs from "querystring";

export const revalidate = 0;

const consumer_key = process.env.TWITTER_CONSUMER_KEY!;
const consumer_secret = process.env.TWITTER_CONSUMER_SECRET!;
const callback_url = `${process.env.HOST_URL}/callback`;

// console.log("====================================");
// console.log({ consumer_key, consumer_secret, callback_url });
// console.log("====================================");

const oauth = new OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString: string, key: string) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

async function getAuthorizationURL() {
  const request_data = await requestToken();
  const url = `https://api.twitter.com/oauth/authorize?oauth_token=${request_data.oauth_token}`;
  //   console.log("====================================");
  //   console.log({ url });
  //   console.log("====================================");
  return url;
}

async function requestToken() {
  const request_data = {
    url: "https://api.twitter.com/oauth/request_token",
    method: "POST",
    data: { oauth_callback: callback_url },
  };
  const authHeader = oauth.toHeader(oauth.authorize(request_data));
  const response = await got.post(request_data.url, {
    headers: { Authorization: authHeader.Authorization },
  });
  return qs.parse(response.body);
}

export async function GET(req: Request) {
  try {
    const url = await getAuthorizationURL();
    // console.log("====================================");
    // console.log(url);
    // console.log("====================================");
    return NextResponse.json({
      url,
      message: " successful Token",
    });
  } catch (error) {
    return new NextResponse("Failed Adding Account", { status: 500 });
  }
}
