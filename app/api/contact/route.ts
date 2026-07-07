import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, company, subject, message } = parsed.data;

    // Log submission (replace with email service, CRM, or database call)
    console.log("[Contact Form Submission]", {
      name: `${firstName} ${lastName}`,
      email,
      phone: phone ?? "not provided",
      company: company ?? "not provided",
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: integrate with email provider (e.g. Resend, SendGrid, Postmark)
    // await sendEmail({ to: "hello@pentacipher.com", from: email, subject, body: message })

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
