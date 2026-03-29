import { Users, FileSpreadsheet, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Records", value: "45,000", icon: FileSpreadsheet, color: "text-primary" },
  { label: "Features Used", value: "13", icon: Target, color: "text-accent-foreground" },
  { label: "Model Type", value: "Decision Tree", icon: TrendingUp, color: "text-success" },
  { label: "Dataset Source", value: "loan_data.csv", icon: Users, color: "text-warning" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl card-shadow p-5 hover:card-shadow-hover transition-shadow"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-base font-bold font-display text-foreground">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
