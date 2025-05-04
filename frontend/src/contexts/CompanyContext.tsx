// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { CompanyAnalysis } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";

// interface CompanyContextType {
//   selectedCompany: CompanyAnalysis | null;
//   setSelectedCompany: (company: string) => void;
// }

// const CompanyContext = createContext<CompanyContextType>({
//   selectedCompany: null,
//   setSelectedCompany: () => {},
// });

// export const useCompany = () => useContext(CompanyContext);

// export const CompanyProvider = ({ children }: { children: ReactNode }) => {
//   const [selectedCompany, setSelectedCompanyState] = useState<CompanyAnalysis | null>(null);

//   useEffect(() => {
//     // Initialize from session storage or default to Apple
//     const storedCompany = sessionStorage.getItem('selectedCompany');
//     if (storedCompany) {
//       const companyData = getCompanyData(storedCompany);
//       if (companyData) {
//         setSelectedCompanyState(companyData);
//       } else {
//         const defaultCompany = getCompanyData("Apple");
//         setSelectedCompanyState(defaultCompany || null);
//       }
//     } else {
//       const defaultCompany = getCompanyData("Apple");
//       setSelectedCompanyState(defaultCompany || null);
//     }
//   }, []);

//   const setSelectedCompany = (companyName: string) => {
//     const companyData = getCompanyData(companyName);
//     if (companyData) {
//       sessionStorage.setItem('selectedCompany', companyData.companyName);
//       setSelectedCompanyState(companyData);
//     }
//   };

//   return (
//     <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
//       {children}
//     </CompanyContext.Provider>
//   );
// };


// import { createContext, useState, useContext, ReactNode, useEffect } from "react";
// import { CompanyAnalysis } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";

// interface CompanyContextType {
//   activeCompany: CompanyAnalysis | null;
//   setActiveCompany: (company: CompanyAnalysis) => void;
//   handleCompanySearch: (companyName: string) => void;
//   isLoading: boolean;
// }

// const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// export function CompanyProvider({ children }: { children: ReactNode }) {
//   const [activeCompany, setActiveCompany] = useState<CompanyAnalysis | null>(getCompanyData("Apple"));
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleCompanySearch = async (companyCode: string) => {
//     // First check if it's one of our mock companies for development
//     const mockCompany = getCompanyData(companyCode);
    
//     if (mockCompany) {
//       setActiveCompany(mockCompany);
//       toast.success(`Loaded analysis for ${mockCompany.companyName}`);
//       return;
//     }
    
//     // If not a mock company, try to fetch from the backend
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8082/api/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ companyCode }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch company data');
//       }
      
//       const data = await response.json();
      
//       // Transform the backend response into our CompanyAnalysis type
//       const companyAnalysis: CompanyAnalysis = {
//         companyName: data.companyCode,
//         ticker: data.companyCode,
//         sector: data.metrics?.sector || 'Unknown',
//         overallScore: data.totalScore,
//         financialRatiosScore: data.financialScore,
//         redFlagsScore: data.redFlagsScore,
//         sentimentScore: data.sentimentScore,
//         financialRatios: transformFinancialMetrics(data.metrics),
//         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis),
//         sentimentAnalysis: [] // Backend doesn't provide detailed sentiment items yet
//       };
      
//       setActiveCompany(companyAnalysis);
//       toast.success(`Loaded analysis for ${data.companyCode}`);
//     } catch (error) {
//       console.error('Error fetching company data:', error);
//       toast.error(error instanceof Error ? error.message : "Failed to load company data. Try Apple, Microsoft, Tesla, or Amazon.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to transform financial metrics from backend to our format
//   const transformFinancialMetrics = (metrics: unknown): unknown[] => {
//     if (!metrics) return [];
    
//     // Extract keys that are actual financial ratios
//     const ratioKeys = Object.keys(metrics).filter(key => 
//       key !== 'sector' && key !== 'name' && typeof metrics[key] === 'number'
//     );
    
//     return ratioKeys.map(key => ({
//       name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
//       value: metrics[key],
//       benchmark: 1.0, // You might want to adjust this based on industry standards
//       description: `${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} financial metric`,
//       isGood: metrics[key] > 0 // Simple logic, might need refinement based on the metric
//     }));
//   };

//   // Helper function to transform red flag analysis from backend to our format
//   const transformRedFlagAnalysis = (redFlagData: unknown): unknown[] => {
//     if (!redFlagData) return [];
    
//     return Object.entries(redFlagData).map(([category, description]) => ({
//       title: category,
//       description: description,
//       severity: determineSeverity(description as string),
//       impact: determineImpact(description as string)
//     }));
//   };

//   // Simple heuristic to determine severity based on text content
//   const determineSeverity = (text: string): 'low' | 'medium' | 'high' => {
//     const lowWords = ['minor', 'small', 'minimal'];
//     const highWords = ['major', 'significant', 'critical', 'urgent', 'serious'];
    
//     const textLower = text.toLowerCase();
    
//     if (highWords.some(word => textLower.includes(word))) {
//       return 'high';
//     } else if (lowWords.some(word => textLower.includes(word))) {
//       return 'low';
//     } else {
//       return 'medium';
//     }
//   };

//   // Simple heuristic to determine impact score based on text length and content
//   const determineImpact = (text: string): number => {
//     // Longer descriptions might indicate more significant issues
//     const lengthFactor = Math.min(text.length / 100, 5);
    
//     // Check for concerning terms
//     const concernTerms = ['risk', 'concern', 'issue', 'problem', 'challenge'];
//     const concernCount = concernTerms.filter(term => 
//       text.toLowerCase().includes(term)
//     ).length;
    
//     return Math.min(Math.round((lengthFactor + concernCount * 1.5) * 10) / 10, 10);
//   };

//   return (
//     <CompanyContext.Provider value={{ activeCompany, setActiveCompany, handleCompanySearch, isLoading }}>
//       {children}
//     </CompanyContext.Provider>
//   );
// }

// export function useCompany() {
//   const context = useContext(CompanyContext);
//   if (context === undefined) {
//     throw new Error("useCompany must be used within a CompanyProvider");
//   }
//   return context;
// }

// contexts/CompanyContext.tsx


// import { createContext, useState, ReactNode } from "react";
// import { CompanyAnalysis } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";

// interface CompanyContextType {
//   activeCompany: CompanyAnalysis | null;
//   setActiveCompany: (company: CompanyAnalysis) => void;
//   handleCompanySearch: (companyName: string) => void;
//   isLoading: boolean;
// }

// export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// export function CompanyProvider({ children }: { children: ReactNode }) {
//   const [activeCompany, setActiveCompany] = useState<CompanyAnalysis | null>(getCompanyData("Apple"));
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleCompanySearch = async (companyCode: string) => {
//     const mockCompany = getCompanyData(companyCode);
//     if (mockCompany) {
//       setActiveCompany(mockCompany);
//       toast.success(`Loaded analysis for ${mockCompany.companyName}`);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8082/api/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ companyCode }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch company data');
//       }

//       const data = await response.json();

//       const companyAnalysis: CompanyAnalysis = {
//         companyName: data.companyCode,
//         ticker: data.companyCode,
//         sector: data.metrics?.sector || 'Unknown',
//         overallScore: data.totalScore,
//         financialRatiosScore: data.financialScore,
//         redFlagsScore: data.redFlagsScore,
//         sentimentScore: data.sentimentScore,
//         financialRatios: transformFinancialMetrics(data.metrics),
//         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis),
//         sentimentAnalysis: [],
//       };

//       setActiveCompany(companyAnalysis);
//       toast.success(`Loaded analysis for ${data.companyCode}`);
//     } catch (error) {
//       console.error('Error fetching company data:', error);
//       toast.error(error instanceof Error ? error.message : "Failed to load company data. Try Apple, Microsoft, Tesla, or Amazon.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const transformFinancialMetrics = (metrics: any): unknown[] => {
//     if (!metrics) return [];
//     const ratioKeys = Object.keys(metrics).filter(key =>
//       key !== 'sector' && key !== 'name' && typeof metrics[key] === 'number'
//     );

//     return ratioKeys.map(key => ({
//       name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
//       value: metrics[key],
//       benchmark: 1.0,
//       description: `${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} financial metric`,
//       isGood: metrics[key] > 0,
//     }));
//   };

//   const transformRedFlagAnalysis = (redFlagData: any): unknown[] => {
//     if (!redFlagData) return [];

//     return Object.entries(redFlagData).map(([category, description]) => ({
//       title: category,
//       description: description,
//       severity: determineSeverity(description as string),
//       impact: determineImpact(description as string),
//     }));
//   };

//   const determineSeverity = (text: string): 'low' | 'medium' | 'high' => {
//     const lowWords = ['minor', 'small', 'minimal'];
//     const highWords = ['major', 'significant', 'critical', 'urgent', 'serious'];

//     const textLower = text.toLowerCase();
//     if (highWords.some(word => textLower.includes(word))) return 'high';
//     if (lowWords.some(word => textLower.includes(word))) return 'low';
//     return 'medium';
//   };

//   const determineImpact = (text: string): number => {
//     const lengthFactor = Math.min(text.length / 100, 5);
//     const concernTerms = ['risk', 'concern', 'issue', 'problem', 'challenge'];
//     const concernCount = concernTerms.filter(term =>
//       text.toLowerCase().includes(term)
//     ).length;

//     return Math.min(Math.round((lengthFactor + concernCount * 1.5) * 10) / 10, 10);
//   };

//   return (
//     <CompanyContext.Provider value={{ activeCompany, setActiveCompany, handleCompanySearch, isLoading }}>
//       {children}
//     </CompanyContext.Provider>
//   );
// }

// import { createContext, useState, useContext, ReactNode } from "react";
// import { CompanyAnalysis, FinancialRatio, RedFlag } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";

// interface CompanyContextType {
//   selectedCompany: CompanyAnalysis | null;
//   setSelectedCompany: (company: CompanyAnalysis) => void;
//   handleCompanySearch: (companyName: string) => void;
//   isLoading: boolean;
// }

// const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

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
//     try {
//       const response = await fetch("http://localhost:8082/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ companyCode }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to fetch company data");
//       }

//       const data = await response.json();

//       const companyAnalysis: CompanyAnalysis = {
//         companyName: data.companyCode,
//         ticker: data.companyCode,
//         sector: data.metrics?.sector || "Unknown",
//         overallScore: data.totalScore,
//         financialRatiosScore: data.financialScore,
//         redFlagsScore: data.redFlagsScore,
//         sentimentScore: data.sentimentScore,
//         financialRatios: transformFinancialMetrics(data.metrics),
//         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis),
//         sentimentAnalysis: [],
//       };

//       setSelectedCompany(companyAnalysis);
//       toast.success(`Loaded analysis for ${data.companyCode}`);
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

// // export function useCompany() {
// //   const context = useContext(CompanyContext);
// //   if (context === undefined) {
// //     throw new Error("useCompany must be used within a CompanyProvider");
// //   }
// //   return context;
// // }

// import { createContext, useState, ReactNode } from "react";
// import { CompanyAnalysis, FinancialRatio, RedFlag } from "@/lib/types";
// import { getCompanyData } from "@/lib/mock-data";
// import { toast } from "sonner";

// export interface CompanyContextType {
//   selectedCompany: CompanyAnalysis | null;
//   setSelectedCompany: (company: CompanyAnalysis) => void;
//   handleCompanySearch: (companyName: string) => void;
//   isLoading: boolean;
// }

// export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

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
//     try {
//       const response = await fetch("http://localhost:8082/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ companyCode }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to fetch company data");
//       }

//       const data = await response.json();

//       const companyAnalysis: CompanyAnalysis = {
//         companyName: data.companyCode,
//         ticker: data.companyCode,
//         sector: data.metrics?.sector || "Unknown",
//         overallScore: data.totalScore,
//         financialRatiosScore: data.financialScore,
//         redFlagsScore: data.redFlagsScore,
//         sentimentScore: data.sentimentScore,
//         financialRatios: transformFinancialMetrics(data.metrics),
//         redFlags: transformRedFlagAnalysis(data.redFlagAnalysis),
//         sentimentAnalysis: [],
//       };

//       setSelectedCompany(companyAnalysis);
//       toast.success(`Loaded analysis for ${data.companyCode}`);
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


import { createContext } from "react";
import { CompanyAnalysis } from "@/lib/types";

export interface CompanyContextType {
  selectedCompany: CompanyAnalysis | null;
  setSelectedCompany: (company: CompanyAnalysis) => void;
  handleCompanySearch: (companyName: string) => void;
  isLoading: boolean;
}

export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);
