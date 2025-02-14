import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHeader from "./PageHeader";

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "shrink-0 transition-all duration-200 ease-in-out h-screen sticky top-0",
          isSidebarCollapsed ? "w-16" : "w-56",
        )}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 lg:hidden bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-2">
              <img src="/huswift-logo.svg" alt="HuSwift" className="h-8 w-8" />
              <span className="font-semibold text-lg">HuSwift</span>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <div className="flex-1 overflow-auto">
          <PageHeader />
          <main className="bg-white min-h-0">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Footer - Static at bottom */}
        <footer className="shrink-0 border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 Hutech Solutions. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
