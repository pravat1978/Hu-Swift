import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DriverFormData {
  personalDetails: {
    dateOfBirth: string;
    gender: string;
    name: string;
  };
  contactDetails: {
    mobileNumber: string;
    email: string;
  };
  licenseDetails: {
    licenseNumber: string;
    licenseExpiryDate: string;
    type: string;
    issuingAuthority: string;
  };
  vehicleAssigned: {
    vehicleId: string;
    vehicleType: string;
  };
  employmentDetails: {
    employeeId: string;
    organizationId: string;
    joiningDate: string;
    salary: number;
    shiftStartTime: string;
    shiftEndTime: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phoneNumber: string;
  };
  documentsUpload: {
    license: string;
    aadhar: string;
    pan: string;
    policeVerification: string;
  };
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}

const initialFormData: DriverFormData = {
  personalDetails: {
    dateOfBirth: "",
    gender: "",
    name: "",
  },
  contactDetails: {
    mobileNumber: "",
    email: "",
  },
  licenseDetails: {
    licenseNumber: "",
    licenseExpiryDate: "",
    type: "Commercial",
    issuingAuthority: "Regional Transport Office",
  },
  vehicleAssigned: {
    vehicleId: "",
    vehicleType: "Truck",
  },
  employmentDetails: {
    employeeId: "",
    organizationId: "",
    joiningDate: "",
    salary: 0,
    shiftStartTime: "",
    shiftEndTime: "",
  },
  emergencyContact: {
    name: "",
    relation: "",
    phoneNumber: "",
  },
  documentsUpload: {
    license: "",
    aadhar: "",
    pan: "",
    policeVerification: "",
  },
  address: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  },
};

interface Organization {
  id: string;
  name: string;
}

export default function DriverForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<DriverFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  // Static organization data
  const staticOrganizations = [
    { id: "org1", name: "Swift Logistics Ltd" },
    { id: "org2", name: "Express Transport Co" },
    { id: "org3", name: "Global Freight Services" },
    { id: "org4", name: "Metro Cargo Systems" },
    { id: "org5", name: "City Logistics Inc" },
  ];

  useEffect(() => {
    setOrganizations(staticOrganizations);
  }, []);

  useEffect(() => {
    if (id) {
      fetchDriver();
    }
  }, [id]);

  const fetchDriver = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/drivers/${id}`,
      );
      if (!response.ok) throw new Error("Failed to fetch driver");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching driver:", error);
      setError("Failed to fetch driver details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = id
        ? `https://apis.huswift.hutechweb.com/drivers/${id}`
        : "https://apis.huswift.hutechweb.com/drivers/onboard";

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save driver");

      navigate("/drivers");
    } catch (error) {
      console.error("Error saving driver:", error);
      setError("Failed to save driver. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (
    section: keyof DriverFormData,
    field: string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="license">License Details</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.personalDetails.name}
                  onChange={(e) =>
                    updateFormData("personalDetails", "name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.personalDetails.dateOfBirth}
                  onChange={(e) =>
                    updateFormData(
                      "personalDetails",
                      "dateOfBirth",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={formData.personalDetails.gender}
                  onValueChange={(value) =>
                    updateFormData("personalDetails", "gender", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.contactDetails.mobileNumber}
                  onChange={(e) =>
                    updateFormData(
                      "contactDetails",
                      "mobileNumber",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.contactDetails.email}
                  onChange={(e) =>
                    updateFormData("contactDetails", "email", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <h3 className="font-medium">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input
                    value={formData.address.addressLine1}
                    onChange={(e) =>
                      updateFormData("address", "addressLine1", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input
                    value={formData.address.addressLine2}
                    onChange={(e) =>
                      updateFormData("address", "addressLine2", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.address.city}
                    onChange={(e) =>
                      updateFormData("address", "city", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input
                    value={formData.address.state}
                    onChange={(e) =>
                      updateFormData("address", "state", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input
                    value={formData.address.pincode}
                    onChange={(e) =>
                      updateFormData("address", "pincode", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input value="India" disabled />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input
                  value={formData.licenseDetails.licenseNumber}
                  onChange={(e) =>
                    updateFormData(
                      "licenseDetails",
                      "licenseNumber",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>License Type</Label>
                <Select
                  value={formData.licenseDetails.type}
                  onValueChange={(value) =>
                    updateFormData("licenseDetails", "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LMV">
                      LMV - Light Motor Vehicle (Cars, Jeeps, SUVs)
                    </SelectItem>
                    <SelectItem value="LMV-NT">
                      LMV-NT - Light Motor Vehicle Non-Transport
                    </SelectItem>
                    <SelectItem value="LMV-TR">
                      LMV-TR - Light Motor Vehicle Transport
                    </SelectItem>
                    <SelectItem value="MCWG">
                      MCWG - Motorcycle with Gear
                    </SelectItem>
                    <SelectItem value="MCWOG">
                      MCWOG - Motorcycle without Gear
                    </SelectItem>
                    <SelectItem value="HMV">
                      HMV - Heavy Motor Vehicle
                    </SelectItem>
                    <SelectItem value="HGMV">
                      HGMV - Heavy Goods Motor Vehicle
                    </SelectItem>
                    <SelectItem value="HPMV">
                      HPMV - Heavy Passenger Motor Vehicle
                    </SelectItem>
                    <SelectItem value="TR">TR - Trailer</SelectItem>
                    <SelectItem value="ROAD_ROLLER">Road Roller</SelectItem>
                    <SelectItem value="OTHER">
                      Other Specialized Vehicles
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Issuing Authority</Label>
                <Input
                  value={formData.licenseDetails.issuingAuthority}
                  onChange={(e) =>
                    updateFormData(
                      "licenseDetails",
                      "issuingAuthority",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.licenseDetails.licenseExpiryDate}
                  onChange={(e) =>
                    updateFormData(
                      "licenseDetails",
                      "licenseExpiryDate",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization</Label>
                <Select
                  value={formData.employmentDetails.organizationId}
                  onValueChange={(value) =>
                    updateFormData("employmentDetails", "organizationId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Employee ID</Label>
                <Input
                  value={formData.employmentDetails.employeeId}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "employeeId",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input
                  type="date"
                  value={formData.employmentDetails.joiningDate}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "joiningDate",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Salary</Label>
                <Input
                  type="number"
                  value={formData.employmentDetails.salary}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "salary",
                      parseInt(e.target.value),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Shift Start Time</Label>
                <Input
                  type="time"
                  value={formData.employmentDetails.shiftStartTime}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "shiftStartTime",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Shift End Time</Label>
                <Input
                  type="time"
                  value={formData.employmentDetails.shiftEndTime}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "shiftEndTime",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Emergency Contact Name</Label>
                <Input
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    updateFormData("emergencyContact", "name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Relation</Label>
                <Input
                  value={formData.emergencyContact.relation}
                  onChange={(e) =>
                    updateFormData(
                      "emergencyContact",
                      "relation",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Phone</Label>
                <Input
                  value={formData.emergencyContact.phoneNumber}
                  onChange={(e) =>
                    updateFormData(
                      "emergencyContact",
                      "phoneNumber",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/drivers")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {id ? "Update" : "Save"} Driver
        </Button>
      </div>
    </div>
  );
}
