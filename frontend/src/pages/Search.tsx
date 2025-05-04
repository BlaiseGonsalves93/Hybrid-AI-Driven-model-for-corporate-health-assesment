
// // // // // import { useState } from "react";
// // // // // import { Layout } from "@/components/layout/Layout";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Search as SearchIcon } from "lucide-react";
// // // // // import { Card } from "@/components/ui/card";
// // // // // import { getCompanyData, mockCompanies } from "@/lib/mock-data";
// // // // // import { CompanyAnalysis } from "@/lib/types";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import { toast } from "sonner";

// // // // // export default function Search() {
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
// // // // //   const [hasSearched, setHasSearched] = useState(false);
// // // // //   const navigate = useNavigate();

// // // // //   const handleSearch = (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (!searchQuery.trim()) return;

// // // // //     setHasSearched(true);

// // // // //     const companyData = getCompanyData(searchQuery);
// // // // //     if (companyData) {
// // // // //       setSearchResults([companyData]);
// // // // //     } else {
// // // // //       setSearchResults([]);
// // // // //     }
// // // // //   };

// // // // //   const handleViewCompany = (companyName: string) => {
// // // // //     const company = getCompanyData(companyName);
// // // // //     if (company) {
// // // // //       toast.success(`Loading analysis for ${company.companyName}`);
// // // // //       setTimeout(() => {
// // // // //         navigate('/');
// // // // //       }, 500);
// // // // //     }
// // // // //   };

// // // // //   const handleShowAllCompanies = () => {
// // // // //     setSearchResults(Object.values(mockCompanies));
// // // // //     setHasSearched(true);
// // // // //   };

// // // // //   return (
// // // // //     <Layout>
// // // // //       <div className="max-w-3xl mx-auto">
// // // // //         <h1 className="text-3xl font-bold mb-8 text-center">
// // // // //           Search for Company Analysis
// // // // //         </h1>

// // // // //         <form onSubmit={handleSearch} className="flex gap-2 mb-8">
// // // // //           <Input
// // // // //             value={searchQuery}
// // // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // // //             placeholder="Enter company name..."
// // // // //             className="flex-1"
// // // // //           />
// // // // //           <Button type="submit">
// // // // //             <SearchIcon className="h-4 w-4 mr-2" /> Search
// // // // //           </Button>
// // // // //         </form>

// // // // //         {!hasSearched ? (
// // // // //           <div className="text-center">
// // // // //             <p className="text-muted-foreground mb-4">
// // // // //               Search for a company or browse the available options
// // // // //             </p>
// // // // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // // // //               Show all available companies
// // // // //             </Button>
// // // // //           </div>
// // // // //         ) : searchResults.length > 0 ? (
// // // // //           <div className="space-y-4">
// // // // //             <h2 className="text-xl font-medium mb-4">Search Results</h2>
// // // // //             {searchResults.map((company) => (
// // // // //               <Card key={company.ticker} className="p-4">
// // // // //                 <div className="flex justify-between items-center">
// // // // //                   <div>
// // // // //                     <h3 className="text-lg font-semibold">{company.companyName}</h3>
// // // // //                     <p className="text-sm text-muted-foreground">
// // // // //                       {company.ticker} • {company.sector}
// // // // //                     </p>
// // // // //                     <div className="mt-2 flex gap-3">
// // // // //                       <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
// // // // //                         Financial Score: {company.financialRatiosScore}
// // // // //                       </div>
// // // // //                       <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
// // // // //                         Red Flags: {company.redFlagsScore}
// // // // //                       </div>
// // // // //                       <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
// // // // //                         Sentiment: {company.sentimentScore}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <Button onClick={() => handleViewCompany(company.companyName)}>
// // // // //                       View Analysis
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </Card>
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="text-center py-12">
// // // // //             <h2 className="text-xl font-medium mb-2">No results found</h2>
// // // // //             <p className="text-muted-foreground mb-4">
// // // // //               Try searching for: Apple, Microsoft, Tesla, or Amazon
// // // // //             </p>
// // // // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // // // //               Show all available companies
// // // // //             </Button>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </Layout>
// // // // //   );
// // // // // }

// // // // import { useState } from "react";
// // // // import { Layout } from "@/components/layout/Layout";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Search as SearchIcon, Loader2 } from "lucide-react";
// // // // import { Card } from "@/components/ui/card";
// // // // import { getCompanyData, mockCompanies } from "@/lib/mock-data";
// // // // import { CompanyAnalysis } from "@/lib/types";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { toast } from "sonner";
// // // // import { analyzeCompany } from "@/lib/integration-helper";

// // // // export default function Search() {
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
// // // //   const [hasSearched, setHasSearched] = useState(false);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   const handleSearch = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!searchQuery.trim()) return;

// // // //     setHasSearched(true);
// // // //     setIsLoading(true);
// // // //     toast.info(`Analyzing company: ${searchQuery}...`);

// // // //     try {
// // // //       // Try to get data from the Python backend
// // // //       const data = await analyzeCompany(searchQuery);
      
// // // //       // Map the backend response to our CompanyAnalysis format
// // // //       const companyData: CompanyAnalysis = {
// // // //         companyName: searchQuery,
// // // //         ticker: data.companyCode,
// // // //         sector: "Auto-detected",
// // // //         overallScore: data.totalScore,
// // // //         financialRatiosScore: data.financialScore,
// // // //         redFlagsScore: data.redFlagsScore,
// // // //         sentimentScore: data.sentimentScore,
        
// // // //         // Map metrics to financial ratios
// // // //         financialRatios: Object.entries(data.metrics).map(([name, value]) => ({
// // // //           name,
// // // //           value: typeof value === 'number' ? value : parseFloat(value as string) || 0,
// // // //           benchmark: 0,
// // // //           description: `${name} ratio for ${searchQuery}`,
// // // //           isGood: true,
// // // //         })),
        
// // // //         // Map red flags
// // // //         redFlags: Object.entries(data.redFlagAnalysis).map(([title, description]) => ({
// // // //           title,
// // // //           description: description as string,
// // // //           severity: 'medium' as const,
// // // //           impact: 2,
// // // //         })),
        
// // // //         // Default sentiment analysis
// // // //         sentimentAnalysis: [
// // // //           {
// // // //             source: "Auto-detected",
// // // //             sentiment: data.sentimentScore > 10 ? 'positive' : 'negative',
// // // //             score: data.sentimentScore / 20 * 100,
// // // //             excerpt: "Sentiment analysis from backend",
// // // //             date: new Date().toISOString().split('T')[0],
// // // //           }
// // // //         ],
// // // //       };
      
// // // //       setSearchResults([companyData]);
// // // //       toast.success(`Successfully analyzed ${searchQuery}`);
// // // //     } catch (error) {
// // // //       console.error("Error analyzing company:", error);
// // // //       toast.error("Failed to analyze company. Falling back to mock data...");
      
// // // //       // Fallback to mock data if available
// // // //       const mockData = getCompanyData(searchQuery);
// // // //       if (mockData) {
// // // //         setSearchResults([mockData]);
// // // //       } else {
// // // //         setSearchResults([]);
// // // //         toast.error("Company not found. Try a different company name.");
// // // //       }
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handleViewCompany = (companyData: CompanyAnalysis) => {
// // // //     // Store the company data in session storage
// // // //     sessionStorage.setItem('activeCompany', JSON.stringify(companyData));
// // // //     toast.success(`Loading analysis for ${companyData.companyName}`);
// // // //     setTimeout(() => {
// // // //       navigate('/');
// // // //     }, 500);
// // // //   };

// // // //   const handleShowAllCompanies = () => {
// // // //     setSearchResults(Object.values(mockCompanies));
// // // //     setHasSearched(true);
// // // //   };

// // // //   return (
// // // //     <Layout>
// // // //       <div className="max-w-3xl mx-auto">
// // // //         <h1 className="text-3xl font-bold mb-8 text-center">
// // // //           Search for Company Analysis
// // // //         </h1>

// // // //         <form onSubmit={handleSearch} className="flex gap-2 mb-8">
// // // //           <Input
// // // //             value={searchQuery}
// // // //             onChange={(e) => setSearchQuery(e.target.value)}
// // // //             placeholder="Enter any company name or ticker..."
// // // //             className="flex-1"
// // // //             disabled={isLoading}
// // // //           />
// // // //           <Button type="submit" disabled={isLoading}>
// // // //             {isLoading ? (
// // // //               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // // //             ) : (
// // // //               <SearchIcon className="h-4 w-4 mr-2" />
// // // //             )}
// // // //             Search
// // // //           </Button>
// // // //         </form>

// // // //         {!hasSearched ? (
// // // //           <div className="text-center">
// // // //             <p className="text-muted-foreground mb-4">
// // // //               Search for any company by name or ticker symbol
// // // //             </p>
// // // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // // //               Show available example companies
// // // //             </Button>
// // // //           </div>
// // // //         ) : isLoading ? (
// // // //           <div className="text-center py-12">
// // // //             <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
// // // //             <h2 className="text-xl font-medium mb-2">Analyzing company...</h2>
// // // //             <p className="text-muted-foreground">
// // // //               This might take a minute as we gather financial data, 
// // // //               analyze conference calls, and check sentiment
// // // //             </p>
// // // //           </div>
// // // //         ) : searchResults.length > 0 ? (
// // // //           <div className="space-y-4">
// // // //             <h2 className="text-xl font-medium mb-4">Search Results</h2>
// // // //             {searchResults.map((company) => (
// // // //               <Card key={company.ticker || company.companyName} className="p-4">
// // // //                 <div className="flex justify-between items-center">
// // // //                   <div>
// // // //                     <h3 className="text-lg font-semibold">{company.companyName}</h3>
// // // //                     <p className="text-sm text-muted-foreground">
// // // //                       {company.ticker} • {company.sector}
// // // //                     </p>
// // // //                     <div className="mt-2 flex gap-3">
// // // //                       <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
// // // //                         Financial Score: {company.financialRatiosScore}
// // // //                       </div>
// // // //                       <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
// // // //                         Red Flags: {company.redFlagsScore}
// // // //                       </div>
// // // //                       <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
// // // //                         Sentiment: {company.sentimentScore}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex items-center gap-2">
// // // //                     <Button onClick={() => handleViewCompany(company)}>
// // // //                       View Analysis
// // // //                     </Button>
// // // //                   </div>
// // // //                 </div>
// // // //               </Card>
// // // //             ))}
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-center py-12">
// // // //             <h2 className="text-xl font-medium mb-2">No results found</h2>
// // // //             <p className="text-muted-foreground mb-4">
// // // //               Try searching with a different company name or ticker symbol
// // // //             </p>
// // // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // // //               Show available example companies
// // // //             </Button>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </Layout>
// // // //   );
// // // // }

// // // import { useState } from "react";
// // // import { Layout } from "@/components/layout/Layout";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Search as SearchIcon } from "lucide-react";
// // // import { Card } from "@/components/ui/card";
// // // import { getCompanyData, mockCompanies } from "@/lib/mock-data";
// // // import { CompanyAnalysis } from "@/lib/types";
// // // import { useNavigate } from "react-router-dom";
// // // import { toast } from "sonner";
// // // import { useCompany } from "@/contexts/CompanyContext";

// // // export default function Search() {
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
// // //   const [hasSearched, setHasSearched] = useState(false);
// // //   const navigate = useNavigate();
// // //   const { setSelectedCompany } = useCompany();

// // //   const handleSearch = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!searchQuery.trim()) return;

// // //     setHasSearched(true);

// // //     const companyData = getCompanyData(searchQuery);
// // //     if (companyData) {
// // //       setSearchResults([companyData]);
// // //     } else {
// // //       setSearchResults([]);
// // //     }
// // //   };

// // //   const handleViewCompany = (companyName: string) => {
// // //     const company = getCompanyData(companyName);
// // //     if (company) {
// // //       setSelectedCompany(company.companyName);
// // //       toast.success(`Loading analysis for ${company.companyName}`);
// // //       setTimeout(() => {
// // //         navigate('/');
// // //       }, 500);
// // //     }
// // //   };

// // //   const handleShowAllCompanies = () => {
// // //     setSearchResults(Object.values(mockCompanies));
// // //     setHasSearched(true);
// // //   };

// // //   return (
// // //     <Layout>
// // //       <div className="max-w-3xl mx-auto">
// // //         <h1 className="text-3xl font-bold mb-8 text-center">
// // //           Search for Company Analysis
// // //         </h1>

// // //         <form onSubmit={handleSearch} className="flex gap-2 mb-8">
// // //           <Input
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             placeholder="Enter company name..."
// // //             className="flex-1"
// // //           />
// // //           <Button type="submit">
// // //             <SearchIcon className="h-4 w-4 mr-2" /> Search
// // //           </Button>
// // //         </form>

// // //         {!hasSearched ? (
// // //           <div className="text-center">
// // //             <p className="text-muted-foreground mb-4">
// // //               Search for a company or browse the available options
// // //             </p>
// // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // //               Show all available companies
// // //             </Button>
// // //           </div>
// // //         ) : searchResults.length > 0 ? (
// // //           <div className="space-y-4">
// // //             <h2 className="text-xl font-medium mb-4">Search Results</h2>
// // //             {searchResults.map((company) => (
// // //               <Card key={company.ticker} className="p-4">
// // //                 <div className="flex justify-between items-center">
// // //                   <div>
// // //                     <h3 className="text-lg font-semibold">{company.companyName}</h3>
// // //                     <p className="text-sm text-muted-foreground">
// // //                       {company.ticker} • {company.sector}
// // //                     </p>
// // //                     <div className="mt-2 flex gap-3">
// // //                       <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
// // //                         Financial Score: {company.financialRatiosScore}
// // //                       </div>
// // //                       <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
// // //                         Red Flags: {company.redFlagsScore}
// // //                       </div>
// // //                       <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
// // //                         Sentiment: {company.sentimentScore}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-2">
// // //                     <Button onClick={() => handleViewCompany(company.companyName)}>
// // //                       View Analysis
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               </Card>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-12">
// // //             <h2 className="text-xl font-medium mb-2">No results found</h2>
// // //             <p className="text-muted-foreground mb-4">
// // //               Try searching for: Apple, Microsoft, Tesla, or Amazon
// // //             </p>
// // //             <Button variant="outline" onClick={handleShowAllCompanies}>
// // //               Show all available companies
// // //             </Button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Layout>
// // //   );
// // // }
// // import { useState } from "react";
// // import { Layout } from "@/components/layout/Layout";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Search as SearchIcon } from "lucide-react";
// // import { Card } from "@/components/ui/card";
// // import { getCompanyData, mockCompanies } from "@/lib/mock-data";
// // import { CompanyAnalysis } from "@/lib/types";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "sonner";
// // import { useCompany } from "@/hooks/useCompany";

// // export default function Search() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
// //   const [hasSearched, setHasSearched] = useState(false);
// //   const navigate = useNavigate();
// //   const { setSelectedCompany } = useCompany();

// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!searchQuery.trim()) return;

// //     setHasSearched(true);

// //     const companyData = getCompanyData(searchQuery);
// //     if (companyData) {
// //       setSearchResults([companyData]);
// //     } else {
// //       setSearchResults([]);
// //     }
// //   };

// //   const handleViewCompany = (companyName: string) => {
// //     const company = getCompanyData(companyName);
// //     if (company) {
// //       setSelectedCompany(company.companyName);
// //       toast.success(`Loading analysis for ${company.companyName}`);
// //       setTimeout(() => {
// //         navigate('/');
// //       }, 500);
// //     }
// //   };

// //   const handleShowAllCompanies = () => {
// //     setSearchResults(Object.values(mockCompanies));
// //     setHasSearched(true);
// //   };

// //   return (
// //     <Layout>
// //       <div className="max-w-3xl mx-auto">
// //         <h1 className="text-3xl font-bold mb-8 text-center">
// //           Search for Company Analysis
// //         </h1>

// //         <form onSubmit={handleSearch} className="flex gap-2 mb-8">
// //           <Input
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             placeholder="Enter company name..."
// //             className="flex-1"
// //           />
// //           <Button type="submit">
// //             <SearchIcon className="h-4 w-4 mr-2" /> Search
// //           </Button>
// //         </form>

// //         {!hasSearched ? (
// //           <div className="text-center">
// //             <p className="text-muted-foreground mb-4">
// //               Search for a company or browse the available options
// //             </p>
// //             <Button variant="outline" onClick={handleShowAllCompanies}>
// //               Show all available companies
// //             </Button>
// //           </div>
// //         ) : searchResults.length > 0 ? (
// //           <div className="space-y-4">
// //             <h2 className="text-xl font-medium mb-4">Search Results</h2>
// //             {searchResults.map((company) => (
// //               <Card key={company.ticker} className="p-4">
// //                 <div className="flex justify-between items-center">
// //                   <div>
// //                     <h3 className="text-lg font-semibold">{company.companyName}</h3>
// //                     <p className="text-sm text-muted-foreground">
// //                       {company.ticker} • {company.sector}
// //                     </p>
// //                     <div className="mt-2 flex gap-3">
// //                       <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
// //                         Financial Score: {company.financialRatiosScore}
// //                       </div>
// //                       <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
// //                         Red Flags: {company.redFlagsScore}
// //                       </div>
// //                       <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
// //                         Sentiment: {company.sentimentScore}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Button onClick={() => handleViewCompany(company.companyName)}>
// //                       View Analysis
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </Card>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center py-12">
// //             <h2 className="text-xl font-medium mb-2">No results found</h2>
// //             <p className="text-muted-foreground mb-4">
// //               Try searching for: Apple, Microsoft, Tesla, or Amazon
// //             </p>
// //             <Button variant="outline" onClick={handleShowAllCompanies}>
// //               Show all available companies
// //             </Button>
// //           </div>
// //         )}
// //       </div>
// //     </Layout>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search as SearchIcon, Loader2 } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { mockCompanies } from "@/lib/mock-data";
// import { CompanyAnalysis } from "@/lib/types";
// import { useNavigate } from "react-router-dom";
// //import { useCompany } from "@/contexts/CompanyContext";
// import { toast } from "sonner";
// import { useCompany } from "@/contexts/useCompany";
// export default function Search() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isLocalSearching, setIsLocalSearching] = useState(false);
//   const { handleCompanySearch, setSelectedCompany, isLoading } = useCompany();
//   const navigate = useNavigate();
  
//   // Get query parameter if any
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const query = params.get('q');
//     if (query) {
//       setSearchQuery(query);
//       handleLocalSearch(query);
//       setHasSearched(true);
//     }
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;

//     setHasSearched(true);
//     handleLocalSearch(searchQuery);
//   };

//   const handleLocalSearch = (query: string) => {
//     setIsLocalSearching(true);
    
//     // First search in our mock companies
//     const mockResults = Object.values(mockCompanies).filter(company => 
//       company.companyName.toLowerCase().includes(query.toLowerCase()) ||
//       company.ticker.toLowerCase().includes(query.toLowerCase())
//     );
    
//     setSearchResults(mockResults);
//     setIsLocalSearching(false);
//   };

//   const handleViewCompany = (companyName: string) => {
//     handleCompanySearch(companyName);
//     toast.success(`Loading analysis for ${companyName}`);
//     setTimeout(() => {
//       navigate('/');
//     }, 500);
//   };

//   const handleShowAllCompanies = () => {
//     setSearchResults(Object.values(mockCompanies));
//     setHasSearched(true);
//   };

//   const handleDirectSearch = () => {
//     if (!searchQuery.trim()) return;
    
//     handleCompanySearch(searchQuery.trim().toUpperCase());
//     navigate('/');
//   };

//   return (
//     <Layout handleCompanySearch={handleCompanySearch}>
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Search for Company Analysis
//         </h1>

//         <form onSubmit={handleSearch} className="flex gap-2 mb-6">
//           <Input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Enter company name or ticker symbol..."
//             className="flex-1"
//           />
//           <Button type="submit">
//             <SearchIcon className="h-4 w-4 mr-2" /> Search
//           </Button>
//         </form>

//         <div className="flex justify-center mb-8">
//           <Button variant="outline" onClick={handleDirectSearch}>
//             Directly analyze {searchQuery ? searchQuery.toUpperCase() : "company"} from backend
//           </Button>
//         </div>

//         {isLocalSearching || isLoading ? (
//           <div className="flex justify-center py-12">
//             <div className="flex flex-col items-center gap-2">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//               <p>Searching...</p>
//             </div>
//           </div>
//         ) : !hasSearched ? (
//           <div className="text-center">
//             <p className="text-muted-foreground mb-4">
//               Search for a company by name/ticker or browse the available options
//             </p>
//             <Button variant="outline" onClick={handleShowAllCompanies}>
//               Show all available mock companies
//             </Button>
//           </div>
//         ) : searchResults.length > 0 ? (
//           <div className="space-y-4">
//             <h2 className="text-xl font-medium mb-4">Search Results</h2>
//             {searchResults.map((company) => (
//               <Card key={company.ticker} className="p-4">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="text-lg font-semibold">{company.companyName}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {company.ticker} • {company.sector}
//                     </p>
//                     <div className="mt-2 flex gap-3">
//                       <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
//                         Financial Score: {company.financialRatiosScore}
//                       </div>
//                       <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
//                         Red Flags: {company.redFlagsScore}
//                       </div>
//                       <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
//                         Sentiment: {company.sentimentScore}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button onClick={() => handleViewCompany(company.companyName)}>
//                       View Analysis
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//             <div className="mt-8 text-center">
//               <p className="text-muted-foreground mb-4">
//                 Don't see what you're looking for?
//               </p>
//               <Button onClick={handleDirectSearch}>
//                 Search backend for "{searchQuery}"
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <h2 className="text-xl font-medium mb-2">No mock results found</h2>
//             <p className="text-muted-foreground mb-6">
//               Try our backend search to analyze any company
//             </p>
//             <div className="flex flex-col gap-4 items-center">
//               <Button onClick={handleDirectSearch}>
//                 Search backend for "{searchQuery}"
//               </Button>
//               <Button variant="outline" onClick={handleShowAllCompanies}>
//                 Show all available mock companies
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mockCompanies } from "@/lib/mock-data";
import { CompanyAnalysis } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCompany } from "@/contexts/useCompany";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CompanyAnalysis[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLocalSearching, setIsLocalSearching] = useState(false);
  const { handleCompanySearch, setSelectedCompany, isLoading } = useCompany();
  const navigate = useNavigate();
  
  // Get query parameter if any
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      handleLocalSearch(query);
      setHasSearched(true);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    handleLocalSearch(searchQuery);
  };

  const handleLocalSearch = (query: string) => {
    setIsLocalSearching(true);
    
    // First search in our mock companies
    const mockResults = Object.values(mockCompanies).filter(company => 
      company.companyName.toLowerCase().includes(query.toLowerCase()) ||
      company.ticker.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(mockResults);
    setIsLocalSearching(false);
  };

  const handleViewCompany = (companyName: string) => {
    handleCompanySearch(companyName);
    toast.success(`Loading analysis for ${companyName}`);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const handleShowAllCompanies = () => {
    setSearchResults(Object.values(mockCompanies));
    setHasSearched(true);
  };

  const handleDirectSearch = () => {
    if (!searchQuery.trim()) return;
    
    handleCompanySearch(searchQuery.trim().toUpperCase());
    navigate('/');
  };

  return (
    <Layout handleCompanySearch={handleCompanySearch}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Search for Company Analysis
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter company name or ticker symbol..."
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" /> Search
          </Button>
        </form>

        <div className="flex justify-center mb-8">
          <Button variant="outline" onClick={handleDirectSearch}>
            Directly analyze {searchQuery ? searchQuery.toUpperCase() : "company"} from backend
          </Button>
        </div>

        {isLocalSearching || isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Searching...</p>
            </div>
          </div>
        ) : !hasSearched ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Search for a company by name/ticker or browse the available options
            </p>
            <Button variant="outline" onClick={handleShowAllCompanies}>
              Show all available mock companies
            </Button>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">Search Results</h2>
            {searchResults.map((company) => (
              <Card key={company.ticker} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{company.companyName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {company.ticker} • {company.sector}
                    </p>
                    <div className="mt-2 flex gap-3">
                      <div className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">
                        Financial Score: {company.financialRatiosScore}
                      </div>
                      <div className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full">
                        Red Flags: {company.redFlagsScore}
                      </div>
                      <div className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded-full">
                        Sentiment: {company.sentimentScore}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => handleViewCompany(company.companyName)}>
                      View Analysis
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Don't see what you're looking for?
              </p>
              <Button onClick={handleDirectSearch}>
                Search backend for "{searchQuery}"
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No mock results found</h2>
            <p className="text-muted-foreground mb-6">
              Try our backend search to analyze any company
            </p>
            <div className="flex flex-col gap-4 items-center">
              <Button onClick={handleDirectSearch}>
                Search backend for "{searchQuery}"
              </Button>
              <Button variant="outline" onClick={handleShowAllCompanies}>
                Show all available mock companies
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}