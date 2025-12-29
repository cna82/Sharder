// src/app/services/warranty/page.jsx

export const metadata = {
  title: "فرم ثبت گارانتی | لوازم خانگی شاردر",
  description: " صفحه ثبت گارانتی  سایت شاردر  و تولید کننده قطعات صنعتی  و چرخ گوشت ",
};
import HeroSectionServices from "@/Components/HeroSectionServices";
import WarrantyForm from "@/Components/WarrantyForm";

export default function WarrantyPage() {
  return (
    <main>
      <HeroSectionServices title=" ثبت گارانتی" />
      <WarrantyForm />
    </main>
  );
}
  