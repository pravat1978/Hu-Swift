import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const demoProducts = [
  { id: "PRD001", name: "Laptop Pro X1" },
  { id: "PRD002", name: "Smartphone Y2" },
];

const demoWarehouses = [
  { id: "WH001", name: "Main Warehouse" },
  { id: "WH002", name: "Secondary Warehouse" },
];

export default function InventoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: "",
    warehouseId: "",
    currentStock: 0,
    reservedStock: 0,
    batchNumber: "",
    expiryDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/inventory/stock");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 space-y-4">
          {id && (
            <div className="space-y-2">
              <Label>Inventory ID</Label>
              <Input value={id} disabled />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Select
                value={formData.productId}
                onValueChange={(value) =>
                  setFormData({ ...formData, productId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {demoProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Warehouse</Label>
              <Select
                value={formData.warehouseId}
                onValueChange={(value) =>
                  setFormData({ ...formData, warehouseId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {demoWarehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Current Stock</Label>
              <Input
                type="number"
                value={formData.currentStock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentStock: parseInt(e.target.value),
                  })
                }
                placeholder="Enter current stock"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Reserved Stock</Label>
              <Input
                type="number"
                value={formData.reservedStock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reservedStock: parseInt(e.target.value),
                  })
                }
                placeholder="Enter reserved stock"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Batch Number</Label>
              <Input
                value={formData.batchNumber}
                onChange={(e) =>
                  setFormData({ ...formData, batchNumber: e.target.value })
                }
                placeholder="Enter batch number (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Enter any additional notes"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/inventory/stock")}
          >
            Cancel
          </Button>
          <Button type="submit">{id ? "Update" : "Add"} Stock</Button>
        </div>
      </form>
    </div>
  );
}
