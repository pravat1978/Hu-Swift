import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

export default function BranchForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Branch</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/organization/branches")}
        >
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Branch Name</Label>
                <Input placeholder="Enter branch name" />
              </div>
              <div className="space-y-2">
                <Label>Branch Code</Label>
                <Input placeholder="Enter branch code" />
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
                <Label>Country</Label>
                <Input placeholder="Enter country" defaultValue="India" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Person Name</Label>
                <Input placeholder="Enter contact person name" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label>Operating Hours Start</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Operating Hours End</Label>
                <Input type="time" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="parking" />
                <Label htmlFor="parking">Parking Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="maintenance" />
                <Label htmlFor="maintenance">Maintenance Facility</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fuel" />
                <Label htmlFor="fuel">Fuel Station</Label>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate("/organization/branches")}
        >
          Cancel
        </Button>
        <Button onClick={() => console.log("Save branch")}>Save Branch</Button>
      </div>
    </div>
  );
}
