import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function WarehouseForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Warehouse</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/locations/warehouses")}
        >
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Warehouse Name</Label>
                <Input placeholder="Enter warehouse name" />
              </div>
              <div className="space-y-2">
                <Label>Warehouse Code</Label>
                <Input placeholder="Enter warehouse code" />
              </div>
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input placeholder="Enter street address" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input placeholder="Enter state" />
              </div>
              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input placeholder="Enter pincode" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input placeholder="Enter website (optional)" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type of Warehouse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Warehouse</SelectItem>
                    <SelectItem value="private">Private Warehouse</SelectItem>
                    <SelectItem value="bonded">Bonded Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Storage Capacity (sq. meters)</Label>
                <Input type="number" placeholder="Enter storage capacity" />
              </div>
              <div className="space-y-2">
                <Label>Storage Types Available</Label>
                <Textarea placeholder="Enter types of goods that can be stored" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Security Measures</Label>
                <Textarea placeholder="Describe security measures" />
              </div>
              <div className="space-y-2">
                <Label>Access Control System</Label>
                <Input placeholder="Describe access control" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Operating Hours</Label>
                <Input placeholder="Enter operating hours" />
              </div>
              <div className="space-y-2">
                <Label>Warehouse Manager Name</Label>
                <Input placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label>Manager Contact</Label>
                <Input placeholder="Enter manager contact" />
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate("/locations/warehouses")}
        >
          Cancel
        </Button>
        <Button onClick={() => console.log("Save warehouse")}>
          Save Warehouse
        </Button>
      </div>
    </div>
  );
}
