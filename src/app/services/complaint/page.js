// src/app/services/complaint/page.jsx
export const metadata = {
  title: "فرم ثبت شکایت | لوازم خانگی شاردر",
  description: " صفحه ثبت شکایت  سایت شاردر  و تولید کننده قطعات صنعتی  و چرخ گوشت ",
};

import HeroSectionServices from "@/Components/HeroSectionServices";
import ComplaintForm from "@/Components/ComplaintForm";

export default function ComplaintPage() {
  return (
    <main>
      <HeroSectionServices title=" ثبت شکایت" />
      <ComplaintForm />
    </main>
  );
}
