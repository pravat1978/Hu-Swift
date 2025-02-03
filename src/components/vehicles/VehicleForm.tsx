import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router-dom";

export default function VehicleForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Vehicle</h1>
        <Button variant="outline" onClick={() => navigate("/vehicles")}>
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="docs">Documents</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Number</Label>
                <Input placeholder="Enter vehicle number" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Make</Label>
                <Input placeholder="Vehicle make" />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="Vehicle model" />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input type="number" placeholder="Manufacturing year" />
              </div>
              <div className="space-y-2">
                <Label>Registration State</Label>
                <Input placeholder="State of registration" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Load (kg)</Label>
                <Input type="number" placeholder="Maximum load capacity" />
              </div>
              <div className="space-y-2">
                <Label>Cargo Volume (m³)</Label>
                <Input type="number" placeholder="Cargo volume" />
              </div>
              <div className="space-y-2">
                <Label>Length (m)</Label>
                <Input type="number" placeholder="Cargo length" />
              </div>
              <div className="space-y-2">
                <Label>Width (m)</Label>
                <Input type="number" placeholder="Cargo width" />
              </div>
              <div className="space-y-2">
                <Label>Height (m)</Label>
                <Input type="number" placeholder="Cargo height" />
              </div>
              <div className="space-y-2">
                <Label>Pallet Capacity</Label>
                <Input type="number" placeholder="Number of pallets" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>RC Number</Label>
                <Input placeholder="Registration certificate number" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Policy</Label>
                <Input placeholder="Insurance policy number" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Provider</Label>
                <Input placeholder="Insurance company name" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Expiry</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Permit Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National Permit</SelectItem>
                    <SelectItem value="state">State Permit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permit Validity</Label>
                <Input type="date" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GPS Device ID</Label>
                <Input placeholder="GPS device identifier" />
              </div>
              <div className="space-y-2">
                <Label>Installation Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Fuel Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tank Capacity (L)</Label>
                <Input type="number" placeholder="Fuel tank capacity" />
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/vehicles")}>
          Cancel
        </Button>
        <Button onClick={() => console.log("Save vehicle")}>
          Save Vehicle
        </Button>
      </div>
    </div>
  );
}
