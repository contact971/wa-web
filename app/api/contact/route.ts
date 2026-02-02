import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  nom?: string;
  organisation?: string;
  email?: string;
  message?: string;
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function readPayload(req: Request): Promise<Payload> {
  const ct = req.headers.get("content-type") || "";

  // JSON
  if (ct.includes("application/json")) {
    return (await req.json()) as Payload;
  }

  // FormData
  if (
    ct.includes("multipart/form-data") ||
    ct.includes("application/x-www-form-urlencoded")
  ) {
    const fd = await req.formData();
    return {
      nom: String(fd.get("nom") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
  }

  return (await req.json()) as Payload;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "RESEND_API_KEY manquante (Vercel)",
        }),
        { status: 500 }
      );
    }

    const body = await readPayload(req);

    const nom = (body.nom ?? "").trim();
    const organisation = (body.organisation ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!nom || !email || !message) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Champs requis manquants",
        }),
        { status: 400 }
      );
    }

    const subject = `WA-WEB — Nouvelle demande${
      organisation ? ` (${organisation})` : ""
    }`;

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto; line-height:1.5;">
        <h2>Nouvelle demande via wa-web.ca</h2>
        <p>
          <strong>Nom :</strong> ${esc(nom)}<br/>
          <strong>Organisation :</strong> ${esc(organisation || "—")}<br/>
          <strong>Courriel :</strong> ${esc(email)}
        </p>
        <p><strong>Message :</strong></p>
        <pre style="white-space:pre-wrap; background:#f6f7f9; padding:12px; border-radius:8px; border:1px solid #e5e7eb;">
${esc(message)}
        </pre>
      </div>
    `;

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "WA-WEB <onboarding@resend.dev>", // ✅ OBLIGATOIRE
      to: ["william.arsenault@hotmail.ca"],
      replyTo: [email], // ✅ DOIT ÊTRE UN TABLEAU
      subject,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("Contact API error:", err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: err?.message ?? "Erreur serveur",
      }),
      { status: 500 }
    );
  }
}
