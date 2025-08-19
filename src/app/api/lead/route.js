export async function POST(req) {
  try {
    const payload = await req.json();
    // TODO: brancher ton ESP/CRM ici (Brevo, MailerLite, Airtable, Supabase, etc.)
    console.log("Nouveau lead quiz:", payload);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Lead error:", e);
    return new Response(JSON.stringify({ ok: false, error: "invalid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
