
import { SentimentItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentimentAnalysisSectionProps {
  sentimentItems: SentimentItem[];
}

export function SentimentAnalysisSection({ sentimentItems }: SentimentAnalysisSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentimentItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "p-4 border rounded-md",
                item.sentiment === "positive"
                  ? "border-green-500 bg-green-500/5"
                  : item.sentiment === "negative"
                  ? "border-finance-red bg-finance-red/5"
                  : "border-gray-400 bg-gray-100/10"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-sm flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {item.source}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {item.sentiment === "positive" ? (
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {(item.score * 10).toFixed(1)}
                    </div>
                  ) : item.sentiment === "negative" ? (
                    <div className="flex items-center text-finance-red">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      {(item.score * 10).toFixed(1)}
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500">
                      <Minus className="h-4 w-4 mr-1" />
                      {(item.score * 10).toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
              <blockquote className="italic text-muted-foreground border-l-2 pl-3 my-2">
                "{item.excerpt}"
              </blockquote>
              <div className="text-xs text-muted-foreground">
                Published on {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
