import { useState } from "react";
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

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: "active" | "inactive";
  assignedVehicles: string[];
}

const demoDrivers: Driver[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 98765 43210",
    licenseNumber: "DL123456",
    licenseExpiry: "2025-12-31",
    status: "active",
    assignedVehicles: ["KA01AB1234"],
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "+91 98765 43211",
    licenseNumber: "DL789012",
    licenseExpiry: "2024-10-15",
    status: "inactive",
    assignedVehicles: [],
  },
];

export default function DriverList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredDrivers = demoDrivers.filter((driver) =>
    Object.values(driver).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Drivers</h1>
        <Button onClick={() => navigate("/drivers/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
            {filteredDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>{driver.licenseExpiry}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      driver.status === "active" ? "default" : "secondary"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {driver.assignedVehicles.length > 0
                    ? driver.assignedVehicles.join(", ")
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
