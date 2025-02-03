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

export default function DriverForm() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Driver</h1>
        <Button variant="outline" onClick={() => navigate("/drivers")}>
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="license">License Details</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Enter address" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input placeholder="Enter license number" />
              </div>
              <div className="space-y-2">
                <Label>License Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lmv">LMV</SelectItem>
                    <SelectItem value="hmv">HMV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Issuing Authority</Label>
                <Input placeholder="Enter issuing authority" />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employee ID</Label>
                <Input placeholder="Enter employee ID" />
              </div>
              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Salary</Label>
                <Input type="number" placeholder="Enter salary" />
              </div>
              <div className="space-y-2">
                <Label>Shift Timings</Label>
                <Input placeholder="Enter shift timings" />
              </div>
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input placeholder="Enter bank name" />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input placeholder="Enter account number" />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code</Label>
                <Input placeholder="Enter IFSC code" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Emergency Contact Name</Label>
                <Input placeholder="Enter emergency contact name" />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Relation</Label>
                <Input placeholder="Enter relation" />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Phone</Label>
                <Input placeholder="Enter emergency contact phone" />
              </div>
              <div className="space-y-2">
                <Label>Aadhar Number</Label>
                <Input placeholder="Enter Aadhar number" />
              </div>
              <div className="space-y-2">
                <Label>PAN Number</Label>
                <Input placeholder="Enter PAN number" />
              </div>
              <div className="space-y-2">
                <Label>Police Verification Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="not_verified">Not Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/drivers")}>
          Cancel
        </Button>
        <Button onClick={() => console.log("Save driver")}>Save Driver</Button>
      </div>
    </div>
  );
}
