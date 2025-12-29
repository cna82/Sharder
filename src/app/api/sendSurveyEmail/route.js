// app/api/sendSurveyEmail/route.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function POST(request) {
  try {
    const data = await request.json();
    const { fullName, mobile, q1, q2, q3, q4, q5 } = data;


    if (!fullName || !mobile || !q1 || !q2 || !q3 || !q4 || !q5) {
      return new Response(
        JSON.stringify({ message: "لطفاً نام، موبایل و همه گزینه‌ها را وارد کنید" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlMessage = `
      <div dir="rtl" style="background-color:#fff;padding:32px;font-family:Tahoma,sans-serif;max-width:600px;margin:auto;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
        <div style="background-color:#fb923c;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;">📋 فرم نظرسنجی خدمات پس از فروش</h2>
        </div>
        <div style="padding:20px;color:#1e293b;line-height:1.6;">
          <p><b>نام و نام خانوادگی:</b> ${fullName}</p>
          <p><b>شماره همراه:</b> ${mobile}</p>
          <p><b>سرعت پیگیری در تماس:</b> ${q1}</p>
          <p><b>تسلط اپراتور:</b> ${q2}</p>
          <p><b>رضایت از خدمات:</b> ${q3}</p>
          <p><b>خدمات پس از فروش:</b> ${q4}</p>
          <p><b>ارزیابی محصولات شاردر:</b> ${q5}</p>
        </div>
        <div style="background-color:#f3f4f6;padding:12px;font-size:12px;color:#6b7280;text-align:center;border-radius:0 0 8px 8px;">
          این پیام به‌صورت خودکار از طریق فرم نظرسنجی ارسال شده است.
        </div>
      </div>
    `;


    await transporter.sendMail({
      from: `"فرم نظرسنجی" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "فرم نظرسنجی خدمات پس از فروش",
      html: htmlMessage,
    });

    return new Response(
      JSON.stringify({ message: "ایمیل با موفقیت ارسال شد" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ خطا در ارسال ایمیل:", error);
    return new Response(
      JSON.stringify({ message: "خطا در ارسال ایمیل. لطفاً بعداً دوباره تلاش کنید." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
