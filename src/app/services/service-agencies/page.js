// src/app/services/complaint/page.jsx
export const metadata = {
    title: "لیست نمایندگی ها و شرایط گارانتی شاردر | لوازم خانگی شاردر",
    description: " صفحه لیست نمایندگی ها و شرایط گارانتی شاردر  سایت شاردر  و تولید کننده قطعات صنعتی  و چرخ گوشت ",
};

import AgencyTable from "@/Components/AgantTable";
import GutranteeSection from "@/Components/GuranteeSection";

const AgencyPage = () => {
    return (
        <main>
            <GutranteeSection/>
            <AgencyTable />
        </main>
    );
}
export default AgencyPage;