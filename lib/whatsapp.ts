export async function sendWhatsAppMessage(to: string, message: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    }),
  });

  const data = await res.json();

  // 🔥 ESTO ES LO QUE TE FALTABA
  console.log("📤 STATUS:", res.status);
  console.log("📤 RESPONSE:", JSON.stringify(data, null, 2));

  return data;
}
