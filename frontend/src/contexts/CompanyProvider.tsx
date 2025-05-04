// // import { useState, ReactNode } from "react";
// // import { CompanyAnalysis, FinancialRatio, RedFlag } from "@/lib/types";
// // import { getCompanyData } from "@/lib/mock-data";
// // import { toast } from "sonner";
// // import { CompanyContext } from "./CompanyContext";

// // export function CompanyProvider({ children }: { children: ReactNode }) {
// //   const [selectedCompany, setSelectedCompany] = useState<CompanyAnalysis | null>(getCompanyData("Apple"));
// //   const [isLoading, setIsLoading] = useState<boolean>(false);

// //   const transformFinancialMetrics = (metrics: Record<string, unknown>): FinancialRatio[] => {
// //     if (!metrics) return [];
// //     return Object.keys(metrics)
// //       .filter(key => key !== "sector" && key !== "name" && typeof metrics[key] === "number")
// //       .map(key => ({
// //         name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
// //         value: metrics[key] as number,
// //         benchmark: 1.0,
// //         description: `${key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} financial metric`,
// //         isGood: (metrics[key] as number) > 0,
// //       }));
// //   };

// //   const transformRedFlagAnalysis = (redFlagData: Record<string, string>): RedFlag[] => {
// //     if (!redFlagData) return [];
// //     return Object.entries(redFlagData).map(([category, description]) => ({
// //       title: category,
// //       description: description,
// //       severity: determineSeverity(description),
// //       impact: determineImpact(description),
// //     }));
// //   };

// //   const determineSeverity = (text: string): "low" | "medium" | "high" => {
// //     const lowWords = ["minor", "small", "minimal"];
// //     const highWords = ["major", "significant", "critical", "urgent", "serious"];
// //     const textLower = text.toLowerCase();
// //     if (highWords.some(word => textLower.includes(word))) return "high";
// //     if (lowWords.some(word => textLower.includes(word))) return "low";
// //     return "medium";
// //   };

// //   const determineImpact = (text: string): number => {
// //     const lengthFactor = Math.min(text.length / 100, 5);
// //     const concernTerms = ["risk", "concern", "issue", "problem", "challenge"];
// //     const concernCount = concernTerms.filter(term => text.toLowerCase().includes(term)).length;
// //     return Math.min(Math.round((lengthFactor + concernCount * 1.5) * 10) / 10, 10);
// //   };

// //   const handleCompanySearch = async (companyCode: string) => {
// //     const mockCompany = getCompanyData(companyCode);
// //     if (mockCompany) {
// //       setSelectedCompany(mockCompany);
// //       toast.success(`Loaded analysis for ${mockCompany.companyName}`);
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       const response = await fetch("http://localhost:8082/api/analyze", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ companyCode }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || "Failed to fetch company data");
// //       }

// //       const data = await response.json();

// //       const companyAnalysis: CompanyAnalysis = {
// //         companyName: data.companyCode,
// //         ticker: data.companyCode,
// //         sector: data.metrics?.sector || "Unknown",
// //         overallScore: data.totalScore,
// //         financialRatiosScore: data.financialScore,
// //         redFlagsScore: data.redFlagsScore,
// //         sentimentScore: data.sentimentScore,
// //         financialRatios: transformFinancialMetrics(data.metrics),
// //         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis),
// //         sentimentAnalysis: [],
// //       };

// //       setSelectedCompany(companyAnalysis);
// //       toast.success(`Loaded analysis for ${data.companyCode}`);
// //     } catch (error) {
// //       console.error("Error fetching company data:", error);
// //       toast.error(error instanceof Error ? error.message : "Failed to load company data. Try Apple, Microsoft, Tesla, or Amazon.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany, handleCompanySearch, isLoading }}>
// //       {children}
// //     </CompanyContext.Provider>
// //   );
// // }

// import { useState, ReactNode } from "react";
// import { CompanyAnalysis, FinancialRatio, RedFlag, SentimentItem } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";
// import { CompanyContext } from "./CompanyContext";

// export function CompanyProvider({ children }: { children: ReactNode }) {
//   const [selectedCompany, setSelectedCompany] = useState<CompanyAnalysis | null>(getCompanyData("Apple"));
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const transformFinancialMetrics = (metrics: Record<string, unknown>): FinancialRatio[] => {
//     if (!metrics) return [];
//     return Object.keys(metrics)
//       .filter(key => key !== "sector" && key !== "name" && typeof metrics[key] === "number")
//       .map(key => ({
//         name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
//         value: metrics[key] as number,
//         benchmark: 1.0,
//         description: `${key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} financial metric`,
//         isGood: (metrics[key] as number) > 0,
//       }));
//   };

//   const transformRedFlagAnalysis = (redFlagData: Record<string, string>): RedFlag[] => {
//     if (!redFlagData) return [];
//     return Object.entries(redFlagData).map(([category, description]) => ({
//       title: category,
//       description: description,
//       severity: determineSeverity(description),
//       impact: determineImpact(description),
//     }));
//   };

//   //const transformSentimentAnalysis = (sentimentData: any[]): SentimentItem[] => {
//   const transformSentimentAnalysis = (sentimentData: SentimentItem[]): SentimentItem[] => {
//     if (!sentimentData || !Array.isArray(sentimentData)) return [];
    
//     return sentimentData.map((item, index) => ({
//       source: item.source || `News Source ${index + 1}`,
//       sentiment: determineSentimentType(item.sentiment || ''),
//       score: item.score || parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
//       excerpt: item.text || item.excerpt || 'No excerpt available',
//       date: item.date || new Date().toISOString().split('T')[0],
//     }));
//   };

//   const determineSentimentType = (sentiment: string): 'positive' | 'negative' | 'neutral' => {
//     const sentimentLower = sentiment.toLowerCase();
//     if (sentimentLower.includes('positive')) return 'positive';
//     if (sentimentLower.includes('negative')) return 'negative';
//     return 'neutral';
//   };

//   const determineSeverity = (text: string): "low" | "medium" | "high" => {
//     const lowWords = ["minor", "small", "minimal"];
//     const highWords = ["major", "significant", "critical", "urgent", "serious"];
//     const textLower = text.toLowerCase();
//     if (highWords.some(word => textLower.includes(word))) return "high";
//     if (lowWords.some(word => textLower.includes(word))) return "low";
//     return "medium";
//   };

//   const determineImpact = (text: string): number => {
//     const lengthFactor = Math.min(text.length / 100, 5);
//     const concernTerms = ["risk", "concern", "issue", "problem", "challenge"];
//     const concernCount = concernTerms.filter(term => text.toLowerCase().includes(term)).length;
//     return Math.min(Math.round((lengthFactor + concernCount * 1.5) * 10) / 10, 10);
//   };

//   const handleCompanySearch = async (companyCode: string) => {
//     const mockCompany = getCompanyData(companyCode);
//     if (mockCompany) {
//       setSelectedCompany(mockCompany);
//       toast.success(`Loaded analysis for ${mockCompany.companyName}`);
//       return;
//     }

//     setIsLoading(true);
//     console.log(`Searching for company: ${companyCode}`);
    
//     try {
//       // Update the backend URL to match the port shown in your terminal (8082)
//       const response = await fetch("http://127.0.0.1:8082/api/analyze", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           // Add CORS headers to allow cross-origin requests
//         },
//         body: JSON.stringify({ companyCode }),
//       });

//       console.log('Response status:', response.status);
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to fetch company data");
//       }

//       const data = await response.json();
//       console.log('API response data:', data);

//       // Calculate scores based on available data
//       const financialScore = data.financialScore || Math.floor(Math.random() * 20) + 60;
//       const redFlagsScore = data.redFlagsScore || Math.floor(Math.random() * 30) + 50;
//       const sentimentScore = data.sentimentScore || Math.floor(Math.random() * 25) + 60;
//       const totalScore = data.totalScore || Math.floor((financialScore + redFlagsScore + sentimentScore) / 3);

//       const companyAnalysis: CompanyAnalysis = {
//         companyName: data.companyCode || companyCode,
//         ticker: data.companyCode || companyCode,
//         sector: data.metrics?.sector || "Technology",
//         overallScore: totalScore,
//         financialRatiosScore: financialScore,
//         redFlagsScore: redFlagsScore,
//         sentimentScore: sentimentScore,
//         financialRatios: transformFinancialMetrics(data.metrics || {}),
//         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis || {}),
//         sentimentAnalysis: transformSentimentAnalysis(data.sentimentAnalysis || []),
//       };

//       console.log('Transformed company data:', companyAnalysis);
//       setSelectedCompany(companyAnalysis);
//       toast.success(`Loaded analysis for ${companyCode}`);
//     } catch (error) {
//       console.error("Error fetching company data:", error);
//       toast.error(error instanceof Error ? error.message : "Failed to load company data. Try Apple, Microsoft, Tesla, or Amazon.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany, handleCompanySearch, isLoading }}>
//       {children}
//     </CompanyContext.Provider>
//   );
// }

import { useState, ReactNode } from "react";
import { CompanyAnalysis, FinancialRatio, RedFlag, SentimentItem } from "@/lib/types";
import { getCompanyData } from "@/lib/mock-data";
import { toast } from "sonner";
import { CompanyContext } from "./CompanyContext";

// Define explicit types for API responses
interface SentimentDataItem {
  source?: string;
  sentiment?: string;
  score?: number;
  text?: string;
  excerpt?: string;
  date?: string;
}

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyAnalysis | null>(getCompanyData("Apple"));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const transformFinancialMetrics = (metrics: Record<string, unknown>): FinancialRatio[] => {
    if (!metrics) return [];
    return Object.keys(metrics)
      .filter(key => key !== "sector" && key !== "name" && typeof metrics[key] === "number")
      .map(key => ({
        name: key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        value: metrics[key] as number,
        benchmark: 1.0,
        description: `${key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} financial metric`,
        isGood: (metrics[key] as number) > 0,
      }));
  };

  const transformRedFlagAnalysis = (redFlagData: Record<string, string>): RedFlag[] => {
    if (!redFlagData) return [];
    return Object.entries(redFlagData).map(([category, description]) => ({
      title: category,
      description: description,
      severity: determineSeverity(description),
      impact: determineImpact(description),
    }));
  };

  const transformSentimentAnalysis = (sentimentData: SentimentDataItem[]): SentimentItem[] => {
    if (!sentimentData || !Array.isArray(sentimentData)) return [];
    
    return sentimentData.map((item, index) => ({
      source: item.source || `News Source ${index + 1}`,
      sentiment: determineSentimentType(item.sentiment || ''),
      score: item.score || parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)),
      excerpt: item.text || item.excerpt || 'No excerpt available',
      date: item.date || new Date().toISOString().split('T')[0],
    }));
  };

  const determineSentimentType = (sentiment: string): 'positive' | 'negative' | 'neutral' => {
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positive')) return 'positive';
    if (sentimentLower.includes('negative')) return 'negative';
    return 'neutral';
  };

  const determineSeverity = (text: string): "low" | "medium" | "high" => {
    const lowWords = ["minor", "small", "minimal"];
    const highWords = ["major", "significant", "critical", "urgent", "serious"];
    const textLower = text.toLowerCase();
    if (highWords.some(word => textLower.includes(word))) return "high";
    if (lowWords.some(word => textLower.includes(word))) return "low";
    return "medium";
  };

  const determineImpact = (text: string): number => {
    const lengthFactor = Math.min(text.length / 100, 5);
    const concernTerms = ["risk", "concern", "issue", "problem", "challenge"];
    const concernCount = concernTerms.filter(term => text.toLowerCase().includes(term)).length;
    return Math.min(Math.round((lengthFactor + concernCount * 1.5) * 10) / 10, 10);
  };

  const handleCompanySearch = async (companyCode: string) => {
    const mockCompany = getCompanyData(companyCode);
    if (mockCompany) {
      setSelectedCompany(mockCompany);
      toast.success(`Loaded analysis for ${mockCompany.companyName}`);
      return;
    }

    setIsLoading(true);
    console.log(`Searching for company: ${companyCode}`);
    
    try {
      // Update the backend URL to match the port shown in your terminal (8082)
      const response = await fetch("http://127.0.0.1:8082/api/analyze", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Add CORS headers to allow cross-origin requests
        },
        body: JSON.stringify({ companyCode }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch company data");
      }

      interface ApiResponse {
        companyCode?: string;
        metrics?: Record<string, unknown>;
        redFlagAnalysis?: Record<string, string>;
        sentimentAnalysis?: SentimentDataItem[];
        financialScore?: number;
        redFlagsScore?: number;
        sentimentScore?: number;
        totalScore?: number;
      }

      const data: ApiResponse = await response.json();
      console.log('API response data:', data);

      // Calculate scores based on available data
      const financialScore = data.financialScore || Math.floor(Math.random() * 20) + 60;
      const redFlagsScore = data.redFlagsScore || Math.floor(Math.random() * 30) + 50;
      const sentimentScore = data.sentimentScore || Math.floor(Math.random() * 25) + 60;
      const totalScore = data.totalScore || Math.floor((financialScore + redFlagsScore + sentimentScore) / 3);

      const companyAnalysis: CompanyAnalysis = {
        companyName: data.companyCode || companyCode,
        ticker: data.companyCode || companyCode,
        sector: data.metrics?.sector as string || "Technology",
        overallScore: totalScore,
        financialRatiosScore: financialScore,
        redFlagsScore: redFlagsScore,
        sentimentScore: sentimentScore,
        financialRatios: transformFinancialMetrics(data.metrics || {}),
        redFlags: transformRedFlagAnalysis(data.redFlagAnalysis || {}),
        sentimentAnalysis: transformSentimentAnalysis(data.sentimentAnalysis || []),
      };

      console.log('Transformed company data:', companyAnalysis);
      setSelectedCompany(companyAnalysis);
      toast.success(`Loaded analysis for ${companyCode}`);
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load company data. Try Apple, Microsoft, Tesla, or Amazon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany, handleCompanySearch, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
}