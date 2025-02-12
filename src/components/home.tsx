import React from "react";
import { Outlet } from "react-router-dom";
import FleetOverview from "@/components/dashboard/FleetOverview";
import DataTable from "@/components/dashboard/DataTable";

const Home = () => {
  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome to HuSwift
        </h1>
        <p className="text-gray-500 mt-2">Your fleet management dashboard</p>
      </div>

      {/* Fleet Overview Section */}
      <FleetOverview />

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Home;
