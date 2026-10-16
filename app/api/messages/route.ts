import { NextResponse } from "next/server";
import { z } from "zod";

const messageSchema = z.object({
  conversationId: z.string().min(1),
  senderId: z.string().min(1),
  body: z.string().max(4000).optional(),
  type: z.enum(["TEXT", "IMAGE", "VIDEO", "AUDIO", "SYSTEM"]).default("TEXT"),
});

const initialMessages = [
  {
    id: "m1",
    conversationId: "conv-demo",
    senderId: "user-1",
    body: "Hey there! I just set up ChatWave.",
    type: "TEXT",
    createdAt: new Date().toISOString(),
  },
  {
    id: "m2",
    conversationId: "conv-demo",
    senderId: "user-2",
    body: "Looks great — I can already feel the new app coming together.",
    type: "TEXT",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ ok: true, messages: initialMessages });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const payload = messageSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json({ ok: false, error: "Invalid message payload." }, { status: 400 });
  }

  const message = {
    id: crypto.randomUUID(),
    ...payload.data,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ ok: true, message });
}
