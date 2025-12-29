// src/app/services/survey/page.jsx

export const metadata = {
  title: "فرم درخواست خدمات | لوازم خانگی شاردر",
  description: " صفحه درخواست خدمات  سایت شاردر  و تولید کننده قطعات صنعتی  و چرخ گوشت ",
};
import ServiceRequestForm from "@/Components/ServiceRequestForm";
import HeroSectionServices from "@/Components/HeroSectionServices";  
  
export default function SurveyPage() {
  return (
    <main>
      <HeroSectionServices title=" درخواست خدمات" />
      <ServiceRequestForm />
    </main>
  );
}
