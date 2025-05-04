
// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { Toaster } from "@/components/ui/sonner";

// interface LayoutProps {
//   children: React.ReactNode;
//   showSearch?: boolean;
//   handleCompanySearch?: (company: string) => void;
// }

// export function Layout({ children, showSearch = false, handleCompanySearch }: LayoutProps) {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header handleCompanySearch={showSearch ? handleCompanySearch : undefined} />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           {children}
//         </main>
//         <Toaster />
//       </div>
//     </div>
//   );
// }

// import { Sidebar } from "./Sidebar";
// import { Header } from "./Header";
// import { Toaster } from "@/components/ui/sonner";
// import { useCompany } from "@/contexts/useCompany";
// import { Loader2 } from "lucide-react";

// interface LayoutProps {
//   children: React.ReactNode;
//   showSearch?: boolean;
//   handleCompanySearch?: (company: string) => void;
// }

// export function Layout({ children, showSearch = true, handleCompanySearch }: LayoutProps) {
//   const { isLoading } = useCompany();

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header handleCompanySearch={handleCompanySearch} />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
//           {isLoading && (
//             <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
//               <div className="flex flex-col items-center gap-2">
//                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 <p className="text-sm font-medium">Analyzing company data...</p>
//               </div>
//             </div>
//           )}
//           {children}
//         </main>
//         <Toaster />
//       </div>
//     </div>
//   );
// }

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/sonner";
import { useCompany } from "@/contexts/useCompany";
import { Loader2 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  handleCompanySearch?: (company: string) => void;
}

export function Layout({ children, showSearch = true, handleCompanySearch }: LayoutProps) {
  const { isLoading } = useCompany();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header handleCompanySearch={showSearch ? handleCompanySearch : undefined} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium">Analyzing company data...</p>
              </div>
            </div>
          )}
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}
