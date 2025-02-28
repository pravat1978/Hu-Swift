import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Search, Truck, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}

interface Vehicle {
  id: string;
  type: string;
  capacity: number;
  status: "available" | "assigned";
}

interface WarehouseGroup {
  warehouseId: string;
  orders: Order[];
  assignedVehicle?: Vehicle;
  totalWeight: number;
}

// Sample data
const demoOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "00005",
    orderDate: "2025-02-20T10:30:00",
    deliveryDate: "2025-02-20T10:30:00",
    totalAmount: 5000,
    paymentStatus: "PAID",
    warehouseId: "500001",
    geoLocation: {
      latitude: 17.385,
      longitude: 78.4867,
    },
    orderLineItems: [
      {
        productId: "P005",
        productName: "TV",
        quantity: 1,
        unitPrice: 45000.5,
        totalPrice: 45000.5,
      },
      {
        productId: "P006",
        productName: "Remote",
        quantity: 2,
        unitPrice: 500.0,
        totalPrice: 1000.0,
      },
    ],
  },
  {
    id: "ORD002",
    customerName: "00007",
    orderDate: "2025-02-21T11:30:00",
    deliveryDate: "2025-02-22T14:30:00",
    totalAmount: 7500,
    paymentStatus: "PENDING",
    warehouseId: "500001",
    geoLocation: {
      latitude: 17.385,
      longitude: 78.4867,
    },
    orderLineItems: [
      {
        productId: "P007",
        productName: "Refrigerator",
        quantity: 1,
        unitPrice: 35000.0,
        totalPrice: 35000.0,
      },
    ],
  },
  {
    id: "ORD003",
    customerName: "00010",
    orderDate: "2025-02-22T09:15:00",
    deliveryDate: "2025-02-23T13:00:00",
    totalAmount: 12000,
    paymentStatus: "PAID",
    warehouseId: "500002",
    geoLocation: {
      latitude: 17.4,
      longitude: 78.5,
    },
    orderLineItems: [
      {
        productId: "P008",
        productName: "Washing Machine",
        quantity: 1,
        unitPrice: 28000.0,
        totalPrice: 28000.0,
      },
      {
        productId: "P009",
        productName: "Microwave",
        quantity: 1,
        unitPrice: 15000.0,
        totalPrice: 15000.0,
      },
    ],
  },
];

const demoVehicles: Vehicle[] = [
  { id: "V001", type: "Small Truck", capacity: 1000, status: "available" },
  { id: "V002", type: "Medium Truck", capacity: 3000, status: "available" },
  { id: "V003", type: "Large Truck", capacity: 5000, status: "available" },
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

// Helper function to assign vehicles based on weight
const assignVehicle = (
  weight: number,
  vehicles: Vehicle[],
): Vehicle | undefined => {
  // Find the smallest vehicle that can handle the weight
  const availableVehicles = vehicles.filter((v) => v.status === "available");
  const suitableVehicle = availableVehicles
    .filter((v) => v.capacity >= weight)
    .sort((a, b) => a.capacity - b.capacity)[0];

  return suitableVehicle;
};

export default function LoadPlan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouseGroups, setWarehouseGroups] = useState<WarehouseGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Group orders by warehouse
    const groupedOrders: Record<string, Order[]> = {};
    demoOrders.forEach((order) => {
      if (!groupedOrders[order.warehouseId]) {
        groupedOrders[order.warehouseId] = [];
      }
      groupedOrders[order.warehouseId].push(order);
    });

    // Create warehouse groups with weight calculations
    const groups: WarehouseGroup[] = Object.entries(groupedOrders).map(
      ([warehouseId, orders]) => {
        const totalWeight = orders.reduce(
          (sum, order) => sum + calculateWeight(order),
          0,
        );
        const assignedVehicle = assignVehicle(totalWeight, demoVehicles);

        return {
          warehouseId,
          orders,
          totalWeight,
          assignedVehicle,
        };
      },
    );

    setWarehouseGroups(groups);
    setLoading(false);
  }, []);

  const filteredGroups = warehouseGroups.filter(
    (group) =>
      group.warehouseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.orders.some((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by warehouse or order ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/load-management/orders")}>
          View All Orders
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading load plans...</div>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">
            {searchTerm
              ? "No matching load plans found"
              : "No load plans available"}
          </div>
        </div>
      ) : (
        filteredGroups.map((group) => (
          <Card key={group.warehouseId} className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  Warehouse: {group.warehouseId}
                </h3>
                <p className="text-gray-500">
                  {group.orders.length} orders · Total Weight:{" "}
                  {group.totalWeight.toFixed(2)} kg
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">
                    {group.assignedVehicle
                      ? group.assignedVehicle.type
                      : "No vehicle assigned"}
                  </p>
                  {group.assignedVehicle && (
                    <p className="text-sm text-gray-500">
                      ID: {group.assignedVehicle.id} · Capacity:{" "}
                      {group.assignedVehicle.capacity} kg
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.orders.map((order) => (
                  <TableRow key={order.id}>
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
          </Card>
        ))
      )}
    </div>
  );
}
