import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// NodeMailer setup using Gmail SMTP. You must set EMAIL_USER and EMAIL_PASS
// (app password) in your environment. Example in .env:
//   EMAIL_USER=youremail@gmail.com
//   EMAIL_PASS=your_app_password

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.email,
      to: process.env.EMAIL_USER,
      subject: `New contact form submission from ${data.name}`,
      text: data.message,
      html: `<p><strong>Name:</strong> ${data.name}</p>
             <p><strong>Email:</strong> ${data.email}</p>
             <p>${data.message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message || "Error" },
      { status: 500 },
    );
  }
}
