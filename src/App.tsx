import { Suspense } from "react";
import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginForm from "@/components/auth/LoginForm";
import Home from "@/components/home";
import VehicleList from "@/components/vehicles/VehicleList";
import VehicleForm from "@/components/vehicles/VehicleForm";
import DriverList from "@/components/drivers/DriverList";
import DriverForm from "@/components/drivers/DriverForm";
import OrganizationList from "@/components/organization/OrganizationList";
import OrganizationForm from "@/components/organization/OrganizationForm";
import WarehouseList from "@/components/locations/WarehouseList";
import PermissionList from "@/components/master/PermissionList";
import PermissionForm from "@/components/master/PermissionForm";
import RoleList from "@/components/master/RoleList";
import RoleForm from "@/components/master/RoleForm";
import UserList from "@/components/users/UserList";
import UserManagement from "@/components/users/UserManagement";
import CategoryList from "@/components/inventory/CategoryList";
import CategoryForm from "@/components/inventory/CategoryForm";
import ProductList from "@/components/inventory/ProductList";
import ProductForm from "@/components/inventory/ProductForm";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryForm from "@/components/inventory/InventoryForm";
import WarehouseForm from "@/components/locations/WarehouseForm";
import FleetYardList from "@/components/locations/FleetYardList";
import FleetYardForm from "@/components/locations/FleetYardForm";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        {/* App routes */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginForm />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
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

              {/* Inventory Routes */}
              <Route path="inventory">
                <Route path="categories">
                  <Route index element={<CategoryList />} />
                  <Route path="new" element={<CategoryForm />} />
                  <Route path=":id/edit" element={<CategoryForm />} />
                </Route>
                <Route path="products">
                  <Route index element={<ProductList />} />
                  <Route path="new" element={<ProductForm />} />
                  <Route path=":id/edit" element={<ProductForm />} />
                </Route>
                <Route path="stock">
                  <Route index element={<InventoryList />} />
                  <Route path="new" element={<InventoryForm />} />
                  <Route path=":id/edit" element={<InventoryForm />} />
                </Route>
              </Route>

              {/* Master Data Routes */}
              <Route path="master">
                <Route path="permissions">
                  <Route index element={<PermissionList />} />
                  <Route path="new" element={<PermissionForm />} />
                  <Route path=":id/edit" element={<PermissionForm />} />
                </Route>
                <Route path="roles">
                  <Route index element={<RoleList />} />
                  <Route path="new" element={<RoleForm />} />
                  <Route path=":id/edit" element={<RoleForm />} />
                </Route>
              </Route>
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
