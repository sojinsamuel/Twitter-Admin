"use server";

import {
  docClient,
  DeleteCommand,
  UpdateCommand,
  PutCommand,
} from "@/aws/dynamodb/DynamoDBClient";
import { revalidatePath } from "next/cache";

export async function deleteRecord(username: string) {
  const command = new DeleteCommand({
    TableName: "accounts",
    Key: {
      screen_name: username,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  revalidatePath("/accounts");
  return response;
}

export async function toggleActivity(
  username: string,
  newActiveStatus: boolean
) {
  const command = new UpdateCommand({
    TableName: "accounts",
    Key: {
      screen_name: username,
    },
    UpdateExpression: "set active = :active, activity = :activity",
    ExpressionAttributeValues: {
      ":active": newActiveStatus,
      ":activity": `${newActiveStatus ? "Alive" : "Sleep"}`,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log(response);
  revalidatePath("/accounts");
  return response;
}

export async function updateKeywords(username: string, keyword: string) {
  const command = new UpdateCommand({
    TableName: "accounts",
    Key: {
      screen_name: username,
    },
    UpdateExpression: "set keyword = :keyword",
    ExpressionAttributeValues: {
      ":keyword": keyword,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  console.log(response);
  revalidatePath("/accounts");
  return response;
}
