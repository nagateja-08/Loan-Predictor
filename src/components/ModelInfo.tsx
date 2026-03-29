import { GitBranch, Info, BarChart3 } from "lucide-react";

const ModelInfo = () => {
  return (
    <div className="bg-card rounded-xl card-shadow p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-display">Model Information</h2>
          <p className="text-sm text-muted-foreground">
            How the Decision Tree classifier works
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-muted/60 rounded-lg p-5 hover:card-shadow-hover transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-5 h-5 text-primary" />
            <h3 className="font-semibold font-display text-foreground">Decision Tree</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A supervised learning algorithm that splits data into branches based on feature values, 
            forming a tree structure to make classification decisions. Each internal node represents 
            a test on an attribute, and each leaf node represents a class label.
          </p>
        </div>

        <div className="bg-muted/60 rounded-lg p-5 hover:card-shadow-hover transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="font-semibold font-display text-foreground">Entropy</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Entropy measures the impurity or randomness in a dataset. A pure node (all samples 
            of one class) has entropy of 0, while a node with an equal mix has maximum entropy. 
            Formula: <span className="font-mono text-accent-foreground">H(S) = -Σ pᵢ log₂(pᵢ)</span>
          </p>
        </div>

        <div className="bg-muted/60 rounded-lg p-5 hover:card-shadow-hover transition-shadow">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold font-display text-foreground">Information Gain</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Information Gain measures the reduction in entropy after a dataset is split on an 
            attribute. The attribute with the highest information gain is chosen as the splitting 
            criterion. <span className="font-mono text-accent-foreground">IG(S, A) = H(S) - Σ |Sᵥ|/|S| · H(Sᵥ)</span>
          </p>
        </div>
      </div>

      <div className="mt-5 p-4 bg-accent/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-accent-foreground">Model file:</span>{" "}
          decision_tree_model.pkl — Trained on 45,000 records with 13 features including 
          income, credit score, loan amount, employment experience, and more.
        </p>
      </div>
    </div>
  );
};

export default ModelInfo;
