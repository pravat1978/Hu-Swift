import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                <Label>Fleet Yard Name</Label>
                <Input placeholder="Enter fleet yard name" />
              </div>
              <div className="space-y-2">
                <Label>Fleet Yard Code</Label>
                <Input placeholder="Enter fleet yard code" />
              </div>
              <div className="col-span-2 space-y-4">
                <h3 className="font-medium">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address Line 1</Label>
                    <Input placeholder="Enter address line 1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 2</Label>
                    <Input placeholder="Enter address line 2" />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="Enter city" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AN">
                          Andaman and Nicobar Islands
                        </SelectItem>
                        <SelectItem value="AP">Andhra Pradesh</SelectItem>
                        <SelectItem value="AR">Arunachal Pradesh</SelectItem>
                        <SelectItem value="AS">Assam</SelectItem>
                        <SelectItem value="BR">Bihar</SelectItem>
                        <SelectItem value="CH">Chandigarh</SelectItem>
                        <SelectItem value="CT">Chhattisgarh</SelectItem>
                        <SelectItem value="DN">
                          Dadra and Nagar Haveli
                        </SelectItem>
                        <SelectItem value="DD">Daman and Diu</SelectItem>
                        <SelectItem value="DL">Delhi</SelectItem>
                        <SelectItem value="GA">Goa</SelectItem>
                        <SelectItem value="GJ">Gujarat</SelectItem>
                        <SelectItem value="HR">Haryana</SelectItem>
                        <SelectItem value="HP">Himachal Pradesh</SelectItem>
                        <SelectItem value="JK">Jammu and Kashmir</SelectItem>
                        <SelectItem value="JH">Jharkhand</SelectItem>
                        <SelectItem value="KA">Karnataka</SelectItem>
                        <SelectItem value="KL">Kerala</SelectItem>
                        <SelectItem value="LA">Ladakh</SelectItem>
                        <SelectItem value="LD">Lakshadweep</SelectItem>
                        <SelectItem value="MP">Madhya Pradesh</SelectItem>
                        <SelectItem value="MH">Maharashtra</SelectItem>
                        <SelectItem value="MN">Manipur</SelectItem>
                        <SelectItem value="ML">Meghalaya</SelectItem>
                        <SelectItem value="MZ">Mizoram</SelectItem>
                        <SelectItem value="NL">Nagaland</SelectItem>
                        <SelectItem value="OR">Odisha</SelectItem>
                        <SelectItem value="PY">Puducherry</SelectItem>
                        <SelectItem value="PB">Punjab</SelectItem>
                        <SelectItem value="RJ">Rajasthan</SelectItem>
                        <SelectItem value="SK">Sikkim</SelectItem>
                        <SelectItem value="TN">Tamil Nadu</SelectItem>
                        <SelectItem value="TG">Telangana</SelectItem>
                        <SelectItem value="TR">Tripura</SelectItem>
                        <SelectItem value="UP">Uttar Pradesh</SelectItem>
                        <SelectItem value="UT">Uttarakhand</SelectItem>
                        <SelectItem value="WB">West Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input placeholder="Enter pincode" />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value="India" disabled />
                  </div>
                </div>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="security" />
                <Label htmlFor="security">24/7 Security</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cctv" />
                <Label htmlFor="cctv">CCTV Surveillance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rest" />
                <Label htmlFor="rest">Rest Area</Label>
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
