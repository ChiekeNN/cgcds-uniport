import { createApplication } from "@/lib/data";
import { PROGRAMS, SHORT_COURSES } from "@/lib/content";

export const dynamic = "force-dynamic";

const VALID_PROGRAMS = new Set<string>([
  ...PROGRAMS.map((p) => `${p.code} — ${p.fullName}`),
  ...SHORT_COURSES.map((c) => `Short Course — ${c.title}`),
]);

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const str = (k: string, limit = 2000) =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, limit) : "";

  const fullName = str("fullName", 180);
  const email = str("email", 180);
  const phone = str("phone", 40);
  const program = str("program", 200);
  const paymentReference = str("paymentReference", 80);

  const errors: string[] = [];
  if (fullName.length < 3) errors.push("Full name is required.");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("A valid email address is required.");
  if (phone.replace(/\D/g, "").length < 7) errors.push("A reachable phone number is required.");
  if (!str("gender")) errors.push("Please select a gender option.");
  if (!str("stateOfOrigin", 80)) errors.push("State of origin / residence is required.");
  if (!VALID_PROGRAMS.has(program)) errors.push("Please choose a programme offered by the Centre.");
  if (str("qualification", 120).length < 2) errors.push("Highest qualification is required.");
  if (str("institution", 160).length < 2) errors.push("Awarding institution is required.");
  if (paymentReference.length < 3)
    errors.push("Your bank deposit / transfer reference is required.");
  if (body.proofOfPayment !== true)
    errors.push("You must confirm that proof of payment will be uploaded.");

  const isPhd = program.startsWith("PhD");
  if (isPhd && str("researchPlan", 8000).length < 40)
    errors.push("A proposed plan of research (40+ characters) is required for the PhD programme.");
  if (str("statement", 8000).length < 20)
    errors.push("A short statement (20+ characters) is required.");

  if (errors.length) {
    return Response.json({ error: errors.join(" ") }, { status: 422 });
  }

  try {
    const row = await createApplication({
      fullName,
      email,
      phone,
      gender: str("gender", 40),
      stateOfOrigin: str("stateOfOrigin", 80),
      program,
      studyMode: str("studyMode", 40) || "Full-time",
      qualification: str("qualification", 120),
      institution: str("institution", 160),
      grade: str("grade", 40),
      researchPlan: str("researchPlan", 8000),
      statement: str("statement", 8000),
      paymentReference,
      proofOfPayment: true,
    });
    return Response.json(
      { ok: true, reference: row.reference, receivedAt: row.createdAt },
      { status: 201 },
    );
  } catch (error) {
    console.error("[api/applications]", error);
    return Response.json(
      {
        error:
          "The application could not be submitted right now. Please try again, or deliver it in person to the CGCDS Building beside the Faculty of Law, Abuja Campus.",
      },
      { status: 500 },
    );
  }
}
