import { NextRequest, NextResponse } from "next/server";

// Token que tú defines en Meta
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("📩 Mensaje de WhatsApp:", JSON.stringify(body, null, 2));

  // Aquí después:
  // - guardar en DB
  // - responder automático
  // - enviar a frontend real-time

  return NextResponse.json({ ok: true });
}
