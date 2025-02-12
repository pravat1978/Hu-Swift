import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHeader from "./PageHeader";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:inset-auto",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out"
        style={{ marginLeft: "1rem" }}
      >
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <PageHeader />
          <div className="container mx-auto py-6">
            <Outlet />
          </div>
        </main>
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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
