import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, FileText } from "lucide-react";

interface OrderLineItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paymentStatus: string;
  warehouseId: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  orderLineItems: OrderLineItem[];
  selected?: boolean;
}

interface Vehicle {
  id: string;
  type: string;
  capacity: number;
  status: "available" | "assigned";
}

interface Driver {
  id: string;
  name: string;
  status: "available" | "assigned";
  licenseType: string;
}

interface TripFormProps {
  warehouseId: string;
  orders: Order[];
  totalWeight: number;
  suggestedVehicle?: Vehicle;
}

// Sample data
const demoVehicles: Vehicle[] = [
  { id: "V001", type: "Small Truck", capacity: 1000, status: "available" },
  { id: "V002", type: "Medium Truck", capacity: 3000, status: "available" },
  { id: "V003", type: "Large Truck", capacity: 5000, status: "available" },
];

const demoDrivers: Driver[] = [
  {
    id: "D001",
    name: "John Doe",
    status: "available",
    licenseType: "Heavy Motor Vehicle",
  },
  {
    id: "D002",
    name: "Jane Smith",
    status: "available",
    licenseType: "Heavy Motor Vehicle",
  },
  {
    id: "D003",
    name: "Mike Johnson",
    status: "assigned",
    licenseType: "Light Motor Vehicle",
  },
];

// Helper function to calculate volumetric weight (simplified)
const calculateWeight = (order: Order): number => {
  // Simplified weight calculation
  return order.orderLineItems.reduce((total, item) => {
    // Assign weights based on product name (simplified)
    let weight = 0;
    if (item.productName.includes("TV")) weight = 25 * item.quantity;
    else if (item.productName.includes("Remote")) weight = 0.5 * item.quantity;
    else if (item.productName.includes("Refrigerator"))
      weight = 80 * item.quantity;
    else if (item.productName.includes("Washing")) weight = 60 * item.quantity;
    else if (item.productName.includes("Microwave"))
      weight = 15 * item.quantity;
    else weight = 10 * item.quantity; // Default weight

    return total + weight;
  }, 0);
};

export default function TripForm({
  warehouseId,
  orders,
  totalWeight,
  suggestedVehicle,
}: TripFormProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrders, setSelectedOrders] = useState<Order[]>(
    orders.map((order) => ({ ...order, selected: true })),
  );
  const [selectedVehicle, setSelectedVehicle] = useState<string>(
    suggestedVehicle?.id || "",
  );
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [tripDate, setTripDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [gatePassGenerated, setGatePassGenerated] = useState<boolean>(false);
  const [gatePassNumber, setGatePassNumber] = useState<string>("");

  // Calculate current weight based on selected orders
  const currentWeight = selectedOrders
    .filter((order) => order.selected)
    .reduce((sum, order) => sum + calculateWeight(order), 0);

  // Get available vehicles that can handle the current weight
  const availableVehicles = demoVehicles.filter(
    (vehicle) =>
      vehicle.status === "available" && vehicle.capacity >= currentWeight,
  );

  // Get available drivers
  const availableDrivers = demoDrivers.filter(
    (driver) => driver.status === "available",
  );

  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, selected: !order.selected } : order,
      ),
    );
  };

  const handleVehicleChange = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };

  const handleDriverChange = (driverId: string) => {
    setSelectedDriver(driverId);
  };

  const handleCreateTrip = () => {
    // Here you would normally make an API call to create the trip
    // For demo purposes, we'll just simulate success

    // Generate a gate pass number
    const newGatePassNumber = `GP-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;
    setGatePassNumber(newGatePassNumber);
    setGatePassGenerated(true);

    // Move to the gate pass tab
    setActiveTab("gatepass");
  };

  const handleFinish = () => {
    // Navigate back to load plan
    navigate("/load-management/load-plan");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Create Trip for Warehouse: {warehouseId}
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Select Orders</TabsTrigger>
          <TabsTrigger value="assignment">Vehicle & Driver</TabsTrigger>
          <TabsTrigger value="gatepass" disabled={!gatePassGenerated}>
            Gate Pass
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">
                  Orders from Warehouse {warehouseId}
                </h3>
                <p className="text-gray-500">
                  Selected Weight: {currentWeight.toFixed(2)} kg
                </p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={order.selected}
                        onChange={() => handleOrderSelection(order.id)}
                        className="h-4 w-4"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        {order.orderLineItems.length} items
                      </div>
                    </TableCell>
                    <TableCell>
                      {calculateWeight(order).toFixed(2)} kg
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${order.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate("/load-management/load-plan")}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setActiveTab("assignment")}
                disabled={currentWeight === 0}
              >
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="assignment" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Vehicle Assignment</h3>
                <div className="space-y-2">
                  <Label>Select Vehicle</Label>
                  <Select
                    value={selectedVehicle}
                    onValueChange={handleVehicleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.type} - Capacity: {vehicle.capacity} kg
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedVehicle && (
                    <div className="p-4 bg-blue-50 rounded-md mt-2">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="font-medium">
                            {
                              demoVehicles.find((v) => v.id === selectedVehicle)
                                ?.type
                            }
                          </p>
                          <p className="text-sm text-gray-500">
                            Capacity:{" "}
                            {
                              demoVehicles.find((v) => v.id === selectedVehicle)
                                ?.capacity
                            }{" "}
                            kg
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Driver Assignment</h3>
                <div className="space-y-2">
                  <Label>Select Driver</Label>
                  <Select
                    value={selectedDriver}
                    onValueChange={handleDriverChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDrivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name} - {driver.licenseType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Trip Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trip Date</Label>
                  <Input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setActiveTab("orders")}>
                Back
              </Button>
              <Button
                onClick={handleCreateTrip}
                disabled={!selectedVehicle || !selectedDriver || !tripDate}
              >
                Create Trip
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="gatepass" className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold">Gate Pass</h3>
                    <p className="text-gray-500">#{gatePassNumber}</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white px-3 py-1">
                  APPROVED
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">Warehouse</h4>
                  <p className="font-medium">{warehouseId}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">Date</h4>
                  <p className="font-medium">
                    {new Date(tripDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">Vehicle</h4>
                  <p className="font-medium">
                    {demoVehicles.find((v) => v.id === selectedVehicle)?.type} (
                    {selectedVehicle})
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-2">Driver</h4>
                  <p className="font-medium">
                    {demoDrivers.find((d) => d.id === selectedDriver)?.name}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-500 mb-2">Orders</h4>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Weight</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrders
                        .filter((order) => order.selected)
                        .map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>
                              {order.orderLineItems.length} items
                            </TableCell>
                            <TableCell>
                              {calculateWeight(order).toFixed(2)} kg
                            </TableCell>
                          </TableRow>
                        ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          Total Weight:
                        </TableCell>
                        <TableCell className="font-bold">
                          {currentWeight.toFixed(2)} kg
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Authorized Signature
                </p>
                <div className="h-16 border-b border-gray-400 w-48"></div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => window.print()}>
                Print Gate Pass
              </Button>
              <Button onClick={handleFinish}>Finish</Button>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
