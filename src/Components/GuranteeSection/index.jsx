"use client";
//imports
import React from "react";
import { ShieldCheck, AlertCircle, Clock, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const WarrantySection = () => {
  return (
    <section className="bg-gray-200  py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center mb-10 sm:mb-12 gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShieldCheck className="w-10 h-10 text-sky-500" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-900 text-center sm:text-left">
            شرایط و ضوابط گارانتی و وارانتی
          </h2>
        </motion.div>

        {/* Intro */}
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg mb-14 sm:mb-16 border-l-4 sm:border-l-8 border-sky-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="mb-4 text-gray-800 leading-relaxed text-sm sm:text-base">
            <span className="font-semibold text-teal-900">مصرف‌کننده گرامی:</span> با سپاس از خرید شما،
            لطفاً برای بهره‌مندی از مزایای گارانتی، موارد مندرج در پشت ضمانت‌نامه را به دقت مطالعه فرمایید.
          </p>
          <p className="mb-4 text-gray-800 leading-relaxed text-sm sm:text-base">
            پیش از استفاده و راه‌اندازی، حتماً دفترچه راهنمای دستگاه را به طور کامل مطالعه کنید تا از عملکرد بهینه محصول
            اطمینان حاصل نمایید.
          </p>
          <p className="flex items-center text-gray-800 leading-relaxed text-sm sm:text-base">
            <Link2 className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0" />
            مطالعه آیین‌نامه اجرایی حمایت از حقوق مصرف‌کنندگان:&nbsp;
            <a
              href="https://irangs.ir/Home/Documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 underline break-all"
            >
              irangs.ir/Home/Documentation
            </a>
          </p>
        </motion.div>

        <div className="space-y-10 sm:space-y-12">
          {/* Part A */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-l-4 sm:border-l-8 border-sky-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-sky-500 mr-2 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-900">
                الف - شرایط عمومی گارانتی
              </h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-800 leading-relaxed text-sm sm:text-base">
              <li>برگ ضمانت‌نامه معتبر با هولوگرام جهت برخورداری از گارانتی الزامی است.</li>
              <li>شروع گارانتی دستگاه‌های با نصب الزامی از تاریخ نصب رسمی در کارت ضمانت‌نامه محاسبه می‌شود.</li>
              <li>ارائه برگ ضمانت‌نامه جهت استفاده از خدمات گارانتی ضروری است.</li>
              <li>خدمات گارانتی تنها در مراکز مجاز و در محل تعمیرگاه ارائه می‌گردد.</li>
              <li>برای دستگاه‌های فاقد نصب الزامی، شروع گارانتی از تاریخ فاکتور فروش معتبر محاسبه می‌شود.</li>
              <li>عیوب ذاتی ناشی از طراحی یا متریال در دوره گارانتی شامل تعویض قطعه و اجرت تعمیر رایگان است.</li>
            </ol>
          </motion.div>

          {/* Part B */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-l-4 sm:border-l-8 border-sky-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-sky-500 mr-2 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-900">
                ب - شرایط عدم‌اجرای ضمانت‌نامه
              </h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-800 leading-relaxed text-sm sm:text-base">
              <li>آسیب‌های ناشی از ضربه، آب، آتش، گردوغبار شدید، نوسانات برق و حوادث طبیعی.</li>
              <li>استفاده خارج از استاندارد یا عدم رعایت نکات دفترچه راهنما.</li>
              <li>تعمیرات توسط افراد غیرمجاز یا دستکاری دستگاه.</li>
              <li>هرگونه دستکاری فیزیکی کارت ضمانت‌نامه یا فاکتور خرید.</li>
            </ol>
          </motion.div>

          {/* Part C */}
          <motion.div
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border-l-4 sm:border-l-8 border-sky-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-sky-500 mr-2 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-900">
                ج - مدت زمان گارانتی و وارانتی
              </h3>
            </div>
            <p className="mb-4 text-gray-800 leading-relaxed text-sm sm:text-base">
              شرکت فیدار تجارت با اطمینان از کیفیت محصولات شاردر، ضمانت 24 ماهه و وارانتی تأمین قطعات 60 ماهه ارائه می‌دهد.
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-800 leading-relaxed text-sm sm:text-base">
              <li>
                گارانتی: <span className="font-semibold text-teal-900">24 ماه</span>
              </li>
              <li>
                وارانتی (تأمین قطعات): <span className="font-semibold text-teal-900">60 ماه</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-800 leading-relaxed text-sm sm:text-base">
              موارد مستثنی از خدمات رایگان تا پایان دوره و خارج از آن:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-800 leading-relaxed text-sm sm:text-base">
              <li>قطعات مصرفی و لوازم جانبی اضافی.</li>
              <li>عیوب ناشی از نگهداری نامناسب یا استفاده نادرست.</li>
              <li>نصب یا تعمیر توسط افراد غیرمجاز.</li>
              <li>خدمات جابجایی و نصب مجدد دستگاه‌ها.</li>
              <li>استفاده از ملحقات غیرمتعارف یا اقلام اضافی.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default WarrantySection;
