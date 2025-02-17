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

const demoCategories = [
  { id: "CAT001", name: "Electronics" },
  { id: "CAT002", name: "Clothing" },
];

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/inventory/categories");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-4">
            {id && (
              <div className="space-y-2">
                <Label>Category ID</Label>
                <Input value={id} disabled />
              </div>
            )}

            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter category description"
              />
            </div>

            <div className="space-y-2">
              <Label>Parent Category</Label>
              <Select
                value={formData.parentCategory}
                onValueChange={(value) =>
                  setFormData({ ...formData, parentCategory: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {demoCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/inventory/categories")}
          >
            Cancel
          </Button>
          <Button type="submit">{id ? "Update" : "Create"} Category</Button>
        </div>
      </form>
    </div>
  );
}
