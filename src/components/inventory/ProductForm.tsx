import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const demoCategories = [
  { id: "CAT001", name: "Electronics" },
  { id: "CAT002", name: "Clothing" },
];

const unitOptions = [
  "Piece",
  "Box",
  "Kg",
  "Liter",
  "Meter",
  "Pack",
  "Set",
  "Unit",
];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    category: "",
    subcategory: "",
    brand: "",
    unitOfMeasure: "",
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    weight: 0,
    costPrice: 0,
    sellingPrice: 0,
    reorderLevel: 0,
    expiryDate: "",
    status: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/inventory/products");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
          </TabsList>

          <Card className="mt-4 p-6">
            <TabsContent value="basic" className="space-y-4">
              {id && (
                <div className="space-y-2">
                  <Label>Product ID</Label>
                  <Input value={id} disabled />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="Enter SKU"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Barcode</Label>
                  <Input
                    value={formData.barcode}
                    onChange={(e) =>
                      setFormData({ ...formData, barcode: e.target.value })
                    }
                    placeholder="Enter barcode (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Input
                    value={formData.subcategory}
                    onChange={(e) =>
                      setFormData({ ...formData, subcategory: e.target.value })
                    }
                    placeholder="Enter subcategory (optional)"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Unit of Measure</Label>
                  <Select
                    value={formData.unitOfMeasure}
                    onValueChange={(value) =>
                      setFormData({ ...formData, unitOfMeasure: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weight: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Enter weight"
                    step="0.01"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Dimensions</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label>Length (cm)</Label>
                      <Input
                        type="number"
                        value={formData.dimensions.length}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              length: parseFloat(e.target.value),
                            },
                          })
                        }
                        placeholder="Length"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Width (cm)</Label>
                      <Input
                        type="number"
                        value={formData.dimensions.width}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              width: parseFloat(e.target.value),
                            },
                          })
                        }
                        placeholder="Width"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Height (cm)</Label>
                      <Input
                        type="number"
                        value={formData.dimensions.height}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions,
                              height: parseFloat(e.target.value),
                            },
                          })
                        }
                        placeholder="Height"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cost Price</Label>
                  <Input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costPrice: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Enter cost price"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Selling Price</Label>
                  <Input
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sellingPrice: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Enter selling price"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Reorder Level</Label>
                  <Input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reorderLevel: parseInt(e.target.value),
                      })
                    }
                    placeholder="Enter reorder level"
                    required
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

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Card>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/inventory/products")}
          >
            Cancel
          </Button>
          <Button type="submit">{id ? "Update" : "Create"} Product</Button>
        </div>
      </form>
    </div>
  );
}
