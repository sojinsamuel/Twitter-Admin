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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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
