import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import { signJWT } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  const { email } = await req.json();
  const user = await User.findOne({ email });

  if (!user)
    return NextResponse.json({ message: "Email not registered" }, { status: 404 });

  const token = signJWT(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset Link",
    html: `<p>Click below:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  return NextResponse.json({ message: "Email sent" });
}
