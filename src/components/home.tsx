import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import FleetOverview from "@/components/dashboard/FleetOverview";
import DataTable from "@/components/dashboard/DataTable";

const Home = () => {
  return (
    <div className="h-screen bg-gray-100">
      <main className="overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Fleet Overview Section */}
          <FleetOverview />

          {/* Data Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Drivers Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Drivers</h2>
              <DataTable type="driver" />
            </div>

            {/* Vehicles Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Vehicles</h2>
              <DataTable type="vehicle" />
            </div>
          </div>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
