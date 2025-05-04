// // // import { useContext } from "react";
// // // import { CompanyContext } from "@/contexts/CompanyContext";

// // // export const useCompany = () => {
// // //   const context = useContext(CompanyContext);
// // //   if (!context) {
// // //     throw new Error("useCompany must be used within a CompanyProvider");
// // //   }
// // //   return context;
// // // };

// // // hooks/useCompany.ts

// // // import { useContext } from "react";
// // // import { CompanyContext } from "@/contexts/CompanyContext";

// // // export function useCompany() {
// // //   const context = useContext(CompanyContext);
// // //   if (context === undefined) {
// // //     throw new Error("useCompany must be used within a CompanyProvider");
// // //   }
// // //   return context;
// // // }
// // import { createContext, useContext } from "react";
// // import { CompanyAnalysis } from "@/lib/types";

// // export interface CompanyContextType {
// //   selectedCompany: CompanyAnalysis | null;
// //   setSelectedCompany: (company: CompanyAnalysis) => void;
// //   handleCompanySearch: (companyName: string) => void;
// //   isLoading: boolean;
// // }

// // export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// // export function useCompany(): CompanyContextType {
// //   const context = useContext(CompanyContext);
// //   if (context === undefined) {
// //     throw new Error("useCompany must be used within a CompanyProvider");
// //   }
// //   return context;
// // }

// import { useContext } from "react";
// import { CompanyAnalysis } from "@/lib/types";
// import { CompanyContext } from "./CompanyContext";

// export interface CompanyContextType {
//   selectedCompany: CompanyAnalysis | null;
//   setSelectedCompany: (company: CompanyAnalysis) => void;
//   handleCompanySearch: (companyName: string) => void;
//   isLoading: boolean;
// }

// export function useCompany(): CompanyContextType {
//   const context = useContext(CompanyContext);
//   if (context === undefined) {
//     throw new Error("useCompany must be used within a CompanyProvider");
//   }
//   return context;
// }

import { useContext } from "react";
import { CompanyContext, CompanyContextType } from "./CompanyContext";

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}