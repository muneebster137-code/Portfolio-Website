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

    // Dispatch submission to FormSubmit.co AJAX endpoint (forwards to muneebster137@gmail.com)
    const formSubmitRes = await fetch("https://formsubmit.co/ajax/muneebster137@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        "Project Type": projectType,
        message,
        _captcha: "false",
        _subject: `New Lead: ${name} - ${projectType}`
      })
    });

    if (!formSubmitRes.ok) {
      const errText = await formSubmitRes.text();
      console.error("FormSubmit response error:", errText);
      return NextResponse.json(
        { message: "FormSubmit server failed to accept the email submission." },
        { status: 502 }
      );
    }

    const data = await formSubmitRes.json();
    console.log("[CONTACT FORM SUBMISSION SENT]:", data);

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
