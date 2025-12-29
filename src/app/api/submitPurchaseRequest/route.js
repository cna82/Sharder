// app/api/submitPurchaseRequest/route.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      fullName,
      mobile,
      provinceTitle,
      cityTitle,
      productTitle,
      description
    } = data;

    if (!fullName || !mobile || !provinceTitle || !cityTitle || !productTitle || !description) {
      return new Response(JSON.stringify({ message: "لطفاً همهٔ فیلدهای ضروری را تکمیل کنید" }), { status: 400, headers:{ "Content-Type":"application/json" } });
    }


    const htmlMessage = `
      <div dir="rtl" style="font-family:Tahoma; padding:20px; max-width:600px; margin:auto;">
        <h2 style="color:#2563eb; border-bottom:1px solid #eee; padding-bottom:10px;">
          📩 درخواست خرید جدید
        </h2>
        <p><strong>👤 نام و نام خانوادگی:</strong> ${fullName}</p>
        <p><strong>📱 شماره موبایل:</strong> ${mobile}</p>
        <p><strong>📍 موقعیت:</strong> ${provinceTitle} - ${cityTitle}</p>
        <p><strong>🛒 محصول درخواستی:</strong> ${productTitle}</p>
        <div style="margin-top:20px; padding:15px; background-color:#f8f9fa; border-radius:5px;">
          <h3 style="margin-top:0; color:#dc3545;">🔧 توضیحات مشکل:</h3>
          <p style="white-space:pre-line;">${description}</p>
        </div>
        <div style="margin-top:20px; font-size:12px; color:#6c757d; text-align:center; border-top:1px solid #eee; padding-top:10px;">
          این ایمیل به صورت خودکار ارسال شده است
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"فرم درخواست خرید" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `🛒 درخواست خرید جدید: ${productTitle}`,
      html: htmlMessage,
    });

    return new Response(JSON.stringify({ message: "درخواست با موفقیت ارسال شد" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error in submitPurchaseRequest:", err);
    return new Response(JSON.stringify({ message: "خطای سرور" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
