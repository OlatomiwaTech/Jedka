import { NextResponse } from "next/server";
import { z } from "zod";

const requestOtpSchema = z.object({
  phone: z.string().min(8).max(20),
  countryCode: z.string().min(1).max(6).default("+234"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const payload = requestOtpSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      { ok: false, error: "A valid phone number is required." },
      { status: 400 },
    );
  }

  const otpCode = "123456";

  return NextResponse.json({
    ok: true,
    message: "OTP generated for demo onboarding.",
    phone: `${payload.data.countryCode}${payload.data.phone}`,
    code: otpCode,
  });
}
