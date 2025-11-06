import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { type, value } = await req.json();

    if (!value || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "email") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: value,
        subject: "Your login link from Zomato Clone 🍽️",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>Welcome back!</h2>
            <p>Click below to sign in instantly:</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin" 
              style="background:#E23744;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
              Sign In
            </a>
            <p>Link valid for 10 minutes.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: "Email sent successfully" });
    }

    if (type === "phone") {
      console.log(`Would send link to phone: ${value}`);
      return NextResponse.json({ message: "Phone link logic placeholder" });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (err) {
    console.error("Send link error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
