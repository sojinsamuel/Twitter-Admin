// import { createOrUpdate } from "../../lib/db";

// import { oauth } from "../api/add-account/route";
// import qs from "querystring";
// import got from "got";
import { SuccessMessage, FailedMessage } from "@/components/flags/Message";

// async function accessToken(oauth_token: string, oauth_verifier: string) {
//   const request_data = {
//     url: "https://api.twitter.com/oauth/access_token",
//     method: "POST",
//     data: { oauth_verifier },
//   };
//   const token = { key: oauth_token, secret: "" };
//   const authHeader = oauth.toHeader(oauth.authorize(request_data, token));
//   const response = await got.post(request_data.url, {
//     headers: { Authorization: authHeader.Authorization },
//   });
//   return qs.parse(response.body);
// }

export default function Callback() {
  try {
    // const { oauth_token, oauth_verifier } = props.searchParams;
    // console.log("from callback route", { oauth_token, oauth_verifier });
    // const newToken = await accessToken(oauth_token, oauth_verifier);

    // const stats = {
    //   screen_name: newToken.screen_name,
    //   replies: {
    //     Today: 0,
    //     Yesterday: 0,
    //     "Last Month": 0,
    //   },
    //   repliedTweets: {
    //     authorId: [],
    //     fanId: [],
    //   },
    //   date: new Date().toISOString().split("T")[0],
    // };

    // localStorage.setItem("token", JSON.stringify(newToken));
    // // const { success: tokensAdded } = await createOrUpdate(
    // //   { ...newToken, isActive: true, activity: "Queue" },
    // //   "tokens"
    // // );

    // // const { success: individualStatsSuccess } = await createOrUpdate(
    // //   stats,
    // //   "individualStats"
    // // );
    return <SuccessMessage />;
  } catch (error) {
    return <FailedMessage error={error} />;
  }
}
