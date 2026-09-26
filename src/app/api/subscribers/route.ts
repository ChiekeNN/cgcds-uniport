import { createSubscriber } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const interest =
    typeof body.interest === "string" ? body.interest.trim().slice(0, 60) : "Admission updates";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 422 });
  }

  try {
    await createSubscriber(email, interest);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[api/subscribers]", error);
    return Response.json(
      { error: "Could not subscribe right now. Email info@cgcds.com.ng instead." },
      { status: 500 },
    );
  }
}
