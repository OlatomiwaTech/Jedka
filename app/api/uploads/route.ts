import { NextResponse } from "next/server";
import { z } from "zod";

const uploadSchema = z.object({
  fileName: z.string().min(1).max(200).optional(),
  mimeType: z.string().optional(),
  sizeBytes: z.number().max(25 * 1024 * 1024).optional(),
});

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return NextResponse.json({ ok: false, error: "No upload payload provided." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Expected a file upload." }, { status: 400 });
  }

  const data = uploadSchema.parse({
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  });

  if (!data.mimeType || !data.mimeType.startsWith("image/") && !data.mimeType.startsWith("video/") && !data.mimeType.startsWith("audio/") && !data.mimeType.startsWith("application/")) {
    return NextResponse.json({ ok: false, error: "Unsupported media type." }, { status: 415 });
  }

  const extension = data.fileName?.split(".").pop()?.toLowerCase() ?? "bin";
  const key = `${crypto.randomUUID()}.${extension}`;
  const url = `https://cdn.example.com/${key}`;

  return NextResponse.json({
    ok: true,
    asset: {
      id: crypto.randomUUID(),
      key,
      url,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes ?? 0,
    },
  });
}
