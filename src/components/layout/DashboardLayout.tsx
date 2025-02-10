import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
