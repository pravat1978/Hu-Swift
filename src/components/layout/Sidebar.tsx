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

  // Determine which accordion items should be open based on current path
  const defaultAccordionValues = [];
  if (location.pathname.includes("/master")) {
    defaultAccordionValues.push("master");
  }
  if (
    ["/organization", "/locations", "/drivers", "/vehicles", "/users"].some(
      (path) => location.pathname.includes(path),
    )
  ) {
    defaultAccordionValues.push("onboarding");
  }

  return (
    <div className="flex flex-col h-full bg-blue-50 border-r border-blue-200 w-[280px]">
      <div className="p-6 space-y-1">
        <div className="flex items-center gap-2">
          <img src="/huswift-logo.svg" alt="HuSwift" className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold text-blue-700">HuSwift</h1>
            <p className="text-sm text-blue-600 italic">
              Moving Smarter, Delivering Faster!
            </p>
          </div>
        </div>
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
                        ? "bg-blue-100 text-blue-900"
                        : "text-blue-700 hover:text-blue-900 hover:bg-blue-50",
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

        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={defaultAccordionValues}
        >
          <AccordionItem value="onboarding">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <HandshakeIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">Onboarding</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pt-1">
                {onboardingItems.map((item) => (
                  <Link key={item.href} to={item.href}>
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
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="master">
            <AccordionTrigger className="py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="text-sm font-semibold">Master Data</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pt-1">
                {masterDataItems.map((item) => (
                  <Link key={item.href} to={item.href}>
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
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  );
}
