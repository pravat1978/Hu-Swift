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

interface WarehouseFormProps {
  id?: string;
}

export default function WarehouseForm({
  id = "HS_WH_001",
}: WarehouseFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="storage">Storage & Capacity</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Warehouse ID</Label>
                <Input value={id} disabled />
              </div>
              <div className="space-y-2">
                <Label>Warehouse Name</Label>
                <Input placeholder="Enter warehouse name" />
              </div>
              <div className="space-y-2">
                <Label>Warehouse Code</Label>
                <Input placeholder="Enter warehouse code" />
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
                  <div className="col-span-2 space-y-2">
                    <Label>Geolocation</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Latitude" />
                      <Input placeholder="Longitude" />
                    </div>
                  </div>
                </div>
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

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Contact Name</Label>
                <Input placeholder="Enter primary contact name" />
              </div>
              <div className="space-y-2">
                <Label>Primary Contact Phone</Label>
                <Input placeholder="Enter primary contact phone" />
              </div>
              <div className="space-y-2">
                <Label>Primary Contact Email</Label>
                <Input type="email" placeholder="Enter primary contact email" />
              </div>
              <div className="space-y-2">
                <Label>Secondary Contact Name</Label>
                <Input placeholder="Enter secondary contact name" />
              </div>
              <div className="space-y-2">
                <Label>Secondary Contact Phone</Label>
                <Input placeholder="Enter secondary contact phone" />
              </div>
              <div className="space-y-2">
                <Label>Secondary Contact Email</Label>
                <Input
                  type="email"
                  placeholder="Enter secondary contact email"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Warehouse Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owned">Owned</SelectItem>
                      <SelectItem value="leased">Leased</SelectItem>
                      <SelectItem value="3pl">
                        Third-Party Logistics (3PL)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Total Area (sq. meters)</Label>
                  <Input type="number" placeholder="Enter total area" />
                </div>
                <div className="space-y-2">
                  <Label>Number of Storage Sections</Label>
                  <Input type="number" placeholder="Enter number of sections" />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Capacity (Pallets)</Label>
                  <Input
                    type="number"
                    placeholder="Enter maximum pallet capacity"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Storage Types Supported</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pallet-racking" />
                    <Label htmlFor="pallet-racking">Pallet Racking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bin-storage" />
                    <Label htmlFor="bin-storage">Bin Storage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bulk-storage" />
                    <Label htmlFor="bulk-storage">Bulk Storage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cold-storage" />
                    <Label htmlFor="cold-storage">Cold Storage</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Utilization (%)</Label>
                  <Input
                    type="number"
                    placeholder="Enter current utilization"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Allowed Load Per Rack (Kg)</Label>
                  <Input
                    type="number"
                    placeholder="Enter maximum load per rack"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="temperature-control" />
                  <Label htmlFor="temperature-control">
                    Temperature Control Available
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Temperature (°C)</Label>
                    <Input
                      type="number"
                      placeholder="Enter minimum temperature"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Temperature (°C)</Label>
                    <Input
                      type="number"
                      placeholder="Enter maximum temperature"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <h3 className="font-medium mb-4">Operating Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Weekday Hours</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="Start time" />
                      <Input type="time" placeholder="End time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weekend/Holiday Hours</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="Start time" />
                      <Input type="time" placeholder="End time" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
