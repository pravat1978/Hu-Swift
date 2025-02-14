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
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  vehicleNumber: string;
  type: string;
  make: string;
  model: string;
  status: "active" | "inactive";
  lastService: string;
  driver: string;
}

const demoVehicles: Vehicle[] = [
  {
    id: "1",
    vehicleNumber: "KA01AB1234",
    type: "Truck",
    make: "Tata",
    model: "Prima",
    status: "active",
    lastService: "2024-01-15",
    driver: "John Doe",
  },
  {
    id: "2",
    vehicleNumber: "MH02CD5678",
    type: "Van",
    make: "Mahindra",
    model: "Supro",
    status: "inactive",
    lastService: "2024-02-01",
    driver: "Jane Smith",
  },
];

export default function VehicleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredVehicles = demoVehicles.filter((vehicle) =>
    Object.values(vehicle).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

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
              <TableHead>Make & Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{`${vehicle.make} ${vehicle.model}`}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      vehicle.status === "active"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-gray-600 text-white",
                    )}
                  >
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell>{vehicle.lastService}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
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
