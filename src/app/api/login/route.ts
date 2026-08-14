import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { appendAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const { getCustomIdAndRefreshTokens } = getFirebaseAuth(
    authConfig.serviceAccount,
    authConfig.apiKey
  );

  try {
    const { idToken, refreshToken } = await getCustomIdAndRefreshTokens(token);

    const response = new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

    await appendAuthCookies(request.headers, response, { idToken, refreshToken, metadata: {} }, {
      ...authConfig,
    });

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
