
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatio } from "@/lib/types";
import { ArrowDownIcon, ArrowUpIcon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface FinancialRatiosTableProps {
  ratios: FinancialRatio[];
}

export function FinancialRatiosTable({ ratios }: FinancialRatiosTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Ratios Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ratio</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Benchmark</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratios.map((ratio) => (
              <TableRow key={ratio.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1">
                    {ratio.name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{ratio.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>{ratio.value.toFixed(2)}</TableCell>
                <TableCell>{ratio.benchmark.toFixed(2)}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      ratio.isGood
                        ? "text-finance-green"
                        : "text-finance-red"
                    )}
                  >
                    {ratio.isGood ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    )}
                    <span>
                      {ratio.isGood ? "Favorable" : "Concern"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
