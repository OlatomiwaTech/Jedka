import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

const verifyOtpSchema = z.object({
  phone: z.string().min(8).max(25),
  code: z.string().min(4).max(8),
  displayName: z.string().min(2).max(40).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const payload = verifyOtpSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      { ok: false, error: "Provide a valid OTP, phone number, and display name if needed." },
      { status: 400 },
    );
  }

  if (payload.data.code !== "123456") {
    return NextResponse.json({ ok: false, error: "Invalid OTP." }, { status: 401 });
  }

  const token = jwt.sign(
    {
      sub: payload.data.phone,
      phone: payload.data.phone,
      role: "user",
    },
    process.env.JWT_SECRET ?? "chatwave-dev-secret",
    { expiresIn: "7d" },
  );

  const response = NextResponse.json({
    ok: true,
    message: "Authentication succeeded.",
    user: {
      id: "demo-user-1",
      phone: payload.data.phone,
      displayName: payload.data.displayName ?? "ChatWave User",
    },
  });

  response.cookies.set("chatwave_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
