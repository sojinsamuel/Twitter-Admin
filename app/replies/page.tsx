import { docClient, ScanCommand } from "@/aws/dynamodb/DynamoDBClient";

import { Tweet } from "react-tweet";
import Stats from "@/components/stats";

async function getAccounts(): Promise<any> {
  const command = new ScanCommand({
    ProjectionExpression: "screen_name,  replyTargets, stats",
    TableName: "accounts",
  });

  const response = await docClient.send(command);
  return response.Items;
}

export default async function Replies() {
  const result = await getAccounts();
  console.log(result);

  if (result.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#0f0f0f] to-[#222222] min-h-screen flex flex-col items-center justify-center text-white p-4 ">
        <h1 className="text-6xl font-bold text-center">No replies found</h1>
        <p className="mt-4 text-xl text-center">
          Please add some accounts to get started
        </p>
      </div>
    );
  }
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32 bg-gradient-to-br from-[#0f0f0f] to-[#222222]">
        {result.map((account: any, index: any) => {
          return (
            <>
              <div className="text-center ">
                <h2
                  className={`text-white text-3xl font-semibold md:text-5xl  ${
                    index > 0 ? "mt-20" : "-mt-14"
                  }`}
                >
                  @{account.screen_name}
                </h2>
                <p className="mx-auto mb-8 mt-4 max-w-[528px] text-[#636262] md:mb-12 lg:mb-16">
                  Replies generated by @{account.screen_name} in the past days{" "}
                </p>
              </div>
              <Stats
                username={account.screen_name}
                replies={account.replyTargets.length}
                yesterday={account.stats.yesterday}
                total={account.stats.totalValue}
              />
              <div className="mx-auto grid max-w-[1040px] grid-cols-2 justify-items-center gap-4 sm:grid-cols-5 sm:justify-items-stretch md:grid-cols-3 md:gap-4 lg:gap-6 overflow-auto h-[500px] px-7">
                {account.replyTargets.map((tweet: any) => {
                  return (
                    <div key={tweet} className="">
                      <Tweet id={tweet} />
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
