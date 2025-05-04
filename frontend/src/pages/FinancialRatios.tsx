
// // // import { useState } from "react";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// // // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // // import { getCompanyData } from "@/lib/mock-data";
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // // export default function FinancialRatios() {
// // //   const [activeCompany, setActiveCompany] = useState(getCompanyData("Apple"));

// // //   const handleCompanySearch = (companyName: string) => {
// // //     const companyData = getCompanyData(companyName);
// // //     if (companyData) {
// // //       setActiveCompany(companyData);
// // //     }
// // //   };

// // //   if (!activeCompany) {
// // //     return (
// // //       <Layout showSearch handleCompanySearch={handleCompanySearch}>
// // //         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //           <div className="text-center space-y-4">
// // //             <h2 className="text-2xl font-bold">Company Not Found</h2>
// // //             <p className="text-muted-foreground">
// // //               Please search for a valid company.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   // Prepare data for the bar chart
// // //   const chartData = activeCompany.financialRatios.map(ratio => ({
// // //     name: ratio.name,
// // //     value: ratio.value,
// // //     benchmark: ratio.benchmark,
// // //     isGood: ratio.isGood
// // //   }));

// // //   return (
// // //     <Layout showSearch handleCompanySearch={handleCompanySearch}>
// // //       <div className="flex items-center justify-between mb-6">
// // //         <div>
// // //           <h2 className="text-3xl font-bold">{activeCompany.companyName}</h2>
// // //           <p className="text-muted-foreground">
// // //             {activeCompany.ticker} • {activeCompany.sector}
// // //           </p>
// // //         </div>
// // //         <ScoreCard
// // //           title="Financial Ratios Score"
// // //           score={activeCompany.financialRatiosScore}
// // //           weight={50}
// // //           className="w-[250px]"
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Financial Ratios vs Benchmarks</CardTitle>
// // //             <CardDescription>
// // //               Comparison of key financial ratios with industry benchmarks
// // //             </CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="h-[400px]">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <BarChart
// // //                   data={chartData}
// // //                   layout="vertical"
// // //                   margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
// // //                 >
// // //                   <CartesianGrid strokeDasharray="3 3" />
// // //                   <XAxis type="number" />
// // //                   <YAxis 
// // //                     dataKey="name" 
// // //                     type="category" 
// // //                     tick={{ fontSize: 12 }} 
// // //                     width={100} 
// // //                   />
// // //                   <Tooltip />
// // //                   <Bar 
// // //                     dataKey="value" 
// // //                     name="Company Value" 
// // //                     fill="#3366CC" 
// // //                     radius={[0, 4, 4, 0]}
// // //                   />
// // //                   <Bar 
// // //                     dataKey="benchmark" 
// // //                     name="Industry Benchmark" 
// // //                     fill="#DC3912"
// // //                     radius={[0, 4, 4, 0]}
// // //                   />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <FinancialRatiosTable ratios={activeCompany.financialRatios} />
// // //       </div>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <CardTitle>Understanding Financial Ratios</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="space-y-4">
// // //             <p>
// // //               Financial ratios are quantitative measures that evaluate various aspects of a company's financial performance and condition.
// // //               These metrics provide insights into a company's liquidity, solvency, profitability, and operational efficiency.
// // //             </p>
// // //             <h3 className="font-semibold text-lg">Key Categories of Financial Ratios:</h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div className="p-4 bg-blue-50 rounded-lg">
// // //                 <h4 className="font-semibold text-finance-blue">Liquidity Ratios</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Measure a company's ability to pay short-term obligations and convert assets into cash.
// // //                   Examples: Current Ratio, Quick Ratio
// // //                 </p>
// // //               </div>
// // //               <div className="p-4 bg-green-50 rounded-lg">
// // //                 <h4 className="font-semibold text-finance-green">Solvency Ratios</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Assess a company's long-term financial stability and ability to meet long-term obligations.
// // //                   Examples: Debt-to-Equity Ratio, Interest Coverage Ratio
// // //                 </p>
// // //               </div>
// // //               <div className="p-4 bg-amber-50 rounded-lg">
// // //                 <h4 className="font-semibold text-amber-800">Profitability Ratios</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Evaluate a company's ability to generate earnings relative to its revenue, assets, or equity.
// // //                   Examples: Gross Profit Margin, Return on Assets (ROA)
// // //                 </p>
// // //               </div>
// // //               <div className="p-4 bg-purple-50 rounded-lg">
// // //                 <h4 className="font-semibold text-purple-800">Valuation Ratios</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Help investors determine whether a stock is overvalued or undervalued.
// // //                   Examples: Price-to-Earnings (P/E), Price-to-Book (P/B)
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     </Layout>
// // //   );
// // // }


// // import { Layout } from "@/components/layout/Layout";
// // import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // import { getCompanyData } from "@/lib/mock-data";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // import { useCompany } from "@/contexts/CompanyContext";

// // export default function FinancialRatios() {
// //   const { selectedCompany, setSelectedCompany } = useCompany();

// //   const handleCompanySearch = (companyName: string) => {
// //     const companyData = getCompanyData(companyName);
// //     if (companyData) {
// //       setSelectedCompany(companyData.companyName);
// //     }
// //   };

// //   if (!selectedCompany) {
// //     return (
// //       <Layout showSearch handleCompanySearch={handleCompanySearch}>
// //         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //           <div className="text-center space-y-4">
// //             <h2 className="text-2xl font-bold">Company Not Found</h2>
// //             <p className="text-muted-foreground">
// //               Please search for a valid company.
// //             </p>
// //           </div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   // Prepare data for the bar chart
// //   const chartData = selectedCompany.financialRatios.map(ratio => ({
// //     name: ratio.name,
// //     value: ratio.value,
// //     benchmark: ratio.benchmark,
// //     isGood: ratio.isGood
// //   }));

// //   return (
// //     <Layout showSearch handleCompanySearch={handleCompanySearch}>
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h2 className="text-3xl font-bold">{selectedCompany.companyName}</h2>
// //           <p className="text-muted-foreground">
// //             {selectedCompany.ticker} • {selectedCompany.sector}
// //           </p>
// //         </div>
// //         <ScoreCard
// //           title="Financial Ratios Score"
// //           score={selectedCompany.financialRatiosScore}
// //           weight={50}
// //           className="w-[250px]"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Financial Ratios vs Benchmarks</CardTitle>
// //             <CardDescription>
// //               Comparison of key financial ratios with industry benchmarks
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="h-[400px]">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart
// //                   data={chartData}
// //                   layout="vertical"
// //                   margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
// //                 >
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis type="number" />
// //                   <YAxis 
// //                     dataKey="name" 
// //                     type="category" 
// //                     tick={{ fontSize: 12 }} 
// //                     width={100} 
// //                   />
// //                   <Tooltip />
// //                   <Bar 
// //                     dataKey="value" 
// //                     name="Company Value" 
// //                     fill="#3366CC" 
// //                     radius={[0, 4, 4, 0]}
// //                   />
// //                   <Bar 
// //                     dataKey="benchmark" 
// //                     name="Industry Benchmark" 
// //                     fill="#DC3912"
// //                     radius={[0, 4, 4, 0]}
// //                   />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
// //       </div>

// //       <Card className="mb-6">
// //         <CardHeader>
// //           <CardTitle>Understanding Financial Ratios</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="space-y-4">
// //             <p>
// //               Financial ratios are quantitative measures that evaluate various aspects of a company's financial performance and condition.
// //               These metrics provide insights into a company's liquidity, solvency, profitability, and operational efficiency.
// //             </p>
// //             <h3 className="font-semibold text-lg">Key Categories of Financial Ratios:</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="p-4 bg-blue-50 rounded-lg">
// //                 <h4 className="font-semibold text-finance-blue">Liquidity Ratios</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Measure a company's ability to pay short-term obligations and convert assets into cash.
// //                   Examples: Current Ratio, Quick Ratio
// //                 </p>
// //               </div>
// //               <div className="p-4 bg-green-50 rounded-lg">
// //                 <h4 className="font-semibold text-finance-green">Solvency Ratios</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Assess a company's long-term financial stability and ability to meet long-term obligations.
// //                   Examples: Debt-to-Equity Ratio, Interest Coverage Ratio
// //                 </p>
// //               </div>
// //               <div className="p-4 bg-amber-50 rounded-lg">
// //                 <h4 className="font-semibold text-amber-800">Profitability Ratios</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Evaluate a company's ability to generate earnings relative to its revenue, assets, or equity.
// //                   Examples: Gross Profit Margin, Return on Assets (ROA)
// //                 </p>
// //               </div>
// //               <div className="p-4 bg-purple-50 rounded-lg">
// //                 <h4 className="font-semibold text-purple-800">Valuation Ratios</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Help investors determine whether a stock is overvalued or undervalued.
// //                   Examples: Price-to-Earnings (P/E), Price-to-Book (P/B)
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </Layout>
// //   );
// // }

// import { Layout } from "@/components/layout/Layout";
// import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// import { ScoreCard } from "@/components/analysis/ScoreCard";
// import { getCompanyData } from "@/lib/mock-data";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useCompany } from "@/contexts/useCompany";

// export default function FinancialRatios() {
//   const { selectedCompany, setSelectedCompany } = useCompany();

//   const handleCompanySearch = (companyName: string) => {
//     const companyData = getCompanyData(companyName);
//     if (companyData) {
//       //setSelectedCompany(companyData.companyName);
//       setSelectedCompany(companyData);
//     }
//   };

//   if (!selectedCompany) {
//     return (
//       <Layout showSearch handleCompanySearch={handleCompanySearch}>
//         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-bold">Company Not Found</h2>
//             <p className="text-muted-foreground">
//               Please search for a valid company.
//             </p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   // Prepare data for the bar chart
//   const chartData = selectedCompany.financialRatios.map(ratio => ({
//     name: ratio.name,
//     value: ratio.value,
//     benchmark: ratio.benchmark,
//     isGood: ratio.isGood
//   }));

//   return (
//     <Layout showSearch handleCompanySearch={handleCompanySearch}>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-3xl font-bold">{selectedCompany.companyName}</h2>
//           <p className="text-muted-foreground">
//             {selectedCompany.ticker} • {selectedCompany.sector}
//           </p>
//         </div>
//         <ScoreCard
//           title="Financial Ratios Score"
//           score={selectedCompany.financialRatiosScore}
//           weight={50}
//           className="w-[250px]"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Financial Ratios vs Benchmarks</CardTitle>
//             <CardDescription>
//               Comparison of key financial ratios with industry benchmarks
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[400px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={chartData}
//                   layout="vertical"
//                   margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" />
//                   <YAxis 
//                     dataKey="name" 
//                     type="category" 
//                     tick={{ fontSize: 12 }} 
//                     width={100} 
//                   />
//                   <Tooltip />
//                   <Bar 
//                     dataKey="value" 
//                     name="Company Value" 
//                     fill="#3366CC" 
//                     radius={[0, 4, 4, 0]}
//                   />
//                   <Bar 
//                     dataKey="benchmark" 
//                     name="Industry Benchmark" 
//                     fill="#DC3912"
//                     radius={[0, 4, 4, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
//       </div>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Understanding Financial Ratios</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <p>
//               Financial ratios are quantitative measures that evaluate various aspects of a company's financial performance and condition.
//               These metrics provide insights into a company's liquidity, solvency, profitability, and operational efficiency.
//             </p>
//             <h3 className="font-semibold text-lg">Key Categories of Financial Ratios:</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <h4 className="font-semibold text-finance-blue">Liquidity Ratios</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Measure a company's ability to pay short-term obligations and convert assets into cash.
//                   Examples: Current Ratio, Quick Ratio
//                 </p>
//               </div>
//               <div className="p-4 bg-green-50 rounded-lg">
//                 <h4 className="font-semibold text-finance-green">Solvency Ratios</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Assess a company's long-term financial stability and ability to meet long-term obligations.
//                   Examples: Debt-to-Equity Ratio, Interest Coverage Ratio
//                 </p>
//               </div>
//               <div className="p-4 bg-amber-50 rounded-lg">
//                 <h4 className="font-semibold text-amber-800">Profitability Ratios</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Evaluate a company's ability to generate earnings relative to its revenue, assets, or equity.
//                   Examples: Gross Profit Margin, Return on Assets (ROA)
//                 </p>
//               </div>
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <h4 className="font-semibold text-purple-800">Valuation Ratios</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Help investors determine whether a stock is overvalued or undervalued.
//                   Examples: Price-to-Earnings (P/E), Price-to-Book (P/B)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// }

import { Layout } from "@/components/layout/Layout";
import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCompany } from "@/contexts/useCompany";

export default function FinancialRatios() {
  const { selectedCompany, handleCompanySearch } = useCompany();

  if (!selectedCompany) {
    return (
      <Layout showSearch handleCompanySearch={handleCompanySearch}>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Company Not Found</h2>
            <p className="text-muted-foreground">
              Please search for a valid company.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Prepare data for the bar chart
  const chartData = selectedCompany.financialRatios.map(ratio => ({
    name: ratio.name,
    value: ratio.value,
    benchmark: ratio.benchmark,
    isGood: ratio.isGood
  }));

  return (
    <Layout showSearch handleCompanySearch={handleCompanySearch}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{selectedCompany.companyName}</h2>
          <p className="text-muted-foreground">
            {selectedCompany.ticker} • {selectedCompany.sector}
          </p>
        </div>
        <ScoreCard
          title="Financial Ratios Score"
          score={selectedCompany.financialRatiosScore}
          weight={50}
          className="w-[250px]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Ratios vs Benchmarks</CardTitle>
            <CardDescription>
              Comparison of key financial ratios with industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                    width={100} 
                  />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Company Value" 
                    fill="#3366CC" 
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar 
                    dataKey="benchmark" 
                    name="Industry Benchmark" 
                    fill="#DC3912"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Understanding Financial Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Financial ratios are quantitative measures that evaluate various aspects of a company's financial performance and condition.
              These metrics provide insights into a company's liquidity, solvency, profitability, and operational efficiency.
            </p>
            <h3 className="font-semibold text-lg">Key Categories of Financial Ratios:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-finance-blue">Liquidity Ratios</h4>
                <p className="text-sm text-muted-foreground">
                  Measure a company's ability to pay short-term obligations and convert assets into cash.
                  Examples: Current Ratio, Quick Ratio
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-finance-green">Solvency Ratios</h4>
                <p className="text-sm text-muted-foreground">
                  Assess a company's long-term financial stability and ability to meet long-term obligations.
                  Examples: Debt-to-Equity Ratio, Interest Coverage Ratio
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800">Profitability Ratios</h4>
                <p className="text-sm text-muted-foreground">
                  Evaluate a company's ability to generate earnings relative to its revenue, assets, or equity.
                  Examples: Gross Profit Margin, Return on Assets (ROA)
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">Valuation Ratios</h4>
                <p className="text-sm text-muted-foreground">
                  Help investors determine whether a stock is overvalued or undervalued.
                  Examples: Price-to-Earnings (P/E), Price-to-Book (P/B)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}