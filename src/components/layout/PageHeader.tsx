import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  const pathname = useLocation().pathname;

  // Get the current page title
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean);
    if (path.length === 0) return "Dashboard";

    const titles = {
      drivers: "Drivers",
      vehicles: "Vehicles",
      organization: "Organizations",
      warehouses: "Warehouses",
      "fleet-yards": "Fleet Yards",
      permissions: "Permissions",
      roles: "Roles",
      users: "Users",
    };

    // Check if we're on a "new" or "edit" page
    const isFormPage = path.includes("new") || path.includes("edit");
    if (isFormPage) {
      const mainSection = Object.keys(titles).find((key) => path.includes(key));
      if (mainSection) {
        return path.includes("new")
          ? `Add new ${titles[mainSection].toLowerCase()}`
          : `Edit ${titles[mainSection].toLowerCase()}`;
      }
    }

    // For list pages
    const page = path[path.length - 1];
    return titles[page] || page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {title || getPageTitle()}
        </h1>
        {children}
      </div>
    </div>
  );
}
