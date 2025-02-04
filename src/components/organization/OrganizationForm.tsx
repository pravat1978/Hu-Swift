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
import { Badge } from "@/components/ui/badge";
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
import { Badge } from "@/components/ui/badge"; // Ensure this import exists

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

<<<<<<< HEAD
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
=======
  const handleToggleBranchStatus = (branchId) => {
    setBranches(
      branches.map((branch) =>
        branch.id === branchId
          ? { ...branch, status: branch.status === "active" ? "inactive" : "active" }
          : branch
      )
    );
  };

  const handleSaveBranch = () => {
    setShowBranchForm(false);
    setEditingBranch(null);
>>>>>>> 3d6a08370fd3cc663ef678156e862dee3d54a301
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Organization</h1>
        <Button variant="outline" onClick={() => navigate("/organization")}>
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="legal">Legal Details</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
<<<<<<< HEAD
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input placeholder="Enter organization name" />
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input placeholder="Enter registration number" />
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
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Enter address" />
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
                <Label>Business License Number</Label>
                <Input placeholder="Enter license number" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plan Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Payment Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
=======
          <TabsContent value="branches" className="space-y-4">
>>>>>>> 3d6a08370fd3cc663ef678156e862dee3d54a301
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
<<<<<<< HEAD
                        <Badge
                          variant={
                            location.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {location.status}
=======
                        <Badge variant={branch.status === "active" ? "default" : "secondary"}>
                          {branch.status}
>>>>>>> 3d6a08370fd3cc663ef678156e862dee3d54a301
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
<<<<<<< HEAD
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
=======
                          <Button variant="ghost" size="icon" onClick={() => handleEditBranch(branch)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleToggleBranchStatus(branch.id)}>
>>>>>>> 3d6a08370fd3cc663ef678156e862dee3d54a301
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
<<<<<<< HEAD

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
=======
>>>>>>> 3d6a08370fd3cc663ef678156e862dee3d54a301
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
