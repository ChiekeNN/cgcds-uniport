import { createInquiry } from "@/lib/data";

export const dynamic = "force-dynamic";

const MAX = 4000;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const str = (k: string, fallback = "") =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, MAX) : fallback;

  // honeypot — the original form carries a "Leave Empty" field
  if (str("leave_empty")) {
    return Response.json({ ok: true, reference: "SPAM-0000" });
  }

  const name = str("name");
  const email = str("email");
  const message = str("message");

  if (name.length < 2) {
    return Response.json({ error: "Please provide your name." }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 422 });
  }
  if (message.length < 12) {
    return Response.json(
      { error: "Your message should be at least 12 characters." },
      { status: 422 },
    );
  }

  try {
    const row = await createInquiry({
      name,
      email,
      phone: str("phone").slice(0, 40),
      webUrl: str("webUrl").slice(0, 300),
      subject: str("subject").slice(0, 160),
      message,
    });
    return Response.json(
      {
        ok: true,
        reference: `INQ-${String(row.id).padStart(5, "0")}`,
        receivedAt: row.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/inquiries]", error);
    return Response.json(
      {
        error:
          "Your message could not be stored right now. Please call +234 806 268 3883 or email info@cgcds.com.ng.",
      },
      { status: 500 },
    );
  }
}
