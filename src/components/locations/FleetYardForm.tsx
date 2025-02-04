import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function FleetYardForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Fleet Yard</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/locations/fleet-yards")}
        >
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="capacity">Capacity & Layout</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="fuel">Fuel & Energy</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fleet Yard Name</Label>
                <Input placeholder="Enter yard name" />
              </div>
              <div className="space-y-2">
                <Label>Fleet Yard Code</Label>
                <Input placeholder="Enter yard code" />
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
                <Label>GPS Coordinates</Label>
                <Input placeholder="Enter GPS coordinates" />
              </div>
              <div className="space-y-2">
                <Label>Yard Manager Name</Label>
                <Input placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Area (sq. meters)</Label>
                <Input type="number" placeholder="Enter total area" />
              </div>
              <div className="space-y-2">
                <Label>Number of Parking Slots</Label>
                <Input type="number" placeholder="Enter number of slots" />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Types Accommodated</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trucks" />
                    <Label htmlFor="trucks">
                      Trucks (Light, Medium, Heavy)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vans" />
                    <Label htmlFor="vans">Vans</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="two-wheelers" />
                    <Label htmlFor="two-wheelers">Two-Wheelers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="containers" />
                    <Label htmlFor="containers">
                      Container Trucks & Trailers
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Entry/Exit Points</Label>
                <Input type="number" placeholder="Number of gates" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Workshop Available</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Maintenance Services</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="routine" />
                    <Label htmlFor="routine">Routine Inspection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="engine" />
                    <Label htmlFor="engine">Engine Maintenance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tire" />
                    <Label htmlFor="tire">Tire Maintenance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emergency" />
                    <Label htmlFor="emergency">Emergency Repairs</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fuel Station Available</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuel Storage Capacity (Liters)</Label>
                <Input type="number" placeholder="Enter capacity" />
              </div>
              <div className="space-y-2">
                <Label>EV Charging Points</Label>
                <Input type="number" placeholder="Number of charging points" />
              </div>
              <div className="space-y-2">
                <Label>Battery Swap Station</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Driver Facilities</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rest-area" />
                    <Label htmlFor="rest-area">Rest Areas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="food" />
                    <Label htmlFor="food">Food & Beverage Services</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="washrooms" />
                    <Label htmlFor="washrooms">Washrooms & Showers</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate("/locations/fleet-yards")}
        >
          Cancel
        </Button>
        <Button onClick={() => console.log("Save fleet yard")}>
          Save Fleet Yard
        </Button>
      </div>
    </div>
  );
}
