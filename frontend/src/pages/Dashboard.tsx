
// // // import { useState } from "react";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { CompanyOverview } from "@/components/analysis/CompanyOverview";
// // // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // // import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// // // import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// // // import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// // // import { ChatBot } from "@/components/chat/ChatBot";
// // // import { getCompanyData } from "@/lib/mock-data";
// // // import { toast } from "sonner";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// // // export default function Dashboard() {
// // //   const [activeCompany, setActiveCompany] = useState(getCompanyData("Apple"));

// // //   const handleCompanySearch = (companyName: string) => {
// // //     const companyData = getCompanyData(companyName);
    
// // //     if (companyData) {
// // //       setActiveCompany(companyData);
// // //       toast.success(`Loaded analysis for ${companyData.companyName}`);
// // //     } else {
// // //       toast.error("Company not found. Try Apple, Microsoft, Tesla, or Amazon.");
// // //     }
// // //   };

// // //   if (!activeCompany) {
// // //     return (
// // //       <Layout showSearch handleCompanySearch={handleCompanySearch}>
// // //         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //           <div className="text-center space-y-4">
// // //             <h2 className="text-2xl font-bold">Welcome to FinWise</h2>
// // //             <p className="text-muted-foreground">
// // //               Search for a company to view its financial health analysis
// // //             </p>
// // //             <p className="text-sm text-muted-foreground">
// // //               Try searching for: Apple, Microsoft, Tesla, or Amazon
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </Layout>
// // //     );
// // //   }

// // //   return (
// // //     <Layout showSearch handleCompanySearch={handleCompanySearch}>
// // //       <CompanyOverview company={activeCompany} />

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
// // //         <ScoreCard 
// // //           title="Financial Ratios" 
// // //           score={activeCompany.financialRatiosScore} 
// // //           weight={50}
// // //           description="Analysis of key financial metrics and performance indicators"
// // //         />
// // //         <ScoreCard 
// // //           title="Red Flags" 
// // //           score={activeCompany.redFlagsScore} 
// // //           weight={30}
// // //           description="Identification of potential risks and warning signals"
// // //         />
// // //         <ScoreCard 
// // //           title="Sentiment Analysis" 
// // //           score={activeCompany.sentimentScore} 
// // //           weight={20}
// // //           description="Market perception based on news and analyst opinions"
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //         <div className="space-y-6">
// // //           <Tabs defaultValue="financial">
// // //             <TabsList className="mb-4">
// // //               <TabsTrigger value="financial">Financial Ratios</TabsTrigger>
// // //               <TabsTrigger value="redflags">Red Flags</TabsTrigger>
// // //               <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
// // //             </TabsList>
// // //             <TabsContent value="financial" className="mt-0">
// // //               <FinancialRatiosTable ratios={activeCompany.financialRatios} />
// // //             </TabsContent>
// // //             <TabsContent value="redflags" className="mt-0">
// // //               <RedFlagsList redFlags={activeCompany.redFlags} />
// // //             </TabsContent>
// // //             <TabsContent value="sentiment" className="mt-0">
// // //               <SentimentAnalysisSection sentimentItems={activeCompany.sentimentAnalysis} />
// // //             </TabsContent>
// // //           </Tabs>
// // //         </div>

// // //         <ChatBot company={activeCompany} />
// // //       </div>
// // //     </Layout>
// // //   );
// // // }

// // import { useState, useEffect } from "react";
// // import { Layout } from "@/components/layout/Layout";
// // import { CompanyOverview } from "@/components/analysis/CompanyOverview";
// // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// // import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// // import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// // import { ChatBot } from "@/components/chat/ChatBot";
// // import { getCompanyData } from "@/lib/mock-data";
// // import { toast } from "sonner";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { CompanyAnalysis } from "@/lib/types";

// // export default function Dashboard() {
// //   const [activeCompany, setActiveCompany] = useState<CompanyAnalysis | null>(null);

// //   // Load company from session storage if available
// //   useEffect(() => {
// //     const storedCompany = sessionStorage.getItem('activeCompany');
// //     if (storedCompany) {
// //       try {
// //         const parsedCompany = JSON.parse(storedCompany) as CompanyAnalysis;
// //         setActiveCompany(parsedCompany);
// //       } catch (error) {
// //         console.error("Error parsing stored company data:", error);
// //         setActiveCompany(getCompanyData("Apple"));
// //       }
// //     } else {
// //       setActiveCompany(getCompanyData("Apple"));
// //     }
// //   }, []);

// //   const handleCompanySearch = (companyName: string) => {
// //     const companyData = getCompanyData(companyName);
    
// //     if (companyData) {
// //       setActiveCompany(companyData);
// //       toast.success(`Loaded analysis for ${companyData.companyName}`);
// //     } else {
// //       toast.error("Company not found. Try searching on the search page.");
// //     }
// //   };

// //   if (!activeCompany) {
// //     return (
// //       <Layout showSearch handleCompanySearch={handleCompanySearch}>
// //         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //           <div className="text-center space-y-4">
// //             <h2 className="text-2xl font-bold">Welcome to FinWise</h2>
// //             <p className="text-muted-foreground">
// //               Search for a company to view its financial health analysis
// //             </p>
// //             <p className="text-sm text-muted-foreground">
// //               Try searching for any company by name or ticker
// //             </p>
// //           </div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   return (
// //     <Layout showSearch handleCompanySearch={handleCompanySearch}>
// //       <CompanyOverview company={activeCompany} />

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
// //         <ScoreCard 
// //           title="Financial Ratios" 
// //           score={activeCompany.financialRatiosScore} 
// //           weight={50}
// //           description="Analysis of key financial metrics and performance indicators"
// //         />
// //         <ScoreCard 
// //           title="Red Flags" 
// //           score={activeCompany.redFlagsScore} 
// //           weight={30}
// //           description="Identification of potential risks and warning signals"
// //         />
// //         <ScoreCard 
// //           title="Sentiment Analysis" 
// //           score={activeCompany.sentimentScore} 
// //           weight={20}
// //           description="Market perception based on news and analyst opinions"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="space-y-6">
// //           <Tabs defaultValue="financial">
// //             <TabsList className="mb-4">
// //               <TabsTrigger value="financial">Financial Ratios</TabsTrigger>
// //               <TabsTrigger value="redflags">Red Flags</TabsTrigger>
// //               <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
// //             </TabsList>
// //             <TabsContent value="financial" className="mt-0">
// //               <FinancialRatiosTable ratios={activeCompany.financialRatios} />
// //             </TabsContent>
// //             <TabsContent value="redflags" className="mt-0">
// //               <RedFlagsList redFlags={activeCompany.redFlags} />
// //             </TabsContent>
// //             <TabsContent value="sentiment" className="mt-0">
// //               <SentimentAnalysisSection sentimentItems={activeCompany.sentimentAnalysis} />
// //             </TabsContent>
// //           </Tabs>
// //         </div>

// //         <ChatBot company={activeCompany} />
// //       </div>
// //     </Layout>
// //   );
// // }


// import { Layout } from "@/components/layout/Layout";
// import { CompanyOverview } from "@/components/analysis/CompanyOverview";
// import { ScoreCard } from "@/components/analysis/ScoreCard";
// import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// import { ChatBot } from "@/components/chat/ChatBot";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useCompany } from "@/contexts/CompanyContext";

// export default function Dashboard() {
//   const { selectedCompany, setSelectedCompany } = useCompany();

//   const handleCompanySearch = (companyName: string) => {
//     const companyData = getCompanyData(companyName);
    
//     if (companyData) {
//       setSelectedCompany(companyData.companyName);
//       toast.success(`Loaded analysis for ${companyData.companyName}`);
//     } else {
//       toast.error("Company not found. Try Apple, Microsoft, Tesla, or Amazon.");
//     }
//   };

//   if (!selectedCompany) {
//     return (
//       <Layout showSearch handleCompanySearch={handleCompanySearch}>
//         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-bold">Welcome to FinWise</h2>
//             <p className="text-muted-foreground">
//               Search for a company to view its financial health analysis
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Try searching for: Apple, Microsoft, Tesla, or Amazon
//             </p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout showSearch handleCompanySearch={handleCompanySearch}>
//       <CompanyOverview company={selectedCompany} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <ScoreCard 
//           title="Financial Ratios" 
//           score={selectedCompany.financialRatiosScore} 
//           weight={50}
//           description="Analysis of key financial metrics and performance indicators"
//         />
//         <ScoreCard 
//           title="Red Flags" 
//           score={selectedCompany.redFlagsScore} 
//           weight={30}
//           description="Identification of potential risks and warning signals"
//         />
//         <ScoreCard 
//           title="Sentiment Analysis" 
//           score={selectedCompany.sentimentScore} 
//           weight={20}
//           description="Market perception based on news and analyst opinions"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <Tabs defaultValue="financial">
//             <TabsList className="mb-4">
//               <TabsTrigger value="financial">Financial Ratios</TabsTrigger>
//               <TabsTrigger value="redflags">Red Flags</TabsTrigger>
//               <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
//             </TabsList>
//             <TabsContent value="financial" className="mt-0">
//               <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
//             </TabsContent>
//             <TabsContent value="redflags" className="mt-0">
//               <RedFlagsList redFlags={selectedCompany.redFlags} />
//             </TabsContent>
//             <TabsContent value="sentiment" className="mt-0">
//               <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
//             </TabsContent>
//           </Tabs>
//         </div>

//         <ChatBot company={selectedCompany} />
//       </div>
//     </Layout>
//   );
// }

// import { Layout } from "@/components/layout/Layout";
// import { CompanyOverview } from "@/components/analysis/CompanyOverview";
// import { ScoreCard } from "@/components/analysis/ScoreCard";
// import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
// import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
// import { ChatBot } from "@/components/chat/ChatBot";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useCompany } from "@/contexts/useCompany";

// export default function Dashboard() {
//   const { selectedCompany, setSelectedCompany } = useCompany();

//   const handleCompanySearch = (companyName: string) => {
//     const companyData = getCompanyData(companyName);
    
//     if (companyData) {
//       //setSelectedCompany(companyData.companyName);
//       setSelectedCompany(companyData);
//       toast.success(`Loaded analysis for ${companyData.companyName}`);
//     } else {
//       toast.error("Company not found. Try Apple, Microsoft, Tesla, or Amazon.");
//     }
//   };

//   if (!selectedCompany) {
//     return (
//       <Layout showSearch handleCompanySearch={handleCompanySearch}>
//         <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-bold">Welcome to FinWise</h2>
//             <p className="text-muted-foreground">
//               Search for a company to view its financial health analysis
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Try searching for: Apple, Microsoft, Tesla, or Amazon
//             </p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout showSearch handleCompanySearch={handleCompanySearch}>
//       <CompanyOverview company={selectedCompany} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <ScoreCard 
//           title="Financial Ratios" 
//           score={selectedCompany.financialRatiosScore} 
//           weight={50}
//           description="Analysis of key financial metrics and performance indicators"
//         />
//         <ScoreCard 
//           title="Red Flags" 
//           score={selectedCompany.redFlagsScore} 
//           weight={30}
//           description="Identification of potential risks and warning signals"
//         />
//         <ScoreCard 
//           title="Sentiment Analysis" 
//           score={selectedCompany.sentimentScore} 
//           weight={20}
//           description="Market perception based on news and analyst opinions"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <Tabs defaultValue="financial">
//             <TabsList className="mb-4">
//               <TabsTrigger value="financial">Financial Ratios</TabsTrigger>
//               <TabsTrigger value="redflags">Red Flags</TabsTrigger>
//               <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
//             </TabsList>
//             <TabsContent value="financial" className="mt-0">
//               <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
//             </TabsContent>
//             <TabsContent value="redflags" className="mt-0">
//               <RedFlagsList redFlags={selectedCompany.redFlags} />
//             </TabsContent>
//             <TabsContent value="sentiment" className="mt-0">
//               <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
//             </TabsContent>
//           </Tabs>
//         </div>

//         <ChatBot company={selectedCompany} />
//       </div>
//     </Layout>
//   );
// }


import { Layout } from "@/components/layout/Layout";
import { CompanyOverview } from "@/components/analysis/CompanyOverview";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { FinancialRatiosTable } from "@/components/analysis/FinancialRatiosTable";
import { RedFlagsList } from "@/components/analysis/RedFlagsList";
import { SentimentAnalysisSection } from "@/components/analysis/SentimentAnalysisSection";
import { ChatBot } from "@/components/chat/ChatBot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompany } from "@/contexts/useCompany";

export default function Dashboard() {
  const { selectedCompany, handleCompanySearch } = useCompany();

  if (!selectedCompany) {
    return (
      <Layout showSearch handleCompanySearch={handleCompanySearch}>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Welcome to FinWise</h2>
            <p className="text-muted-foreground">
              Search for a company to view its financial health analysis
            </p>
            <p className="text-sm text-muted-foreground">
              Try searching for: Apple, Microsoft, Tesla, or Amazon
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSearch handleCompanySearch={handleCompanySearch}>
      <CompanyOverview company={selectedCompany} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* {console.log(selectedCompany, "lalalalalallaa")} */}
        <ScoreCard 
          title="Financial Ratios" 
          score={selectedCompany.financialRatiosScore} 
          weight={50}
          description="Analysis of key financial metrics and performance indicators"
        />
        <ScoreCard 
          title="Red Flags" 
          score={selectedCompany.redFlagsScore} 
          weight={30}
          description="Identification of potential risks and warning signals"
        />
        <ScoreCard 
          title="Sentiment Analysis" 
          score={selectedCompany.sentimentScore} 
          weight={20}
          description="Market perception based on news and analyst opinions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="financial">
            <TabsList className="mb-4">
              <TabsTrigger value="financial">Financial Ratios</TabsTrigger>
              <TabsTrigger value="redflags">Red Flags</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>
            <TabsContent value="financial" className="mt-0">
              <FinancialRatiosTable ratios={selectedCompany.financialRatios} />
            </TabsContent>
            <TabsContent value="redflags" className="mt-0">
              <RedFlagsList redFlags={selectedCompany.redFlags} />
            </TabsContent>
            <TabsContent value="sentiment" className="mt-0">
              <SentimentAnalysisSection sentimentItems={selectedCompany.sentimentAnalysis} />
            </TabsContent>
          </Tabs>
        </div>

        <ChatBot company={selectedCompany} />
      </div>
    </Layout>
  );
}
