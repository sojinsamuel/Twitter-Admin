import React from "react";
import { Account, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { docClient, ScanCommand } from "@/aws/dynamodb/DynamoDBClient";
import { revalidatePath } from "next/cache";

async function getAccounts(): Promise<any> {
  const command = new ScanCommand({
    ProjectionExpression: "screen_name, active, user_id, activity, keyword",
    TableName: "accounts",
  });

  const response = await docClient.send(command);
  return response.Items;
}

async function Page() {
  const accounts = await getAccounts();
  console.log({ accounts });
  revalidatePath("/accounts");
  return (
    <section className="py-24 bg-gray-100">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">All Accounts</h1>
        <DataTable columns={columns} data={accounts} />
      </div>
    </section>
  );
}

export default Page;
