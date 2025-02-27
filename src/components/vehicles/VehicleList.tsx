import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
interface Vehicle {
  id: string;
  assignedDriver: {
    driverId: string;
    name: string;
  };
  basicInfo: {
    vehicleNumber: string;
    type: string;
    make: string;
    model: string;
    yearOfManufacturing: string;
  };
  capacity: {
    maxLoad: string;
    seatingCapacity: string;
  };
  documentUpload: {
    rc: string;
    insurance: string;
    permit: string;
    pollutionCertificate: string;
  };
  fuelDetails: {
    fuelType: string;
    mileage: string;
    tankCapacity: string;
  };
  gpsTracking: {
    deviceId: string;
    installed: false;
  };
  insuranceDetails: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  maintenanceSchedule: {
    serviceDate: string;
    nextDueDate: string;
    serviceCenter: string;
  };
  ownerShipType: {
    ownerShipType: string;
  };
  permitDetails: {
    permit: string;
    validity: string;
    routRestriction: string;
  };
  registrationDetails: {
    rcNumber: string;
    state: string;
    expiryDate: string;
  };
  status: "Active" | "Inactive";
}

export default function VehicleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]); // Removed duplicate useEffect

  const fetchVehicles = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/vehicles/?page=${page}&limit=6`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        },
      );

      if (response.status === 404) {
        setVehicles([]);
        setTotalPages(1);
        setTotalRecords(0);
        setError(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }

      const data = await response.json();

      // if (Array.isArray(data.vehicles)) { // Correcting the path
      //   const transformedData = data.vehicles.map((item) => {
      //     const details = item.basicInfo;
      //     return {
      //       id: item.id,
      //       vehicleNumber: details.vehicleNumber || "N/A",
      //       type: details.type || "N/A",
      //       make: details.make || "N/A",
      //       model: details.model || "N/A",
      //       status: item.status ? item.status : "INACTIVE",
      //       lastService: item.lastService || "N/A",
      //       driver: item.assignedDriver?.name || "Unassigned",
      //     };
      //   });

      setVehicles(data.vehicles || []);
      setTotalPages(data.pagination?.["total-Pages"] || 1);
      setTotalRecords(data.pagination?.["total-Records"] || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (vehicleId: string) => {
    try {
      console.log("Toggling status for vehicle:", vehicleId); // Debugging

      const response = await axios.delete(`${BASE_URL}/vehicles/${vehicleId}`);

      console.log("Vehicle Deactivated:", response?.data);

      if (response?.data?.code === "SUCCESS") {
        fetchVehicles(currentPage); // Refresh the list
      }
    } catch (error) {
      console.error("Error deactivating vehicle:", error);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    Object.values(vehicle).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/vehicles/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Vehicle
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No vehicles found matching your search"
                    : "No vehicles added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    {vehicle.basicInfo.vehicleNumber || "N/A"}
                  </TableCell>
                  <TableCell>{vehicle.basicInfo.type || "N/A"}</TableCell>
                  <TableCell>{vehicle.basicInfo.make || "N/A"} </TableCell>
                  <TableCell>{vehicle.basicInfo.model || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        vehicle.status === "Active"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white",
                      )}
                    >
                      {vehicle.status || "InActive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vehicle.maintenanceSchedule.serviceDate || "N/A"}
                  </TableCell>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          console.log("Button clicked for driver:", vehicle.id);
                          handleToggleStatus(vehicle.id);
                        }}
                      >
                        <Power
                          className={cn(
                            "h-4 w-4",
                            updatingId === vehicle.id && "animate-spin",
                          )}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>
        <span className="flex items-center px-4 text-sm text-gray-600">
          Page {currentPage} of {totalPages} ({totalRecords} total records)
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
