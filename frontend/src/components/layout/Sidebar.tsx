
import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, AlertTriangle, MessageSquare, Home, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const SidebarItem = ({ icon: Icon, label, to, isCollapsed, isActive }: SidebarItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = window.location.pathname;

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
      isActive: pathname === "/search",
    },
    {
      name: "Financial Ratios",
      href: "/financial-ratios",
      icon: BarChart3,
      isActive: pathname === "/financial-ratios",
    },
    {
      name: "Red Flags",
      href: "/red-flags",
      icon: AlertTriangle,
      isActive: pathname === "/red-flags",
    },
    {
      name: "Sentiment Analysis",
      href: "/sentiment",
      icon: MessageSquare,
      isActive: pathname === "/sentiment",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out sticky top-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h2 className="font-semibold text-xl text-sidebar-foreground">FinWise</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <SidebarItem
            key={item.name}
            icon={item.icon}
            label={item.name}
            to={item.href}
            isCollapsed={isCollapsed}
            isActive={item.isActive}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            FinWise © 2025
          </div>
        )}
      </div>
    </div>
  );
}
