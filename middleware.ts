import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const tokens = {
      oauth_token: req.nextUrl.searchParams.get("oauth_token") ?? "null",
      oauth_verifier: req.nextUrl.searchParams.get("oauth_verifier") ?? "null",
    };
    // console.log(tokens, "From middleware: tokens");

    if (tokens.oauth_token === "null" || tokens.oauth_verifier === "null") {
      throw new Error("Token not found");
    }

    const res = await fetch(`${process.env.HOST_URL}/api/get-accesstoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokens),
    });

    // console.log(res.status);

    const data = await res.json();
    // console.log(data, "From middleware: data");
    // if (data.message === "Failed Token") {
    //   throw new Error("Failed Token");
    // }
    return NextResponse.redirect(new URL("/waiting", req.url));
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/callback"],
};
