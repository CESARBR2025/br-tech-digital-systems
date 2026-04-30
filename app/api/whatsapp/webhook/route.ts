import { sendWhatsAppMessage } from "@/lib/whatsapp";
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

export async function POST(req: Request) {
  const body = await req.json();

  // 1. Extraer datos del mensaje
  const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  const business_id =
    body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;

  if (message) {
    const sender = message.from; // El número que te escribió
    const text = message.text?.body; // Lo que te escribió

    // 2. Responder al mensaje
    await fetch(`https://graph.facebook.com/v21.0/${business_id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: sender,
        type: "text",
        text: { body: `Recibí tu mensaje: "${text}". Soy un bot.` },
      }),
    });
  }

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
