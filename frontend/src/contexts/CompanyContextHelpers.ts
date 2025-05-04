// contexts/CompanyContextHelpers.ts
import { createContext, useContext } from "react";
import { CompanyAnalysis } from "@/lib/types";

export interface CompanyContextType {
  activeCompany: CompanyAnalysis | null;
  setActiveCompany: (company: CompanyAnalysis) => void;
  handleCompanySearch: (companyName: string) => void;
  isLoading: boolean;
}

export const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
