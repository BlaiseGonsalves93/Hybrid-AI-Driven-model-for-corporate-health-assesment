
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Index from "./pages/Index";
// // import Search from "./pages/Search";
// // import FinancialRatios from "./pages/FinancialRatios";
// // import RedFlags from "./pages/RedFlags";
// // import Sentiment from "./pages/Sentiment";
// // import NotFound from "./pages/NotFound";

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <TooltipProvider>
// //       <Toaster />
// //       <Sonner />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<Index />} />
// //           <Route path="/search" element={<Search />} />
// //           <Route path="/financial-ratios" element={<FinancialRatios />} />
// //           <Route path="/red-flags" element={<RedFlags />} />
// //           <Route path="/sentiment" element={<Sentiment />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </TooltipProvider>
// //   </QueryClientProvider>
// // );

// // export default App;

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Search from "./pages/Search";
// import FinancialRatios from "./pages/FinancialRatios";
// import RedFlags from "./pages/RedFlags";
// import Sentiment from "./pages/Sentiment";
// import NotFound from "./pages/NotFound";
// import { CompanyProvider } from "./contexts/CompanyContext";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <CompanyProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/financial-ratios" element={<FinancialRatios />} />
//             <Route path="/red-flags" element={<RedFlags />} />
//             <Route path="/sentiment" element={<Sentiment />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CompanyProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CompanyProvider } from "./contexts/CompanyContext";
// import Index from "./pages/Index";
// import Search from "./pages/Search";
// import FinancialRatios from "./pages/FinancialRatios";
// import RedFlags from "./pages/RedFlags";
// import Sentiment from "./pages/Sentiment";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <BrowserRouter>
//         <CompanyProvider>
//           <Toaster />
//           <Sonner />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/financial-ratios" element={<FinancialRatios />} />
//             <Route path="/red-flags" element={<RedFlags />} />
//             <Route path="/sentiment" element={<Sentiment />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </CompanyProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CompanyProvider } from "./contexts/CompanyContext";
// import Index from "./pages/Index";
// import Search from "./pages/Search";
// import FinancialRatios from "./pages/FinancialRatios";
// import RedFlags from "./pages/RedFlags";
// import Sentiment from "./pages/Sentiment";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <BrowserRouter>
//         <CompanyProvider>
//           <Toaster />
//           <Sonner />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/financial-ratios" element={<FinancialRatios />} />
//             <Route path="/red-flags" element={<RedFlags />} />
//             <Route path="/sentiment" element={<Sentiment />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </CompanyProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompanyProvider } from "./contexts/CompanyProvider";
import Index from "./pages/Index";
import Search from "./pages/Search";
import FinancialRatios from "./pages/FinancialRatios";
import RedFlags from "./pages/RedFlags";
import Sentiment from "./pages/Sentiment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <CompanyProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/financial-ratios" element={<FinancialRatios />} />
            <Route path="/red-flags" element={<RedFlags />} />
            <Route path="/sentiment" element={<Sentiment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CompanyProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;