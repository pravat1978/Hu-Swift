import { useState, useEffect } from "react";
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

interface Driver {
  id: string;
  personalDetails: {
    name: string;
    dateOfBirth: string | null;
    gender: string;
  };
  contactDetails: {
    mobileNumber: string;
    email: string;
  };
  licenseDetails: {
    licenseNumber: string;
    licenseExpiryDate: string | null;
    type: string;
    issuingAuthority: string;
  };
  vehicleAssigned: {
    vehicle: string;
    vehicleType: string;
  };
  status: string | null;
}

export default function DriverList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers(currentPage);
  }, [currentPage]);

  const fetchDrivers = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/drivers/?page=${page}&size=5`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );

      if (response.status === 404) {
        // If the status is 404, set empty drivers
        setDrivers([]);
        setTotalPages(1);
        setTotalRecords(0);
        setError(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }

      const data = await response.json();

      // Handle empty data gracefully
      setDrivers(data.drivers || []);
      setTotalPages(data.pagination?.["total-Pages"] || 1);
      setTotalRecords(data.pagination?.["total-Records"] || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to fetch drivers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (driverId: string) => {
    try {
      console.log("Toggling status for driver:", driverId); // Debugging

      const response = await axios.delete(`${BASE_URL}/drivers/${driverId}`);

      console.log("Driver Deactivated:", response?.data);

      if (response?.data?.code === "SUCCESS") {
        fetchDrivers(currentPage); // Refresh the list
      }
    } catch (error) {
      console.error("Error deactivating driver:", error);
    }
  };

  const filteredDrivers = drivers.filter((driver) =>
    Object.values(driver.personalDetails).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
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
            placeholder="Search drivers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/drivers/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>License Expiry</TableHead>
              <TableHead>Status</TableHead>
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
            ) : filteredDrivers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No drivers found matching your search"
                    : "No drivers added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.personalDetails.name || "N/A"}</TableCell>
                  <TableCell>
                    {driver.contactDetails.mobileNumber || "N/A"}
                  </TableCell>
                  <TableCell>
                    {driver.licenseDetails.licenseNumber || "N/A"}
                  </TableCell>
                  <TableCell>
                    {driver.licenseDetails.licenseExpiryDate || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        driver.status === "Active"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white",
                      )}
                    >
                      {driver.status || "InActive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/drivers/${driver.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          console.log("Button clicked for driver:", driver.id); // Debugging
                          handleToggleStatus(driver.id);
                        }}
                      >
                        <Power
                          className={cn(
                            "h-4 w-4",
                            updatingId === driver.id && "animate-spin",
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
