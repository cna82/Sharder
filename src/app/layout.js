// imports
import "./globals.css";
import ClientLayout from "@/Components/ClientLayout";
import { dir } from "i18next";
import Script from "next/script";
// meta datas for seo
export const metadata = {
  title:
    "لوازم خانگی شاردر | خرید چرخ گوشت ، خردکن، آبمیوه‌گیری و محصولات ایرانی اصل با گارانتی",
  description:
    "لوازم خانگی شاردر، تولیدکننده تخصصی چرخ گوشت، خردکن، آبمیوه‌گیری و انواع محصولات برقی ایرانی با کیفیت عالی، طراحی مدرن، قیمت مناسب و گارانتی معتبر. خرید آنلاین، ارسال سریع، خدمات پس از فروش و مشاوره رایگان در سراسر ایران.",
  keywords: [
    "لوازم خانگی شاردر",
    "خرید لوازم خانگی شاردر",
    "شاردر",
    "انواع لوازم خانگی شاردر",
    "چرخ گوشت شاردر",
    "خردکن شاردر",
    "آبمیوه گیری شاردر",
    "محصولات شاردر",
    "لوازم خانگی ایرانی",
    "چرخ گوشت ایرانی",
    "شاردر",
    "شاردز",
    "تولیدکننده لوازم خانگی",
    "خرید آنلاین لوازم خانگی",
    "چرخ گوشت با کیفیت",
    "لوازم خانگی برقی",
    "شاردر محصولات",
    "شاردر لوازم خانگی",
    "بهترین لوازم خانگی ایرانی",
    "لوازم خانگی با گارانتی",
    "لوازم خانگی اصل",
    "لوازم خانگی با کیفیت",
    "لوازم خانگی ارزان",
    "لوازم خانگی مدرن",
    "لوازم خانگی جدید",
    "خرید اینترنتی لوازم خانگی",
    "خرید اینترنتی چرخ گوشت",
    "خرید اینترنتی خردکن",
    "خرید اینترنتی آبمیوه گیری",
    "خرید عمده لوازم خانگی شاردر",
    "خرید محصولات اصل شاردر",
    "خرید لوازم خانگی با ارسال رایگان",
    "خرید لوازم خانگی با مشاوره رایگان",
    "خرید لوازم خانگی با خدمات پس از فروش",
    "خرید لوازم خانگی با گارانتی معتبر",
    "خرید لوازم خانگی با استاندارد ملی",
    "خرید لوازم خانگی دوستدار محیط زیست",
    "خرید لوازم خانگی با بسته بندی ایمن",
    "خرید لوازم خانگی با بیمه کالا",
    "خرید لوازم خانگی با فناوری کم مصرف",
    "خرید لوازم خانگی با متریال قابل بازیافت",
    "خرید لوازم خانگی با طراحی حرفه‌ای",
    "خرید لوازم خانگی با دوام بالا",
    "خرید لوازم خانگی با خدمات حرفه‌ای",
    "خرید لوازم خانگی با پشتیبانی ۲۴ ساعته",
    "خرید لوازم خانگی با ارسال به سراسر ایران",
    "خرید لوازم خانگی با پرداخت آنلاین",
    "خرید لوازم خانگی با ضمانت بازگشت",
    "خرید لوازم خانگی با تخفیف ویژه",
    "خرید لوازم خانگی با جشنواره فروش",
    "خرید لوازم خانگی با امتیاز وفاداری",
    "خرید لوازم خانگی با مشاوره تخصصی",
    "خرید لوازم خانگی با راهنمای استفاده",
    "خرید لوازم خانگی با ویدیو آموزشی",
    "خرید لوازم خانگی با کاتالوگ محصولات",
    "خرید لوازم خانگی با خدمات آنلاین",
    "خرید لوازم خانگی با پشتیبانی تلفنی",
    "خرید لوازم خانگی با ارسال فوری",
    "خرید لوازم خانگی با بسته بندی ویژه",
    "خرید لوازم خانگی با خدمات نصب",
    "خرید لوازم خانگی با خدمات تعمیر",
    "خرید لوازم خانگی با قطعات یدکی",
    "خرید لوازم خانگی با خدمات تعویض",
    "خرید لوازم خانگی با خدمات گارانتی",
    "خرید لوازم خانگی با خدمات پس از فروش",
    "خرید لوازم خانگی با خدمات مشاوره",
    "خرید لوازم خانگی با خدمات پشتیبانی",
    "خرید لوازم خانگی با خدمات ارسال",
    "خرید لوازم خانگی با خدمات بیمه",
    "خرید لوازم خانگی با خدمات بسته بندی",
    "خرید لوازم خانگی با خدمات نصب و راه اندازی",
    "خرید لوازم خانگی با خدمات تعمیر و نگهداری",
    "خرید لوازم خانگی با خدمات تعویض قطعات",
    "خرید لوازم خانگی با خدمات گارانتی و وارانتی",
    "خرید لوازم خانگی با خدمات پس از فروش حرفه‌ای",
    "خرید لوازم خانگی با خدمات مشاوره تخصصی",
    "خرید لوازم خانگی با خدمات پشتیبانی ۲۴ ساعته",
    "خرید لوازم خانگی با خدمات ارسال فوری",
    "خرید لوازم خانگی با خدمات بسته بندی ویژه",
    "خرید لوازم خانگی با خدمات نصب و راه اندازی",
    "خرید لوازم خانگی با خدمات تعمیر و نگهداری",
    "خرید لوازم خانگی با خدمات تعویض قطعات",
    "خرید لوازم خانگی با خدمات گارانتی و وارانتی",
    "خرید لوازم خانگی با خدمات پس از فروش حرفه‌ای",
    "خرید لوازم خانگی با خدمات مشاوره تخصصی",
    "خرید لوازم خانگی با خدمات پشتیبانی ۲۴ ساعته",
    "خرید لوازم خانگی با خدمات ارسال فوری",
    "خرید لوازم خانگی با خدمات بسته بندی ویژه",
    "خرید لوازم خانگی با خدمات نصب و راه اندازی",
    "خرید لوازم خانگی با خدمات تعمیر و نگهداری",
    "خرید لوازم خانگی با خدمات تعویض قطعات",
    "خرید لوازم خانگی با خدمات گارانتی و وارانتی",
  ],
  charset: "utf-8",
  alternates: {
    canonical: "https://sharder.ir",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  author: "شاردر",
  publisher: "شاردر",
  applicationName: "لوازم خانگی شاردر",
  rating: "general",
  category: "لوازم خانگی, چرخ گوشت, خردکن, آبمیوه گیری, محصولات ایرانی",
  subject: "لوازم خانگی شاردر",
  copyright: "© 2025 Sharder. All rights reserved.",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  msapplicationTileColor: "#f3f4f6",
  msapplicationConfig: "/browserconfig.xml",
  appleMobileWebAppTitle: "لوازم خانگی شاردر",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black-translucent",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    title:
      "لوازم خانگی شاردر | خرید چرخ گوشت، خردکن، آبمیوه‌گیری و محصولات ایرانی اصل با گارانتی",
    description:
      "خرید لوازم خانگی شاردر و چرخ گوشت ایرانی با کیفیت عالی و گارانتی معتبر. ارسال سریع، خدمات پس از فروش و مشاوره رایگان به سراسر کشور.",
    url: "https://sharder.ir",
    siteName: "لوازم خانگی شاردر",
    images: [
      {
        url: "https://sharder.ir/images/HeroSection/Hero-section-2.webp",
        width: 1200,
        height: 630,
        alt: "لوازم خانگی شاردر - تولیدکننده چرخ گوشت و محصولات ایرانی",
      },
      {
        url: "https://sharder.ir/images/opengraph.jpg",
        width: 800,
        height: 600,
        alt: "خرید لوازم خانگی شاردر",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sharder_ir",
    creator: "@sharder_ir",
    title: "لوازم خانگی شاردر | بهترین چرخ گوشت و محصولات ایرانی",
    description:
      "لوازم خانگی شاردر، انتخاب اول برای خرید چرخ گوشت، خردکن و محصولات برقی ایرانی با کیفیت و گارانتی معتبر.",
    images: [
      "https://sharder.ir/images/opengraph.jpg",
      "https://sharder.ir/images/HeroSection/Hero-section-2.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

// JSON-LD for organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "لوازم خانگی شاردر",
  url: "https://sharder.ir",
  logo: "https://sharder.ir/images/logo.png",
  sameAs: [
    "https://instagram.com/sharder.co",
    "https://t.me/+988433187",
    "https://www.aparat.com/sharder",
    "https://www.linkedin.com/company/sharder",
    "https://www.youtube.com/@sharder",
  ],
  description:
    "لوازم خانگی شاردر تولیدکننده تخصصی چرخ گوشت، خردکن، آبمیوه‌گیری و محصولات برقی ایرانی با کیفیت بالا، طراحی حرفه‌ای و خدمات پس از فروش. محصولات شاردر با گارانتی معتبر و ارسال سریع به سراسر کشور ارائه می‌شوند.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IR",
    addressLocality: "تهران قرچک",
    streetAddress: "خیابان اصلی، پلاک ۱۲۳",
    postalCode: "1234567890",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+98-21-36917603",
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
      email: "info@sharder.ir",
    },
    {
      "@type": "ContactPoint",
      telephone: "+98-912-1234567",
      contactType: "sales",
      areaServed: "IR",
      availableLanguage: ["fa"],
      email: "sales@sharder.ir",
    },
  ],
  founder: "شرکت شاردر",
  foundingDate: "2010",
  brand: {
    "@type": "Brand",
    name: "شاردر",
    logo: "https://sharder.ir/images/logo.png",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
  },
};

// JSON-LD for FaqSection
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "آیا محصولات لوازم خانگی شاردر تست کیفیت می‌شوند؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله، تمامی محصولات لوازم خانگی شاردر قبل از ارسال از نظر کیفیت بررسی و تست می‌شوند.",
      },
    },
    {
      "@type": "Question",
      name: "چگونه محصولات لوازم خانگی شاردر را خریداری کنم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "شما می‌توانید از طریق تماس مستقیم با واحد فروش شاردر یا خرید آنلاین از سایت، محصولات را تهیه کنید.",
      },
    },
    {
      "@type": "Question",
      name: "شرایط گارانتی محصولات لوازم خانگی شاردر چگونه است؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تمامی محصولات لوازم خانگی شاردر دارای 555 روز وارانتی بی قید و شرط و خدمات پس از فروش حرفه‌ای می‌باشند.",
      },
    },
    {
      "@type": "Question",
      name: "نحوه استفاده صحیح از محصولات لوازم خانگی شاردر را از کجا یاد بگیرم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "راهنمای استفاده در جعبه محصول قرار دارد و همچنین کاتالوگ محصولات لوازم خانگی شاردر در سایت موجود است. ویدیوهای آموزشی نیز در آپارات و یوتیوب شاردر منتشر شده‌اند.",
      },
    },
    {
      "@type": "Question",
      name: "برای وارانتی محصولات لوازم خانگی شاردر به کجا مراجعه کنم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "می‌توانید با خدمات پس از فروش شاردر تماس بگیرید یا فرم درخواست گارانتی را در سایت تکمیل کنید.",
      },
    },
    {
      "@type": "Question",
      name: "جنس تیغه ها در محصولات لوازم خانگی شاردر از چه متریالی هستند؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تمامی تیغه های محصولات لوازم خانگی شاردر از جنس فولاد ضد زنگ و وارداتی هستند که دوام و کیفیت بالایی دارند.",
      },
    },
    {
      "@type": "Question",
      name: "آیا ارسال محصولات لوازم خانگی شاردر به سراسر ایران انجام می‌شود؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله، ارسال محصولات شاردر به تمام شهرهای ایران با بسته‌بندی ایمن و بیمه کالا انجام می‌شود.",
      },
    },
    {
      "@type": "Question",
      name: "آیا محصولات لوازم خانگی شاردر دارای استاندارد ملی ایران هستند؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله، تمامی محصولات شاردر دارای نشان استاندارد ملی ایران و تاییدیه‌های کیفی معتبر می‌باشند.",
      },
    },
    {
      "@type": "Question",
      name: "آیا امکان خرید عمده محصولات لوازم خانگی شاردر وجود دارد؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله، برای خرید عمده و همکاری با شاردر می‌توانید با واحد فروش تماس بگیرید.",
      },
    },
    {
      "@type": "Question",
      name: "آیا محصولات لوازم خانگی شاردر دوستدار محیط زیست هستند؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله، شاردر در تولید محصولات خود از متریال قابل بازیافت و فناوری‌های کم‌مصرف استفاده می‌کند.",
      },
    },
  ],
};
export const viewport={
    themeColor: "#f3f4f6",
 }

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir={dir("fa")}>
      <body>
        {/* Structured Data */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Script
          id="faq-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
