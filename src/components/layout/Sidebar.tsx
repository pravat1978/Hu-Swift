import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Building2,
  Users,
  Car,
  LayoutDashboard,
  Warehouse,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Type definition for navigation items
interface NavItem {
  icon: JSX.Element;
  label: string;
  href: string;
  subItems?: { icon?: JSX.Element; label: string; href: string }[];
}

// Type definition for navigation sections
interface NavSection {
  label: string;
  items: NavItem[];
}

// Navigation sections with proper type definition
const navSections: NavSection[] = [
  {
    label: "Main",
    items: [
      {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "Dashboard",
        href: "/",
      },
    ],
  },
  {
    label: "Onboarding",
    items: [
      {
        icon: <Building2 className="w-5 h-5" />,
        label: "Organization",
        href: "/organization"
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
        icon: <MapPin className="w-5 h-5" />,
        label: "Locations",
        href: "#",
        subItems: [
          {
            icon: <Warehouse className="w-4 h-4" />,
            label: "Warehouses",
            href: "/locations/warehouses",
          },
          {
            icon: <MapPin className="w-4 h-4" />,
            label: "Fleet Yards",
            href: "/locations/fleet-yards",
          },
        ],
      },
    ],
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

      <nav className="flex-1 p-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label} className="space-y-2">
            <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.label}
            </h2>
            {section.items.map((item) => (
              <div key={item.href} className="space-y-1">
                {item.subItems ? (
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500">
                    {item.icon}
                    <span className="flex-1 text-left">{item.label}</span>
                  </div>
                ) : (
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
                )}
                {item.subItems && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} to={subItem.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 px-3 py-1.5 text-sm",
                            location.pathname === subItem.href
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          )}
                        >
                          {subItem.icon}
                          <span className="flex-1 text-left">
                            {subItem.label}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}
