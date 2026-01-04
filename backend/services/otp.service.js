import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Verify your account",
    html: `<h3>Your OTP is <b>${otp}</b></h3><p>Valid for 5 minutes</p>`,
  });
};
