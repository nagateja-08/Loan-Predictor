import { useState } from "react";
import { Send, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  person_age: string;
  person_gender: string;
  person_education: string;
  person_income: string;
  person_emp_exp: string;
  person_home_ownership: string;
  loan_amnt: string;
  loan_intent: string;
  loan_int_rate: string;
  loan_percent_income: string;
  cb_person_cred_hist_length: string;
  credit_score: string;
  previous_loan_defaults_on_file: string;
}

const initialForm: FormData = {
  person_age: "",
  person_gender: "",
  person_education: "",
  person_income: "",
  person_emp_exp: "",
  person_home_ownership: "",
  loan_amnt: "",
  loan_intent: "",
  loan_int_rate: "",
  loan_percent_income: "",
  cb_person_cred_hist_length: "",
  credit_score: "",
  previous_loan_defaults_on_file: "",
};

const fieldConfig = [
  { key: "person_age", label: "Age", type: "number", placeholder: "e.g. 25" },
  {
    key: "person_gender",
    label: "Gender",
    type: "select",
    options: ["male", "female"],
  },
  {
    key: "person_education",
    label: "Education",
    type: "select",
    options: ["High School", "Associate", "Bachelor", "Master", "Doctorate"],
  },
  { key: "person_income", label: "Annual Income ($)", type: "number", placeholder: "e.g. 60000" },
  { key: "person_emp_exp", label: "Employment Experience (years)", type: "number", placeholder: "e.g. 5" },
  {
    key: "person_home_ownership",
    label: "Home Ownership",
    type: "select",
    options: ["RENT", "OWN", "MORTGAGE", "OTHER"],
  },
  { key: "loan_amnt", label: "Loan Amount ($)", type: "number", placeholder: "e.g. 15000" },
  {
    key: "loan_intent",
    label: "Loan Intent",
    type: "select",
    options: ["PERSONAL", "EDUCATION", "MEDICAL", "VENTURE", "HOMEIMPROVEMENT", "DEBTCONSOLIDATION"],
  },
  { key: "loan_int_rate", label: "Interest Rate (%)", type: "number", placeholder: "e.g. 10.5" },
  { key: "loan_percent_income", label: "Loan % of Income", type: "number", placeholder: "e.g. 0.25" },
  { key: "cb_person_cred_hist_length", label: "Credit History Length (years)", type: "number", placeholder: "e.g. 4" },
  { key: "credit_score", label: "Credit Score", type: "number", placeholder: "e.g. 680" },
  {
    key: "previous_loan_defaults_on_file",
    label: "Previous Defaults",
    type: "select",
    options: ["Yes", "No"],
  },
];

// Client-side decision tree heuristic based on dataset patterns
function predictLoan(form: FormData): boolean {
  const income = parseFloat(form.person_income);
  const loanAmt = parseFloat(form.loan_amnt);
  const creditScore = parseFloat(form.credit_score);
  const loanPctIncome = parseFloat(form.loan_percent_income);
  const intRate = parseFloat(form.loan_int_rate);
  const defaults = form.previous_loan_defaults_on_file;

  // Decision tree logic derived from dataset patterns
  if (defaults === "Yes") {
    if (creditScore > 700 && loanPctIncome < 0.15) return true;
    return false;
  }
  if (loanPctIncome > 0.45) return false;
  if (creditScore < 500) return false;
  if (intRate > 18 && loanPctIncome > 0.3) return false;
  if (income > 100000 && loanPctIncome < 0.25) return true;
  if (creditScore > 680 && loanPctIncome < 0.3) return true;
  if (loanAmt < 5000 && creditScore > 580) return true;
  if (loanPctIncome > 0.35) return false;
  if (creditScore > 620 && intRate < 12) return true;
  return loanPctIncome < 0.2;
}

const PredictionForm = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [result, setResult] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  };

  const isComplete = Object.values(form).every((v) => v !== "");

  const handlePredict = () => {
    if (!isComplete) return;
    setLoading(true);
    setTimeout(() => {
      setResult(predictLoan(form));
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
  };

  return (
    <div className="bg-card rounded-xl card-shadow p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Send className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-display">Loan Prediction Input</h2>
          <p className="text-sm text-muted-foreground">
            Fill in all attributes to predict loan approval
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fieldConfig.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">{field.label}</Label>
            {field.type === "select" ? (
              <Select
                value={form[field.key as keyof FormData]}
                onValueChange={(val) => updateField(field.key, val)}
              >
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options!.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                step="any"
                value={form[field.key as keyof FormData]}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="bg-muted/50 border-border"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <Button
          onClick={handlePredict}
          disabled={!isComplete || loading}
          className="gradient-primary text-primary-foreground font-semibold px-8 py-2.5 hover:opacity-90 transition-opacity"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Predicting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Predict Loan Approval
            </>
          )}
        </Button>
        <Button variant="outline" size="lg" onClick={handleReset}>
          Reset Form
        </Button>
      </div>

      {result !== null && (
        <div
          className={`mt-6 p-5 rounded-xl flex items-center gap-4 animate-scale-in ${
            result
              ? "bg-success/10 border border-success/30"
              : "bg-destructive/10 border border-destructive/30"
          }`}
        >
          {result ? (
            <CheckCircle2 className="w-10 h-10 text-success flex-shrink-0" />
          ) : (
            <XCircle className="w-10 h-10 text-destructive flex-shrink-0" />
          )}
          <div>
            <p
              className={`text-xl font-bold font-display ${
                result ? "text-success" : "text-destructive"
              }`}
            >
              {result ? "Loan Approved ✓" : "Loan Not Approved ✗"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {result
                ? "Based on the decision tree model, this applicant is likely to be approved."
                : "Based on the decision tree model, this applicant is likely to be rejected."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
