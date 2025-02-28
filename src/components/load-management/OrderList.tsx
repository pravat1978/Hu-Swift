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
import { Plus, Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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

export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/load-management/orders/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Order
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No orders found matching your search"
                    : "No orders added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{formatDate(order.deliveryDate)}</TableCell>
                  <TableCell>{order.warehouseId}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${order.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/load-management/orders/${order.id}`)
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
