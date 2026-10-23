import { NextResponse } from "next/server";

// Receives the contact form. It validates and logs the brief; delivery to muneebster137@gmail.com
// needs an email service (for example Resend) and its API key, which are not set up yet.
export async function POST(request: Request) {
  try {
    const { name, email, brand, service, brief, timeline } = await request.json();

    if (!name || !email || !brief) {
      return NextResponse.json({ message: "Add your name, email and a short brief." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "That email address doesn't look right." }, { status: 400 });
    }

    console.log("[contact]", { name, email, brand, service, brief, timeline });
    return NextResponse.json({ message: "Received." }, { status: 200 });
  } catch (error) {
    console.error("[contact] failed", error);
    return NextResponse.json({ message: "Couldn't send that. Email muneebster137@gmail.com instead." }, { status: 500 });
  }
}
