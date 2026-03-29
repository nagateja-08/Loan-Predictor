import DashboardHeader from "@/components/DashboardHeader";

import DatasetTable from "@/components/DatasetTable";
import PredictionForm from "@/components/PredictionForm";
import ModelInfo from "@/components/ModelInfo";
import DashboardFooter from "@/components/DashboardFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 space-y-8">
        
        <PredictionForm />
        <DatasetTable />
        <ModelInfo />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default Index;
