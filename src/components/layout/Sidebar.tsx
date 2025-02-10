import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Car,
  LayoutDashboard,
  Warehouse,
  MapPin,
  ChevronDown,
  Truck,
  Shield,
  UserCog,
  Database,
  Handshake as HandshakeIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    href: "/",
  },
];

const masterDataItems: NavItem[] = [
  {
    icon: <Shield className="w-5 h-5" />,
    label: "Permissions",
    href: "/master/permissions",
  },
  {
    icon: <UserCog className="w-5 h-5" />,
    label: "Roles",
    href: "/master/roles",
  },
];

const onboardingItems: NavItem[] = [
  {
    icon: <Building2 className="w-5 h-5" />,
    label: "Organizations",
    href: "/organization",
  },
  {
    icon: <Warehouse className="w-5 h-5" />,
    label: "Warehouses",
    href: "/locations/warehouses",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Fleet Yards",
    href: "/locations/fleet-yards",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Drivers",
    href: "/drivers",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    label: "Vehicles",
    href: "/vehicles",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Users",
    href: "/users",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-blue-900 border-r border-blue-800 transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      <div className="p-6 flex justify-between items-center border-b border-blue-800">
        <div className={cn("flex items-center gap-2", isCollapsed && "hidden")}>
          <img src="/huswift-logo.svg" alt="HuSwift" className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold text-white">HuSwift</h1>
            <p className="text-sm text-blue-300 italic">Moving Smarter!</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-800"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <TooltipProvider>
          {mainNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 px-3 text-white hover:bg-blue-800",
                      location.pathname === item.href && "bg-blue-800",
                    )}
                  >
                    {item.icon}
                    <span
                      className={cn(
                        "flex-1 text-left",
                        isCollapsed && "hidden",
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}

          <Accordion
            type="multiple"
            defaultValue={["onboarding", "master"]}
            className="space-y-2"
          >
            <AccordionItem value="onboarding" className="border-none">
              <AccordionTrigger className="flex items-center justify-between rounded-lg px-3 py-2 text-white hover:bg-blue-800 hover:no-underline data-[state=open]:bg-blue-800">
                <div className="flex items-center gap-2">
                  <HandshakeIcon className="h-5 w-5" />
                  {!isCollapsed && (
                    <span className="text-sm font-semibold">Onboarding</span>
                  )}
                </div>

              </AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="space-y-1 pt-1">
                  {onboardingItems.map((item) => (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link to={item.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-3 px-3 text-white hover:bg-blue-800",
                              location.pathname.includes(item.href) &&
                                "bg-blue-800",
                            )}
                          >
                            {item.icon}
                            <span
                              className={cn(
                                "flex-1 text-left",
                                isCollapsed && "hidden",
                              )}
                            >
                              {item.label}
                            </span>
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="master" className="border-none">
              <AccordionTrigger className="flex items-center justify-between rounded-lg px-3 py-2 text-white hover:bg-blue-800 hover:no-underline data-[state=open]:bg-blue-800">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {!isCollapsed && (
                    <span className="text-sm font-semibold">Master Data</span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="space-y-1 pt-1">
                  {masterDataItems.map((item) => (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link to={item.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-3 px-3 text-white hover:bg-blue-800",
                              location.pathname.includes(item.href) &&
                                "bg-blue-800",
                            )}
                          >
                            {item.icon}
                            <span
                              className={cn(
                                "flex-1 text-left",
                                isCollapsed && "hidden",
                              )}
                            >
                              {item.label}
                            </span>
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TooltipProvider>
      </nav>
    </div>
  );
}
