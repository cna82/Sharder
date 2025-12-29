
// app/api/sendWarrantyEmail/route.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { products } from "@/lib/data/products";  

dotenv.config();

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("📥 Incoming warranty data:", data);

    const { fullName, mobile, nationalId, purchaseDate, productId, serial } = data;
    if (!fullName || !mobile || !nationalId || !purchaseDate || !productId || !serial) {
      return new Response(
        JSON.stringify({ message: "لطفاً همهٔ فیلدها را تکمیل کنید." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const matched = products.find((p) => String(p.id) === String(productId));
    const productTitle = matched
      ? matched.title
      : `شناسه محصول: ${productId}`;


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlMessage = `
      <div dir="rtl" style="padding:20px;font-family:Tahoma,sans-serif;">
        <h2>📄 فرم ثبت گارانتی</h2>
        <p><b>نام:</b> ${fullName}</p>
        <p><b>موبایل:</b> ${mobile}</p>
        <p><b>کد ملی:</b> ${nationalId}</p>
        <p><b>تاریخ خرید:</b> ${purchaseDate}</p>
        <p><b>محصول:</b> ${productTitle}</p>
        <p><b>سریال:</b> ${serial}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"فرم گارانتی" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "🛠️ ثبت گارانتی جدید",
      html: htmlMessage,
    });

    return new Response(
      JSON.stringify({ message: "گارانتی با موفقیت ثبت شد" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Warranty API error:", err);
    return new Response(
      JSON.stringify({ message: "خطا در ارسال گارانتی. لطفاً بعداً تلاش کنید." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
