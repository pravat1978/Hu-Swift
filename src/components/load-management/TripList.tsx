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
import { Search, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Trip {
  id: string;
  warehouseId: string;
  vehicleId: string;
  vehicleType: string;
  driverId: string;
  driverName: string;
  tripDate: string;
  status: "scheduled" | "in_transit" | "completed" | "cancelled";
  gatePassNumber: string;
  orderCount: number;
  totalWeight: number;
}

// Sample data
const demoTrips: Trip[] = [
  {
    id: "TRIP001",
    warehouseId: "500001",
    vehicleId: "V002",
    vehicleType: "Medium Truck",
    driverId: "D001",
    driverName: "John Doe",
    tripDate: "2025-02-25",
    status: "scheduled",
    gatePassNumber: "GP-1234",
    orderCount: 2,
    totalWeight: 125.5,
  },
  {
    id: "TRIP002",
    warehouseId: "500002",
    vehicleId: "V003",
    vehicleType: "Large Truck",
    driverId: "D002",
    driverName: "Jane Smith",
    tripDate: "2025-02-26",
    status: "in_transit",
    gatePassNumber: "GP-5678",
    orderCount: 3,
    totalWeight: 350.75,
  },
];

export default function TripList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState<Trip[]>(demoTrips);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const filteredTrips = trips.filter((trip) =>
    Object.values(trip).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "in_transit":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trips..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/load-management/load-plan")}>
          Create New Trip
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gate Pass</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredTrips.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No trips found matching your search"
                    : "No trips scheduled yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>{trip.id}</TableCell>
                  <TableCell>{trip.warehouseId}</TableCell>
                  <TableCell>{trip.vehicleType}</TableCell>
                  <TableCell>{trip.driverName}</TableCell>
                  <TableCell>{formatDate(trip.tripDate)}</TableCell>
                  <TableCell>{trip.orderCount}</TableCell>
                  <TableCell>{trip.totalWeight.toFixed(2)} kg</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusBadgeColor(trip.status)} text-white`}
                    >
                      {trip.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() =>
                        window.alert(`Gate Pass: ${trip.gatePassNumber}`)
                      }
                    >
                      <FileText className="h-3 w-3" />
                      {trip.gatePassNumber}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/load-management/trips/${trip.id}`)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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
