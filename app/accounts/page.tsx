import React from "react";
import { Account, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { docClient, ScanCommand } from "@/aws/dynamodb/DynamoDBClient";
import { revalidatePath } from "next/cache";
import {
  ListRulesCommand,
  cloudWatchClient,
} from "@/aws/cloudwatch/CloudWatchClient";

async function getAccounts(): Promise<any> {
  const command = new ScanCommand({
    ProjectionExpression:
      "screen_name, active, user_id, activity, keyword, undressai_mode, configuration, replyTargets, like_and_retweet",
    TableName: "accounts",
  });

  const response = await docClient.send(command);
  return response.Items;
}

async function listAllRules(): Promise<any> {
  const listRulesCommand = new ListRulesCommand({});
  try {
    const rulesList = await cloudWatchClient.send(listRulesCommand);
    // console.log("List of all CloudWatch Events rules:", rulesList.Rules);
    return rulesList.Rules;
  } catch (error) {
    console.error("Error listing CloudWatch Events rules:", error);
    throw error;
  }
}

async function mergeAccountsAndRules(accs: any, rules: any) {
  const mergeData = [];
  for (const acc of accs) {
    const { screen_name } = acc;
    const ruleName = `${screen_name}ScheduleRule`;
    const matchRuleFound = rules.find((rule: any) => rule.Name === ruleName);
    if (!matchRuleFound) {
      console.log(`Rule ${ruleName} not found`);
      continue;
    }
    mergeData.push({ ...acc, ...matchRuleFound });
  }
  console.log(mergeData);
  return mergeData;
}

async function Page() {
  const accounts = await getAccounts();
  const rules = await listAllRules();
  console.log(accounts);
  const combinedRes = await mergeAccountsAndRules(accounts, rules);
  console.log(combinedRes);
  revalidatePath("/accounts");
  return (
    <section className="py-24 bg-gray-100">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">All Accounts</h1>
        <DataTable columns={columns} data={combinedRes} />
      </div>
    </section>
  );
}

export default Page;
