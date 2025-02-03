import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Car,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Overview",
    href: "/",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Drivers",
    href: "/drivers",
  },
  {
    icon: <Car className="w-5 h-5" />,
    label: "Vehicles",
    href: "/vehicles",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings",
  },
];

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[280px]">
      {/* Logo Section */}
      <div className="p-6" />

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 px-3",
                      location.pathname === item.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    {item.icon}
                    <span className={cn("flex-1 text-left")}>{item.label}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
