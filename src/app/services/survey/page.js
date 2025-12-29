// src/app/services/survey/page.jsx

export const metadata = {
  title: "فرم نظر سنجی | لوازم خانگی شاردر",
  description: " صفحه نظر سنجی  سایت شاردر  و تولید کننده قطعات صنعتی  و چرخ گوشت ",
};
import HeroSectionServices from "@/Components/HeroSectionServices";  
import SurveyForm from "@/Components/SurveyForm";             

export default function SurveyPage() {
  return (
    <main>
      <HeroSectionServices title=" نظرسنجی" />
      <SurveyForm />
    </main>
  );
}
