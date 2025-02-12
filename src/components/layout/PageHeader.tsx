import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  const location = useNavigate();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  // Get the current page title and action button config
  const getPageConfig = () => {
    const path = pathname.split("/").filter(Boolean);
    if (path.length === 0) return { title: "Dashboard" };

    const configs = {
      drivers: {
        title: "Drivers",
        action: () => navigate("/drivers/new"),
        actionText: "Add Driver",
        formTitle: "Add new driver",
      },
      vehicles: {
        title: "Vehicles",
        action: () => navigate("/vehicles/new"),
        actionText: "Add Vehicle",
        formTitle: "Add new vehicle",
      },
      organization: {
        title: "Organizations",
        action: () => navigate("/organization/new"),
        actionText: "Add Organization",
        formTitle: "Add new organization",
      },
      warehouses: {
        title: "Warehouses",
        action: () => navigate("/locations/warehouses/new"),
        actionText: "Add Warehouse",
        formTitle: "Add new warehouse",
      },
      "fleet-yards": {
        title: "Fleet Yards",
        action: () => navigate("/locations/fleet-yards/new"),
        actionText: "Add Fleet Yard",
        formTitle: "Add new fleet yard",
      },
      permissions: {
        title: "Permissions",
        action: () => navigate("/master/permissions/new"),
        actionText: "Add Permission",
        formTitle: "Add new permission",
      },
      roles: {
        title: "Roles",
        action: () => navigate("/master/roles/new"),
        actionText: "Add Role",
        formTitle: "Add new role",
      },
      users: {
        title: "Users",
        action: () => navigate("/users/new"),
        actionText: "Add User",
        formTitle: "Add new user",
      },
    };

    // Check if we're on a "new" or "edit" page
    const isFormPage = path.includes("new") || path.includes("edit");
    if (isFormPage) {
      // Find the main section (e.g., "drivers", "vehicles", etc.)
      const mainSection = Object.keys(configs).find((key) =>
        path.includes(key),
      );
      if (mainSection && configs[mainSection]) {
        return {
          title: path.includes("new")
            ? configs[mainSection].formTitle
            : `Edit ${configs[mainSection].title.toLowerCase()}`,
        };
      }
    }

    // For list pages
    const page = path[path.length - 1];
    return (
      configs[page] || { title: page.charAt(0).toUpperCase() + page.slice(1) }
    );
  };

  const config = getPageConfig();

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {title || config.title}
        </h1>
        {config.action && (
          <Button onClick={config.action}>
            <Plus className="w-4 h-4 mr-2" /> {config.actionText}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
