import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft, MapPin } from "lucide-react";
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

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundOrder = demoOrders.find((o) => o.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-lg">Order not found</div>
        <Button onClick={() => navigate("/load-management/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/load-management/orders")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h2 className="text-2xl font-bold">Order Details: {order.id}</h2>
        </div>
        <Badge
          className={`${order.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"} text-white px-3 py-1 text-sm`}
        >
          {order.paymentStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Order Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Warehouse ID</p>
              <p className="font-medium">{order.warehouseId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{formatDate(order.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Date</p>
              <p className="font-medium">{formatDate(order.deliveryDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">
                ₹{order.totalAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {order.geoLocation.latitude.toFixed(4)},{" "}
                {order.geoLocation.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Order Line Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderLineItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ₹{item.unitPrice.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ₹{item.totalPrice.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-medium">
                Total
              </TableCell>
              <TableCell className="text-right font-bold">
                ₹
                {order.orderLineItems
                  .reduce((sum, item) => sum + item.totalPrice, 0)
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
