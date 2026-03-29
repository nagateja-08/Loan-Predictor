import { TreeDeciduous, Heart } from "lucide-react";

const DashboardFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TreeDeciduous className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold font-display text-foreground">
            Loan Approval Prediction System
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Built with <Heart className="w-3.5 h-3.5 inline text-destructive" /> using Decision Tree 
          Machine Learning · Python &amp; React
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ML Portfolio Project
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
