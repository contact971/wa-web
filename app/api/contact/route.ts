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

  // 1) JSON (fetch avec JSON.stringify)
  if (ct.includes("application/json")) {
    return (await req.json()) as Payload;
  }

  // 2) FormData (fetch avec new FormData(form))
  if (ct.includes("multipart/form-data") || ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    return {
      nom: String(fd.get("nom") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
  }

  // fallback: tenter json quand même
  return (await req.json()) as Payload;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // IMPORTANT: on renvoie l’erreur explicite (sinon tu devines dans le noir)
      return new Response(
        JSON.stringify({ ok: false, error: "RESEND_API_KEY manquante (Vercel env)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await readPayload(req);

    const nom = (body.nom ?? "").trim();
    const organisation = (body.organisation ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!nom || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Champs requis manquants" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const subject = `WA-WEB — Nouvelle demande${organisation ? ` (${organisation})` : ""}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Nouvelle demande via wa-web</h2>
        <p style="margin:0 0 12px;">
          <strong>Nom :</strong> ${esc(nom)}<br/>
          <strong>Organisation :</strong> ${esc(organisation || "—")}<br/>
          <strong>Courriel :</strong> ${esc(email)}
        </p>
        <p style="margin:0 0 6px;"><strong>Message :</strong></p>
        <pre style="white-space:pre-wrap; background:#f6f7f9; padding:12px; border-radius:8px; border:1px solid #e5e7eb;">${esc(message)}</pre>
      </div>
    `;

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "WA-WEB <onboarding@resend.dev>",
      to: ["william.arsenault@hotmail.ca"],
      replyTo: email,
      subject,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    // on LOG et on renvoie une version lisible pour toi
    console.error("Contact API error:", err);

    return new Response(
      JSON.stringify({
        ok: false,
        error: err?.message ? String(err.message) : "Erreur serveur",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
