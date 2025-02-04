import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/components/home";
import VehicleList from "@/components/vehicles/VehicleList";
import VehicleForm from "@/components/vehicles/VehicleForm";
import DriverList from "@/components/drivers/DriverList";
import DriverForm from "@/components/drivers/DriverForm";
import OrganizationList from "@/components/organization/OrganizationList";
import OrganizationForm from "@/components/organization/OrganizationForm";
import WarehouseList from "@/components/locations/WarehouseList";
import WarehouseForm from "@/components/locations/WarehouseForm";
import FleetYardList from "@/components/locations/FleetYardList";
import FleetYardForm from "@/components/locations/FleetYardForm";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="vehicles" element={<VehicleList />} />
            <Route path="vehicles/new" element={<VehicleForm />} />
            <Route path="vehicles/:id/edit" element={<VehicleForm />} />
            <Route path="drivers" element={<DriverList />} />
            <Route path="drivers/new" element={<DriverForm />} />
            <Route path="drivers/:id/edit" element={<DriverForm />} />
            <Route path="organization" element={<OrganizationList />} />
            <Route path="organization/new" element={<OrganizationForm />} />
            <Route
              path="organization/:id/edit"
              element={<OrganizationForm />}
            />
            <Route path="locations/warehouses" element={<WarehouseList />} />
            <Route
              path="locations/warehouses/new"
              element={<WarehouseForm />}
            />
            <Route
              path="locations/warehouses/:id/edit"
              element={<WarehouseForm />}
            />
            <Route path="locations/fleet-yards" element={<FleetYardList />} />
            <Route
              path="locations/fleet-yards/new"
              element={<FleetYardForm />}
            />
            <Route
              path="locations/fleet-yards/:id/edit"
              element={<FleetYardForm />}
            />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
