import { Brain, TreeDeciduous } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="gradient-header py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center backdrop-blur-sm">
            <TreeDeciduous className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-primary-foreground">
              Loan Approval Prediction System
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/70 mt-1">
              Decision Tree Model using All Dataset Attributes
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2 backdrop-blur-sm">
          <Brain className="w-5 h-5 text-primary-foreground/80" />
          <span className="text-sm font-medium text-primary-foreground/80">ML Powered</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
