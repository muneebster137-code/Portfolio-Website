import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please supply a valid email address." },
        { status: 400 }
      );
    }

    // Simulate sending time (e.g. SMTP handshake or third party API request)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Console logging message details for Vercel/local developer logs
    console.log(`[CONTACT FORM SUBMISSION]`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Type: ${projectType}`);
    console.log(`Message: ${message}`);

    return NextResponse.json(
      { message: "Message successfully dispatched." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API routing error:", error);
    return NextResponse.json(
      { message: "Internal server error occurred while processing message." },
      { status: 500 }
    );
  }
}
