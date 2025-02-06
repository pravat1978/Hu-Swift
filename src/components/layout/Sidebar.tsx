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
  Settings,
  Shield,
  UserCog,
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

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[280px]">
      <div className="p-6 space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">HuSwift</h1>
        <p className="text-sm text-gray-500 italic">
          Moving Smarter, Delivering Faster!
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        <TooltipProvider>
          {mainNavItems.map((item) => (
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
                    <span className="flex-1 text-left">{item.label}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="onboarding">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm font-semibold">Onboarding</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pt-1">
                {onboardingItems.map((item) => (
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
                          <span className="flex-1 text-left">{item.label}</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="master">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="text-sm font-semibold">Master Data</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pt-1">
                {masterDataItems.map((item) => (
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
                          <span className="flex-1 text-left">{item.label}</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  );
}
