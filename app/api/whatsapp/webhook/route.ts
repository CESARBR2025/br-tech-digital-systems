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
  console.log("🔥 ENTRÓ AL WEBHOOK POST");
  const body = await req.json();
  console.log("🚀 WEBHOOK HIT");
  console.log("BODY:", JSON.stringify(body, null, 2));

  try {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return Response.json({ ok: true });
    }

    const from = message.from;
    const text = message.text?.body;
    console.log("📩 MENSAJE:", text);
    console.log("📤 ENVIANDO RESPUESTA A:", from);

    console.log("📩 Mensaje recibido:", text);

    // 🤖 BOT SIMPLE
    let reply = "No entendí tu mensaje 🤔";

    if (text?.toLowerCase().includes("hola")) {
      reply = "👋 Hola! Bienvenido a BR TECH SJR";
    }

    if (text?.toLowerCase().includes("precio")) {
      reply = "💰 Claro, dime qué producto necesitas";
    }

    // 📤 RESPONDER
    const result = await sendWhatsAppMessage(from, reply);
    console.log("📤 SEND RESULT:s", result);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("ERROR WEBHOOK:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
