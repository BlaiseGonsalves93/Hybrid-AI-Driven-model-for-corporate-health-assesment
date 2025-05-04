
// import Dashboard from "./Dashboard";

// const Index = () => {
//   return <Dashboard />;
// };

// export default Index;
// import Dashboard from "./Dashboard";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { ExternalLink, Search } from "lucide-react";

// const Index = () => {
//   return (
//     <div className="relative">
//       <Dashboard />
//       <div className="fixed bottom-4 right-4 flex gap-2">
//         <Link to="/search">
//           <Button variant="default" className="flex items-center gap-2">
//             <Search className="h-4 w-4" />
//             <span>Search Any Company</span>
//           </Button>
//         </Link>
//         <Link to="/integration">
//           <Button variant="outline" className="flex items-center gap-2">
//             <span>Backend Integration</span>
//             <ExternalLink className="h-4 w-4" />
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Index;

import Dashboard from "./Dashboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="relative">
      <Dashboard />
      <div className="fixed bottom-4 right-4 flex gap-2">
        <Link to="/search">
          <Button variant="default" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Any Company</span>
          </Button>
        </Link>
        <Link to="/integration">
          <Button variant="outline" className="flex items-center gap-2">
            <span>Backend Integration</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;