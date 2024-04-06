import {
  CloudWatchEventsClient,
  PutRuleCommand,
  PutTargetsCommand,
  EnableRuleCommand,
  DisableRuleCommand,
  ListRuleNamesByTargetCommand,
  DescribeRuleCommand,
  ListRulesCommand,
} from "@aws-sdk/client-cloudwatch-events";

const cloudWatchClient = new CloudWatchEventsClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.CLOUD_SERVER_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUD_SERVER_SECRET_ACCESS_KEY!,
  },
});

export {
  cloudWatchClient,
  PutRuleCommand,
  PutTargetsCommand,
  EnableRuleCommand,
  DisableRuleCommand,
  ListRuleNamesByTargetCommand,
  DescribeRuleCommand,
  ListRulesCommand,
};
