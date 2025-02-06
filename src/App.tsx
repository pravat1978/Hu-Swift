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
import PermissionList from "@/components/master/PermissionList";
import RoleList from "@/components/master/RoleList";
import UserList from "@/components/users/UserList";
import UserManagement from "@/components/users/UserManagement";
import WarehouseForm from "@/components/locations/WarehouseForm";
import FleetYardList from "@/components/locations/FleetYardList";
import FleetYardForm from "@/components/locations/FleetYardForm";
import routes from "tempo-routes";

function App() {
  return (
    <div className="min-h-screen">
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      {/* App routes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<DashboardLayout />}>
            {/* Dashboard */}
            <Route index element={<Home />} />

            {/* Onboarding Routes */}
            {/* Organizations */}
            <Route path="organization">
              <Route index element={<OrganizationList />} />
              <Route path="new" element={<OrganizationForm />} />
              <Route path=":id/edit" element={<OrganizationForm />} />
            </Route>

            {/* Warehouses */}
            <Route path="locations/warehouses">
              <Route index element={<WarehouseList />} />
              <Route path="new" element={<WarehouseForm />} />
              <Route path=":id/edit" element={<WarehouseForm />} />
            </Route>

            {/* Fleet Yards */}
            <Route path="locations/fleet-yards">
              <Route index element={<FleetYardList />} />
              <Route path="new" element={<FleetYardForm />} />
              <Route path=":id/edit" element={<FleetYardForm />} />
            </Route>

            {/* Drivers */}
            <Route path="drivers">
              <Route index element={<DriverList />} />
              <Route path="new" element={<DriverForm />} />
              <Route path=":id/edit" element={<DriverForm />} />
            </Route>

            {/* Vehicles */}
            <Route path="vehicles">
              <Route index element={<VehicleList />} />
              <Route path="new" element={<VehicleForm />} />
              <Route path=":id/edit" element={<VehicleForm />} />
            </Route>

            {/* Users */}
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path="new" element={<UserManagement />} />
              <Route path=":id/edit" element={<UserManagement />} />
            </Route>

            {/* Master Data Routes */}
            <Route path="master">
              <Route path="permissions" element={<PermissionList />} />
              <Route path="roles" element={<RoleList />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
