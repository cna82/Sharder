// app/api/sendComplaintEmail/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { fullName, mobile, province, city, complaint } = await request.json();

 
    if (!fullName || !mobile || !province || !city || !complaint) {
      return new Response(
        JSON.stringify({ message: "لطفاً همه فیلدها را تکمیل کنید" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div dir="rtl" style="font-family:Tahoma,sans-serif; max-width:600px; margin:auto; padding:20px; background:#fff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color:#fb923c; margin-bottom:16px;">📨 فرم ثبت شکایت</h2>
        <p><b>نام و نام خانوادگی:</b> ${fullName}</p>
        <p><b>شماره موبایل:</b> ${mobile}</p>
        <p><b>استان:</b> ${province}</p>
        <p><b>شهر:</b> ${city}</p>
        <div style="margin-top:16px; padding:12px; background:#f3f4f6; border-radius:4px;">
          <strong>شرح شکایت:</strong>
          <p style="margin:8px 0;">${complaint.replace(/\n/g, "<br>")}</p>
        </div>
        <footer style="margin-top:20px; font-size:12px; color:#6b7280; text-align:center;">
          این پیام به صورت خودکار از طریق فرم ثبت شکایت ارسال شده است.
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `"فرم شکایت" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "🔴 ثبت شکایت جدید",
      html,
    });

    return new Response(
      JSON.stringify({ message: "شکایت با موفقیت ارسال شد" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error in sendComplaintEmail:", err);
    return new Response(
      JSON.stringify({ message: "خطا در ارسال شکایت. لطفاً بعداً تلاش کنید." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
