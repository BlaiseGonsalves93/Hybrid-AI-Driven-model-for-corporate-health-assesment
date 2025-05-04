
import { RedFlag } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RedFlagsListProps {
  redFlags: RedFlag[];
}

export function RedFlagsList({ redFlags }: RedFlagsListProps) {
  if (redFlags.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Red Flags Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No significant red flags identified
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Red Flags Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {redFlags.map((flag, index) => (
            <div
              key={index}
              className={cn(
                "p-4 border rounded-md flex gap-3",
                flag.severity === "high"
                  ? "border-finance-red bg-finance-red/5"
                  : flag.severity === "medium"
                  ? "border-amber-500 bg-amber-500/5"
                  : "border-yellow-500 bg-yellow-500/5"
              )}
            >
              <AlertTriangle
                className={cn(
                  "h-6 w-6 flex-shrink-0",
                  flag.severity === "high"
                    ? "text-finance-red"
                    : flag.severity === "medium"
                    ? "text-amber-500"
                    : "text-yellow-500"
                )}
              />
              <div className="space-y-1">
                <div className="font-medium">{flag.title}</div>
                <div className="text-sm text-muted-foreground">
                  {flag.description}
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="text-xs px-2 py-1 bg-background rounded border">
                    {flag.severity.toUpperCase()} severity
                  </div>
                  <div className="text-xs px-2 py-1 bg-background rounded border">
                    Impact: {flag.impact.toFixed(1)}/10
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
