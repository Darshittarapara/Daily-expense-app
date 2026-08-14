import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { removeCookies } from "next-firebase-auth-edge/lib/next/cookies";

export async function GET(request: NextRequest) {
  const response = new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

  // Remove auth cookies securely
  removeCookies(request.headers, response, {
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
  });

  return response;
}
