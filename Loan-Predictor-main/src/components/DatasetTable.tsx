import { useState, useEffect } from "react";
import { Database, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoanRecord {
  [key: string]: string;
}

const DatasetTable = () => {
  const [data, setData] = useState<LoanRecord[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetch("/data/loan_data.csv")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        const hdrs = lines[0].split(",");
        setHeaders(hdrs);
        const rows = lines.slice(1, 201).map((line) => {
          const vals = line.split(",");
          const obj: LoanRecord = {};
          hdrs.forEach((h, i) => (obj[h] = vals[i]));
          return obj;
        });
        setData(rows);
      });
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const pageData = data.slice(page * pageSize, (page + 1) * pageSize);

  const formatHeader = (h: string) =>
    h.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="bg-card rounded-xl card-shadow p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Database className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-display">Dataset Overview</h2>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} records from loan_data.csv
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-secondary-foreground whitespace-nowrap"
                >
                  {formatHeader(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                {headers.map((h) => (
                  <td key={h} className="px-4 py-2.5 whitespace-nowrap text-foreground">
                    {h === "loan_status" ? (
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row[h] === "1"
                            ? "bg-success/15 text-success"
                            : "bg-destructive/15 text-destructive"
                        }`}
                      >
                        {row[h] === "1" ? "Approved" : "Rejected"}
                      </span>
                    ) : (
                      row[h]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatasetTable;
