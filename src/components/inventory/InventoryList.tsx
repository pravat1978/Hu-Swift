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

interface Inventory {
  id: string;
  productId: string;
  productName: string;
  warehouseId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  stockInDate: string;
  batchNumber?: string;
  expiryDate?: string;
  valuation: number;
  status: "in_stock" | "out_of_stock" | "low_stock";
}

const demoInventory: Inventory[] = [
  {
    id: "INV001",
    productId: "PRD001",
    productName: "Laptop Pro X1",
    warehouseId: "WH001",
    currentStock: 50,
    reservedStock: 5,
    availableStock: 45,
    stockInDate: "2024-03-15",
    batchNumber: "BATCH001",
    valuation: 40000,
    status: "in_stock",
  },
];

export default function InventoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredInventory = demoInventory.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-500 hover:bg-green-600";
      case "out_of_stock":
        return "bg-red-500 hover:bg-red-600";
      case "low_stock":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/inventory/stock/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Stock
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inventory ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reserved</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Valuation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.warehouseId}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.reservedStock}</TableCell>
                <TableCell>{item.availableStock}</TableCell>
                <TableCell>${item.valuation}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      getStatusBadgeColor(item.status),
                      "text-white",
                    )}
                  >
                    {item.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/inventory/stock/${item.id}/edit`)
                      }
                    >
                      <Edit className="h-4 w-4" />
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
