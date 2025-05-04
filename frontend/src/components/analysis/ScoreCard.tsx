
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  title: string;
  score: number;
  weight?: number;
  description?: string;
  className?: string;
}

export function ScoreCard({ title, score, weight, description, className }: ScoreCardProps) {
  let scoreColor = "text-finance-blue";
  let progressColor = "bg-finance-chart-blue";
  
  if (score >= 80) {
    scoreColor = "text-finance-green";
    progressColor = "bg-finance-chart-green";
  } else if (score < 60) {
    scoreColor = "text-finance-red";
    progressColor = "bg-finance-chart-red";
  } else if (score < 80 && score >= 70) {
    scoreColor = "text-finance-chart-yellow";
    progressColor = "bg-finance-chart-yellow";
  }
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {weight && (
            <span className="text-sm text-muted-foreground">
              Weight: {weight}%
            </span>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={cn("text-4xl font-semibold", scoreColor)}>
            {score}
          </div>
          <Progress 
            value={score} 
            max={100} 
            className={cn("h-2 flex-1", progressColor)} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
