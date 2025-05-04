
import { CompanyAnalysis } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CompanyOverviewProps {
  company: CompanyAnalysis;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  // Calculate score breakdown for pie chart
  const data = [
    { name: 'Financial Ratios', value: 50, score: company.financialRatiosScore },
    { name: 'Red Flags', value: 30, score: company.redFlagsScore },
    { name: 'Sentiment', value: 20, score: company.sentimentScore }
  ];

  const COLORS = ['#3366CC', '#DC3912', '#109618'];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{company.companyName}</CardTitle>
            <CardDescription className="flex gap-2 items-center mt-1">
              <span className="font-medium">{company.ticker}</span>
              <span>•</span>
              <span>{company.sector}</span>
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`text-white ${
              company.overallScore >= 80 
                ? 'bg-finance-green' 
                : company.overallScore >= 60 
                ? 'bg-finance-chart-yellow' 
                : 'bg-finance-red'
            }`}
          >
            Score: {company.overallScore}/100
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => {
                    // Show both the weight percentage and the category score
                    return [`Weight: ${value}%, Score: ${props.payload.score}/100`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-xs text-muted-foreground mb-1">Financial Ratios</div>
                <div className={`text-2xl font-bold ${
                  company.financialRatiosScore >= 80 
                    ? 'text-finance-green' 
                    : company.financialRatiosScore >= 60 
                    ? 'text-finance-chart-yellow' 
                    : 'text-finance-red'
                }`}>
                  {company.financialRatiosScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">50% weight</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-xs text-muted-foreground mb-1">Red Flags</div>
                <div className={`text-2xl font-bold ${
                  company.redFlagsScore >= 80 
                    ? 'text-finance-green' 
                    : company.redFlagsScore >= 60 
                    ? 'text-finance-chart-yellow' 
                    : 'text-finance-red'
                }`}>
                  {company.redFlagsScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">30% weight</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-xs text-muted-foreground mb-1">Sentiment</div>
                <div className={`text-2xl font-bold ${
                  company.sentimentScore >= 80 
                    ? 'text-finance-green' 
                    : company.sentimentScore >= 60 
                    ? 'text-finance-chart-yellow' 
                    : 'text-finance-red'
                }`}>
                  {company.sentimentScore}
                </div>
                <div className="text-xs text-muted-foreground mt-1">20% weight</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
