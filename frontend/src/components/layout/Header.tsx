
// // import { Search } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export function Header({ handleCompanySearch }: { handleCompanySearch?: (company: string) => void }) {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const navigate = useNavigate();
  
// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (searchTerm.trim()) {
// //       if (handleCompanySearch) {
// //         handleCompanySearch(searchTerm);
// //       } else {
// //         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
// //       }
// //     }
// //   };

// //   return (
// //     <header className="border-b bg-card">
// //       <div className="container flex items-center justify-between h-16 px-4">
// //         <div className="flex-1">
// //           {handleCompanySearch ? (
// //             <form onSubmit={handleSearch} className="relative w-full max-w-sm">
// //               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 type="search"
// //                 placeholder="Search companies..."
// //                 className="pl-8 w-full"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //               <Button 
// //                 type="submit" 
// //                 variant="secondary" 
// //                 className="absolute right-0 top-0 h-full rounded-l-none"
// //               >
// //                 Search
// //               </Button>
// //             </form>
// //           ) : (
// //             <h1 className="text-lg font-semibold">FinWise Company Health Analyzer</h1>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { getCompanyData } from "@/lib/mock-data";

// export function Header({ handleCompanySearch }: { handleCompanySearch?: (company: string) => void }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
  
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       const companyData = getCompanyData(searchTerm);
      
//       if (companyData) {
//         if (handleCompanySearch) {
//           handleCompanySearch(searchTerm);
//         } else {
//           // If no handleCompanySearch provided, navigate to dashboard with the company
//           sessionStorage.setItem('selectedCompany', companyData.companyName);
//           toast.success(`Loading analysis for ${companyData.companyName}`);
//           navigate('/');
//         }
//       } else {
//         toast.error("Company not found. Try Apple, Microsoft, Tesla, or Amazon.");
//       }
//     }
//   };

//   return (
//     <header className="border-b bg-card">
//       <div className="container flex items-center justify-between h-16 px-4">
//         <div className="flex-1">
//           {handleCompanySearch ? (
//             <form onSubmit={handleSearch} className="relative w-full max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search companies..."
//                 className="pl-8 w-full"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Button 
//                 type="submit" 
//                 variant="secondary" 
//                 className="absolute right-0 top-0 h-full rounded-l-none"
//               >
//                 Search
//               </Button>
//             </form>
//           ) : (
//             <div className="flex items-center">
//               <h1 className="text-lg font-semibold mr-4">FinWise Company Health Analyzer</h1>
//               <form onSubmit={handleSearch} className="relative w-full max-w-sm">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search companies..."
//                   className="pl-8 w-full"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Button 
//                   type="submit" 
//                   variant="secondary" 
//                   className="absolute right-0 top-0 h-full rounded-l-none"
//                 >
//                   Search
//                 </Button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCompany } from "@/contexts/useCompany";

// export function Header({ handleCompanySearch }: { handleCompanySearch?: (company: string) => void }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { isLoading } = useCompany();
//   const navigate = useNavigate();
  
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       if (handleCompanySearch) {
//         handleCompanySearch(searchTerm.trim().toUpperCase());
//       } else {
//         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       }
//     }
//   };

//   return (
//     <header className="border-b bg-card">
//       <div className="container flex items-center justify-between h-16 px-4">
//         <div className="flex-1">
//           {handleCompanySearch ? (
//             <form onSubmit={handleSearch} className="relative w-full max-w-sm">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search companies by ticker or name..."
//                 className="pl-8 w-full"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 disabled={isLoading}
//               />
//               <Button 
//                 type="submit" 
//                 variant="secondary" 
//                 className="absolute right-0 top-0 h-full rounded-l-none"
//                 disabled={isLoading}
//               >
//                 Search
//               </Button>
//             </form>
//           ) : (
//             <h1 className="text-lg font-semibold">FinWise Company Health Analyzer</h1>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/contexts/useCompany";

export function Header({ handleCompanySearch }: { handleCompanySearch?: (company: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading } = useCompany();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (handleCompanySearch) {
        handleCompanySearch(searchTerm.trim().toUpperCase());
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex-1">
          {handleCompanySearch ? (
            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies by ticker or name..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="absolute right-0 top-0 h-full rounded-l-none"
                disabled={isLoading}
              >
                Search
              </Button>
            </form>
          ) : (
            <h1 className="text-lg font-semibold">FinWise Company Health Analyzer</h1>
          )}
        </div>
      </div>
    </header>
  );
}