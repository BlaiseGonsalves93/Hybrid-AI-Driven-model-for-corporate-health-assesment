
// // // import { useState } from "react";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// // // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // // import { getCompanyData } from "@/lib/mock-data";
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

// // // export default function Sentiment() {
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

// // //   const sentimentCounts = {
// // //     positive: activeCompany.sentimentAnalysis.filter(item => item.sentiment === "positive").length,
// // //     neutral: activeCompany.sentimentAnalysis.filter(item => item.sentiment === "neutral").length,
// // //     negative: activeCompany.sentimentAnalysis.filter(item => item.sentiment === "negative").length,
// // //   };

// // //   const chartData = [
// // //     { name: "Positive", value: sentimentCounts.positive },
// // //     { name: "Neutral", value: sentimentCounts.neutral },
// // //     { name: "Negative", value: sentimentCounts.negative },
// // //   ];

// // //   const SENTIMENT_COLORS = ["#109618", "#999999", "#DC3912"];

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
// // //           title="Sentiment Score"
// // //           score={activeCompany.sentimentScore}
// // //           weight={20}
// // //           className="w-[250px]"
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Sentiment Breakdown</CardTitle>
// // //             <CardDescription>
// // //               Analysis of market sentiment from news and analyst coverage
// // //             </CardDescription>
// // //           </CardHeader>
// // //           <CardContent className="flex flex-col items-center">
// // //             <div className="h-[300px] w-full">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <PieChart>
// // //                   <Pie
// // //                     data={chartData}
// // //                     cx="50%"
// // //                     cy="50%"
// // //                     innerRadius={60}
// // //                     outerRadius={100}
// // //                     fill="#8884d8"
// // //                     paddingAngle={5}
// // //                     dataKey="value"
// // //                     label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
// // //                   >
// // //                     {chartData.map((entry, index) => (
// // //                       <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
// // //                     ))}
// // //                   </Pie>
// // //                   <RechartsTooltip />
// // //                 </PieChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //             <div className="flex justify-center gap-6 mt-4">
// // //               <div className="flex items-center">
// // //                 <span className="w-3 h-3 rounded-full bg-finance-chart-green mr-2"></span>
// // //                 <span className="text-sm">Positive</span>
// // //               </div>
// // //               <div className="flex items-center">
// // //                 <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
// // //                 <span className="text-sm">Neutral</span>
// // //               </div>
// // //               <div className="flex items-center">
// // //                 <span className="w-3 h-3 rounded-full bg-finance-chart-red mr-2"></span>
// // //                 <span className="text-sm">Negative</span>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <SentimentAnalysisSection sentimentItems={activeCompany.sentimentAnalysis} />
// // //       </div>

// // //       <Card className="mb-6">
// // //         <CardHeader>
// // //           <CardTitle>Understanding Sentiment Analysis</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="space-y-4">
// // //             <p>
// // //               Sentiment analysis evaluates market perception of a company through news, social media, 
// // //               and analyst opinions. This analysis can provide valuable insights into how the market views 
// // //               the company's prospects, which can impact stock price and investor confidence.
// // //             </p>
            
// // //             <h3 className="font-semibold text-lg mt-4">Key Aspects of Sentiment Analysis:</h3>
            
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div className="p-4 bg-blue-50 rounded-lg">
// // //                 <h4 className="font-semibold text-finance-blue">News Coverage</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Analysis of tone and content in financial news articles about the company,
// // //                   including coverage of earnings reports, product launches, and corporate events.
// // //                 </p>
// // //               </div>
              
// // //               <div className="p-4 bg-purple-50 rounded-lg">
// // //                 <h4 className="font-semibold text-purple-800">Analyst Opinions</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Evaluation of analyst reports, ratings, and price targets, which often 
// // //                   reflect institutional investor sentiment and market expectations.
// // //                 </p>
// // //               </div>
              
// // //               <div className="p-4 bg-amber-50 rounded-lg">
// // //                 <h4 className="font-semibold text-amber-800">Social Media Sentiment</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Analysis of conversations about the company on platforms like Twitter, 
// // //                   Reddit, and financial forums, which can indicate retail investor sentiment.
// // //                 </p>
// // //               </div>
              
// // //               <div className="p-4 bg-green-50 rounded-lg">
// // //                 <h4 className="font-semibold text-finance-green">Trends Over Time</h4>
// // //                 <p className="text-sm text-muted-foreground">
// // //                   Tracking changes in sentiment over time to identify shifts in market 
// // //                   perception that could precede stock price movements.
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
// // import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // import { getCompanyData } from "@/lib/mock-data";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
// // import { useCompany } from "@/contexts/CompanyContext";

// // export default function Sentiment() {
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

// //   const sentimentCounts = {
// //     positive: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "positive").length,
// //     neutral: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "neutral").length,
// //     negative: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "negative").length,
// //   };

// //   const chartData = [
// //     { name: "Positive", value: sentimentCounts.positive },
// //     { name: "Neutral", value: sentimentCounts.neutral },
// //     { name: "Negative", value: sentimentCounts.negative },
// //   ];

// //   const SENTIMENT_COLORS = ["#109618", "#999999", "#DC3912"];

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
// //           title="Sentiment Score"
// //           score={selectedCompany.sentimentScore}
// //           weight={20}
// //           className="w-[250px]"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Sentiment Breakdown</CardTitle>
// //             <CardDescription>
// //               Analysis of market sentiment from news and analyst coverage
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="flex flex-col items-center">
// //             <div className="h-[300px] w-full">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <PieChart>
// //                   <Pie
// //                     data={chartData}
// //                     cx="50%"
// //                     cy="50%"
// //                     innerRadius={60}
// //                     outerRadius={100}
// //                     fill="#8884d8"
// //                     paddingAngle={5}
// //                     dataKey="value"
// //                     label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
// //                   >
// //                     {chartData.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <RechartsTooltip />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>
// //             <div className="flex justify-center gap-6 mt-4">
// //               <div className="flex items-center">
// //                 <span className="w-3 h-3 rounded-full bg-finance-chart-green mr-2"></span>
// //                 <span className="text-sm">Positive</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
// //                 <span className="text-sm">Neutral</span>
// //               </div>
// //               <div className="flex items-center">
// //                 <span className="w-3 h-3 rounded-full bg-finance-chart-red mr-2"></span>
// //                 <span className="text-sm">Negative</span>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
// //       </div>

// //       <Card className="mb-6">
// //         <CardHeader>
// //           <CardTitle>Understanding Sentiment Analysis</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="space-y-4">
// //             <p>
// //               Sentiment analysis evaluates market perception of a company through news, social media, 
// //               and analyst opinions. This analysis can provide valuable insights into how the market views 
// //               the company's prospects, which can impact stock price and investor confidence.
// //             </p>
            
// //             <h3 className="font-semibold text-lg mt-4">Key Aspects of Sentiment Analysis:</h3>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div className="p-4 bg-blue-50 rounded-lg">
// //                 <h4 className="font-semibold text-finance-blue">News Coverage</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Analysis of tone and content in financial news articles about the company,
// //                   including coverage of earnings reports, product launches, and corporate events.
// //                 </p>
// //               </div>
              
// //               <div className="p-4 bg-purple-50 rounded-lg">
// //                 <h4 className="font-semibold text-purple-800">Analyst Opinions</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Evaluation of analyst reports, ratings, and price targets, which often 
// //                   reflect institutional investor sentiment and market expectations.
// //                 </p>
// //               </div>
              
// //               <div className="p-4 bg-amber-50 rounded-lg">
// //                 <h4 className="font-semibold text-amber-800">Social Media Sentiment</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Analysis of conversations about the company on platforms like Twitter, 
// //                   Reddit, and financial forums, which can indicate retail investor sentiment.
// //                 </p>
// //               </div>
              
// //               <div className="p-4 bg-green-50 rounded-lg">
// //                 <h4 className="font-semibold text-finance-green">Trends Over Time</h4>
// //                 <p className="text-sm text-muted-foreground">
// //                   Tracking changes in sentiment over time to identify shifts in market 
// //                   perception that could precede stock price movements.
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
// import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// import { ScoreCard } from "@/components/analysis/ScoreCard";
// import { getCompanyData } from "@/lib/mock-data";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
// import { useCompany } from "@/contexts/useCompany";

// export default function Sentiment() {
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

//   const sentimentCounts = {
//     positive: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "positive").length,
//     neutral: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "neutral").length,
//     negative: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "negative").length,
//   };

//   const chartData = [
//     { name: "Positive", value: sentimentCounts.positive },
//     { name: "Neutral", value: sentimentCounts.neutral },
//     { name: "Negative", value: sentimentCounts.negative },
//   ];

//   const SENTIMENT_COLORS = ["#109618", "#999999", "#DC3912"];

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
//           title="Sentiment Score"
//           score={selectedCompany.sentimentScore}
//           weight={20}
//           className="w-[250px]"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Sentiment Breakdown</CardTitle>
//             <CardDescription>
//               Analysis of market sentiment from news and analyst coverage
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-col items-center">
//             <div className="h-[300px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={chartData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {chartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <RechartsTooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="flex justify-center gap-6 mt-4">
//               <div className="flex items-center">
//                 <span className="w-3 h-3 rounded-full bg-finance-chart-green mr-2"></span>
//                 <span className="text-sm">Positive</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
//                 <span className="text-sm">Neutral</span>
//               </div>
//               <div className="flex items-center">
//                 <span className="w-3 h-3 rounded-full bg-finance-chart-red mr-2"></span>
//                 <span className="text-sm">Negative</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
//       </div>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Understanding Sentiment Analysis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <p>
//               Sentiment analysis evaluates market perception of a company through news, social media, 
//               and analyst opinions. This analysis can provide valuable insights into how the market views 
//               the company's prospects, which can impact stock price and investor confidence.
//             </p>
            
//             <h3 className="font-semibold text-lg mt-4">Key Aspects of Sentiment Analysis:</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <h4 className="font-semibold text-finance-blue">News Coverage</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Analysis of tone and content in financial news articles about the company,
//                   including coverage of earnings reports, product launches, and corporate events.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <h4 className="font-semibold text-purple-800">Analyst Opinions</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Evaluation of analyst reports, ratings, and price targets, which often 
//                   reflect institutional investor sentiment and market expectations.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-amber-50 rounded-lg">
//                 <h4 className="font-semibold text-amber-800">Social Media Sentiment</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Analysis of conversations about the company on platforms like Twitter, 
//                   Reddit, and financial forums, which can indicate retail investor sentiment.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-green-50 rounded-lg">
//                 <h4 className="font-semibold text-finance-green">Trends Over Time</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Tracking changes in sentiment over time to identify shifts in market 
//                   perception that could precede stock price movements.
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
import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useCompany } from "@/contexts/useCompany";

export default function Sentiment() {
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

  const sentimentCounts = {
    positive: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "positive").length,
    neutral: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "neutral").length,
    negative: selectedCompany.sentimentAnalysis.filter(item => item.sentiment === "negative").length,
  };

  const chartData = [
    { name: "Positive", value: sentimentCounts.positive },
    { name: "Neutral", value: sentimentCounts.neutral },
    { name: "Negative", value: sentimentCounts.negative },
  ];

  const SENTIMENT_COLORS = ["#109618", "#999999", "#DC3912"];

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
          title="Sentiment Score"
          score={selectedCompany.sentimentScore}
          weight={20}
          className="w-[250px]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Breakdown</CardTitle>
            <CardDescription>
              Analysis of market sentiment from news and analyst coverage
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-finance-chart-green mr-2"></span>
                <span className="text-sm">Positive</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                <span className="text-sm">Neutral</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-finance-chart-red mr-2"></span>
                <span className="text-sm">Negative</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Understanding Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Sentiment analysis evaluates market perception of a company through news, social media, 
              and analyst opinions. This analysis can provide valuable insights into how the market views 
              the company's prospects, which can impact stock price and investor confidence.
            </p>
            
            <h3 className="font-semibold text-lg mt-4">Key Aspects of Sentiment Analysis:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-finance-blue">News Coverage</h4>
                <p className="text-sm text-muted-foreground">
                  Analysis of tone and content in financial news articles about the company,
                  including coverage of earnings reports, product launches, and corporate events.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">Analyst Opinions</h4>
                <p className="text-sm text-muted-foreground">
                  Evaluation of analyst reports, ratings, and price targets, which often 
                  reflect institutional investor sentiment and market expectations.
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-800">Social Media Sentiment</h4>
                <p className="text-sm text-muted-foreground">
                  Analysis of conversations about the company on platforms like Twitter, 
                  Reddit, and financial forums, which can indicate retail investor sentiment.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-finance-green">Trends Over Time</h4>
                <p className="text-sm text-muted-foreground">
                  Tracking changes in sentiment over time to identify shifts in market 
                  perception that could precede stock price movements.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
