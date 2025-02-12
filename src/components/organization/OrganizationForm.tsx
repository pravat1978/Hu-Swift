import { useState } from "react";
import { Plus, Edit, Power } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";

export default function OrganizationForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [locations, setLocations] = useState([
    {
      id: "1",
      name: "Mumbai Fleet Yard",
      code: "MUM001",
      type: "fleet_yard",
      contactPerson: "Rahul Shah",
      status: "active",
    },
  ]);

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setShowLocationForm(true);
  };

  const handleToggleLocationStatus = (locationId) => {
    setLocations(
      locations.map((location) =>
        location.id === locationId
          ? {
              ...location,
              status: location.status === "active" ? "inactive" : "active",
            }
          : location,
      ),
    );
  };

  const handleSaveLocation = () => {
    // Handle saving location
    setShowLocationForm(false);
    setEditingLocation(null);
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="legal">Legal Details</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input placeholder="Enter organization name" />
              </div>
              <div className="space-y-2">
                <Label>Company registration number</Label>
                <Input placeholder="Enter company registration number" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input placeholder="Enter industry" />
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
                <Label>Website</Label>
                <Input placeholder="Enter website URL" />
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

          <TabsContent value="legal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input placeholder="Enter GSTIN" />
              </div>
              <div className="space-y-2">
                <Label>PAN</Label>
                <Input placeholder="Enter PAN" />
              </div>
              <div className="space-y-2">
                <Label>Incorporation Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Corporate Identification Number</Label>
                <Input placeholder="Enter CIN" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Location List</h3>
              <Button onClick={() => setShowLocationForm(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Location
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell>{location.name}</TableCell>
                      <TableCell>{location.code}</TableCell>
                      <TableCell>
                        {location.type === "fleet_yard"
                          ? "Fleet Yard"
                          : "Warehouse"}
                      </TableCell>
                      <TableCell>{location.contactPerson}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            location.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {location.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditLocation(location)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleToggleLocationStatus(location.id)
                            }
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Dialog open={showLocationForm} onOpenChange={setShowLocationForm}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingLocation ? "Edit Location" : "Add New Location"}
                  </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="contact">Contact Details</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Location Name</Label>
                        <Input placeholder="Enter location name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location Code</Label>
                        <Input placeholder="Enter location code" />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fleet_yard">
                              Fleet Yard
                            </SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        <Input placeholder="Enter street address" />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input placeholder="Enter city" />
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
                        <Label htmlFor="maintenance">
                          Maintenance Facility
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fuel" />
                        <Label htmlFor="fuel">Fuel Station</Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowLocationForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveLocation}>
                    {editingLocation ? "Update" : "Add"} Location
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/organization")}>
          Cancel
        </Button>
        <Button onClick={() => console.log("Save organization")}>
          Save Organization
        </Button>
      </div>
    </div>
  );
}
