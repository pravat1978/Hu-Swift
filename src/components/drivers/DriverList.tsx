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

interface Driver {
  id: string;
  personalDetails: {
    name: string;
    dateOfBirth: string;
    gender: string;
  };
  contactDetails: {
    mobileNumber: string;
    email: string;
  };
  licenseDetails: {
    licenseNumber: string;
    licenseExpiryDate: string;
    type: string;
    issuingAuthority: string;
  };
  vehicleAssigned: {
    vehicleId: string;
    vehicleType: string;
  };
}

export default function DriverList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(
        "https://apis.huswift.hutechweb.com/drivers/page/1",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }
      const data = await response.json();

      // Transform the API response to match our interface
      const transformedDrivers: Driver[] = data.drivers || [];

      setDrivers(transformedDrivers);
      setError(null);
    } catch (err) {
      setError("Failed to fetch drivers. Please try again later.");
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDrivers = drivers.filter((driver) =>
    Object.values(driver).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

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
              <TableHead>Assigned Vehicles</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No drivers found
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
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {driver.vehicleAssigned.vehicleId
                      ? `${driver.vehicleAssigned.vehicleId} (${driver.vehicleAssigned.vehicleType})`
                      : "None"}
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
                        onClick={() => console.log("Toggle status")}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
