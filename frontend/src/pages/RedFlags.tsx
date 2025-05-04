
// // // import { useState } from "react";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// // // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // // import { getCompanyData } from "@/lib/mock-data";
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { AlertTriangle } from "lucide-react";

// // // export default function RedFlags() {
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
// // //           title="Red Flags Score"
// // //           score={activeCompany.redFlagsScore}
// // //           weight={30}
// // //           className="w-[250px]"
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //         <RedFlagsList redFlags={activeCompany.redFlags} />

// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle className="flex items-center gap-2">
// // //               <AlertTriangle className="h-5 w-5 text-finance-red" />
// // //               Understanding Red Flags
// // //             </CardTitle>
// // //             <CardDescription>
// // //               Key risk indicators that may impact company performance and valuation
// // //             </CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               <p>
// // //                 Red flags are warning signs that indicate potential problems or risks within a company.
// // //                 These indicators can help investors identify issues that may negatively impact a company's performance,
// // //                 stability, or valuation in the future.
// // //               </p>
              
// // //               <h3 className="font-semibold text-lg mt-4">Common Categories of Red Flags:</h3>
              
// // //               <div className="space-y-3">
// // //                 <div className="p-3 border-l-4 border-amber-500">
// // //                   <h4 className="font-semibold">Financial Statement Concerns</h4>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Inconsistencies in financial reporting, frequent restatements, or unusual accounting practices.
// // //                   </p>
// // //                 </div>
                
// // //                 <div className="p-3 border-l-4 border-amber-500">
// // //                   <h4 className="font-semibold">Management Issues</h4>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Frequent turnover of executives, conflicts of interest, or questionable business practices.
// // //                   </p>
// // //                 </div>
                
// // //                 <div className="p-3 border-l-4 border-amber-500">
// // //                   <h4 className="font-semibold">Business Model Risks</h4>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Heavy reliance on a single product, customer, or market, or increasing competition threats.
// // //                   </p>
// // //                 </div>
                
// // //                 <div className="p-3 border-l-4 border-amber-500">
// // //                   <h4 className="font-semibold">Regulatory and Legal Concerns</h4>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Pending litigation, regulatory investigations, or non-compliance with industry standards.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {activeCompany.redFlags.length > 0 && (
// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Red Flag Severity Assessment</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// // //                 <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
// // //                   <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
// // //                   Low Severity
// // //                 </h4>
// // //                 <p className="text-sm text-muted-foreground mt-2">
// // //                   Minimal potential impact on company performance. These concerns may be temporary 
// // //                   or easily addressable by management.
// // //                 </p>
// // //               </div>
              
// // //               <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
// // //                 <h4 className="font-semibold text-amber-800 flex items-center gap-2">
// // //                   <span className="w-3 h-3 rounded-full bg-amber-500"></span>
// // //                   Medium Severity
// // //                 </h4>
// // //                 <p className="text-sm text-muted-foreground mt-2">
// // //                   Moderate concerns that could impact company performance if not addressed. 
// // //                   These issues require monitoring and may affect valuation.
// // //                 </p>
// // //               </div>
              
// // //               <div className="p-4 bg-red-50 rounded-lg border border-red-200">
// // //                 <h4 className="font-semibold text-finance-red flex items-center gap-2">
// // //                   <span className="w-3 h-3 rounded-full bg-finance-red"></span>
// // //                   High Severity
// // //                 </h4>
// // //                 <p className="text-sm text-muted-foreground mt-2">
// // //                   Critical concerns that present significant threats to company performance and valuation. 
// // //                   These issues demand immediate attention from management.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       )}
// // //     </Layout>
// // //   );
// // // }


// // import { Layout } from "@/components/layout/Layout";
// // import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// // import { ScoreCard } from "@/components/analysis/ScoreCard";
// // import { getCompanyData } from "@/lib/mock-data";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { AlertTriangle } from "lucide-react";
// // import { useCompany } from "@/contexts/CompanyContext";

// // export default function RedFlags() {
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
// //           title="Red Flags Score"
// //           score={selectedCompany.redFlagsScore}
// //           weight={30}
// //           className="w-[250px]"
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //         <RedFlagsList redFlags={selectedCompany.redFlags} />

// //         <Card>
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <AlertTriangle className="h-5 w-5 text-finance-red" />
// //               Understanding Red Flags
// //             </CardTitle>
// //             <CardDescription>
// //               Key risk indicators that may impact company performance and valuation
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <p>
// //                 Red flags are warning signs that indicate potential problems or risks within a company.
// //                 These indicators can help investors identify issues that may negatively impact a company's performance,
// //                 stability, or valuation in the future.
// //               </p>
              
// //               <h3 className="font-semibold text-lg mt-4">Common Categories of Red Flags:</h3>
              
// //               <div className="space-y-3">
// //                 <div className="p-3 border-l-4 border-amber-500">
// //                   <h4 className="font-semibold">Financial Statement Concerns</h4>
// //                   <p className="text-sm text-muted-foreground">
// //                     Inconsistencies in financial reporting, frequent restatements, or unusual accounting practices.
// //                   </p>
// //                 </div>
                
// //                 <div className="p-3 border-l-4 border-amber-500">
// //                   <h4 className="font-semibold">Management Issues</h4>
// //                   <p className="text-sm text-muted-foreground">
// //                     Frequent turnover of executives, conflicts of interest, or questionable business practices.
// //                   </p>
// //                 </div>
                
// //                 <div className="p-3 border-l-4 border-amber-500">
// //                   <h4 className="font-semibold">Business Model Risks</h4>
// //                   <p className="text-sm text-muted-foreground">
// //                     Heavy reliance on a single product, customer, or market, or increasing competition threats.
// //                   </p>
// //                 </div>
                
// //                 <div className="p-3 border-l-4 border-amber-500">
// //                   <h4 className="font-semibold">Regulatory and Legal Concerns</h4>
// //                   <p className="text-sm text-muted-foreground">
// //                     Pending litigation, regulatory investigations, or non-compliance with industry standards.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {selectedCompany.redFlags.length > 0 && (
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Red Flag Severity Assessment</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
// //                 <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
// //                   <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
// //                   Low Severity
// //                 </h4>
// //                 <p className="text-sm text-muted-foreground mt-2">
// //                   Minimal potential impact on company performance. These concerns may be temporary 
// //                   or easily addressable by management.
// //                 </p>
// //               </div>
              
// //               <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
// //                 <h4 className="font-semibold text-amber-800 flex items-center gap-2">
// //                   <span className="w-3 h-3 rounded-full bg-amber-500"></span>
// //                   Medium Severity
// //                 </h4>
// //                 <p className="text-sm text-muted-foreground mt-2">
// //                   Moderate concerns that could impact company performance if not addressed. 
// //                   These issues require monitoring and may affect valuation.
// //                 </p>
// //               </div>
              
// //               <div className="p-4 bg-red-50 rounded-lg border border-red-200">
// //                 <h4 className="font-semibold text-finance-red flex items-center gap-2">
// //                   <span className="w-3 h-3 rounded-full bg-finance-red"></span>
// //                   High Severity
// //                 </h4>
// //                 <p className="text-sm text-muted-foreground mt-2">
// //                   Critical concerns that present significant threats to company performance and valuation. 
// //                   These issues demand immediate attention from management.
// //                 </p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}
// //     </Layout>
// //   );
// // }
// import { Layout } from "@/components/layout/Layout";
// import { RedFlagsList } from "@/components/analysis/RedFlagsList";
// import { ScoreCard } from "@/components/analysis/ScoreCard";
// import { getCompanyData } from "@/lib/mock-data";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { AlertTriangle } from "lucide-react";
// import { useCompany } from "@/contexts/useCompany";

// export default function RedFlags() {
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
//           title="Red Flags Score"
//           score={selectedCompany.redFlagsScore}
//           weight={30}
//           className="w-[250px]"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <RedFlagsList redFlags={selectedCompany.redFlags} />

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertTriangle className="h-5 w-5 text-finance-red" />
//               Understanding Red Flags
//             </CardTitle>
//             <CardDescription>
//               Key risk indicators that may impact company performance and valuation
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <p>
//                 Red flags are warning signs that indicate potential problems or risks within a company.
//                 These indicators can help investors identify issues that may negatively impact a company's performance,
//                 stability, or valuation in the future.
//               </p>
              
//               <h3 className="font-semibold text-lg mt-4">Common Categories of Red Flags:</h3>
              
//               <div className="space-y-3">
//                 <div className="p-3 border-l-4 border-amber-500">
//                   <h4 className="font-semibold">Financial Statement Concerns</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Inconsistencies in financial reporting, frequent restatements, or unusual accounting practices.
//                   </p>
//                 </div>
                
//                 <div className="p-3 border-l-4 border-amber-500">
//                   <h4 className="font-semibold">Management Issues</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Frequent turnover of executives, conflicts of interest, or questionable business practices.
//                   </p>
//                 </div>
                
//                 <div className="p-3 border-l-4 border-amber-500">
//                   <h4 className="font-semibold">Business Model Risks</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Heavy reliance on a single product, customer, or market, or increasing competition threats.
//                   </p>
//                 </div>
                
//                 <div className="p-3 border-l-4 border-amber-500">
//                   <h4 className="font-semibold">Regulatory and Legal Concerns</h4>
//                   <p className="text-sm text-muted-foreground">
//                     Pending litigation, regulatory investigations, or non-compliance with industry standards.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {selectedCompany.redFlags.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Red Flag Severity Assessment</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//                 <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
//                   Low Severity
//                 </h4>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Minimal potential impact on company performance. These concerns may be temporary 
//                   or easily addressable by management.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
//                 <h4 className="font-semibold text-amber-800 flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-amber-500"></span>
//                   Medium Severity
//                 </h4>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Moderate concerns that could impact company performance if not addressed. 
//                   These issues require monitoring and may affect valuation.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-red-50 rounded-lg border border-red-200">
//                 <h4 className="font-semibold text-finance-red flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-finance-red"></span>
//                   High Severity
//                 </h4>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Critical concerns that present significant threats to company performance and valuation. 
//                   These issues demand immediate attention from management.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </Layout>
//   );
// }

import { Layout } from "@/components/layout/Layout";
import { RedFlagsList } from "@/components/analysis/RedFlagsList";
import { ScoreCard } from "@/components/analysis/ScoreCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useCompany } from "@/contexts/useCompany";

export default function RedFlags() {
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
          title="Red Flags Score"
          score={selectedCompany.redFlagsScore}
          weight={30}
          className="w-[250px]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RedFlagsList redFlags={selectedCompany.redFlags} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-finance-red" />
              Understanding Red Flags
            </CardTitle>
            <CardDescription>
              Key risk indicators that may impact company performance and valuation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Red flags are warning signs that indicate potential problems or risks within a company.
                These indicators can help investors identify issues that may negatively impact a company's performance,
                stability, or valuation in the future.
              </p>
              
              <h3 className="font-semibold text-lg mt-4">Common Categories of Red Flags:</h3>
              
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-amber-500">
                  <h4 className="font-semibold">Financial Statement Concerns</h4>
                  <p className="text-sm text-muted-foreground">
                    Inconsistencies in financial reporting, frequent restatements, or unusual accounting practices.
                  </p>
                </div>
                
                <div className="p-3 border-l-4 border-amber-500">
                  <h4 className="font-semibold">Management Issues</h4>
                  <p className="text-sm text-muted-foreground">
                    Frequent turnover of executives, conflicts of interest, or questionable business practices.
                  </p>
                </div>
                
                <div className="p-3 border-l-4 border-amber-500">
                  <h4 className="font-semibold">Business Model Risks</h4>
                  <p className="text-sm text-muted-foreground">
                    Heavy reliance on a single product, customer, or market, or increasing competition threats.
                  </p>
                </div>
                
                <div className="p-3 border-l-4 border-amber-500">
                  <h4 className="font-semibold">Regulatory and Legal Concerns</h4>
                  <p className="text-sm text-muted-foreground">
                    Pending litigation, regulatory investigations, or non-compliance with industry standards.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedCompany.redFlags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Red Flag Severity Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Low Severity
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Minimal potential impact on company performance. These concerns may be temporary 
                  or easily addressable by management.
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  Medium Severity
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Moderate concerns that could impact company performance if not addressed. 
                  These issues require monitoring and may affect valuation.
                </p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-finance-red flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-finance-red"></span>
                  High Severity
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Critical concerns that present significant threats to company performance and valuation. 
                  These issues demand immediate attention from management.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
}
