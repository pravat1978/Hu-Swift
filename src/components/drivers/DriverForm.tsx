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
import MultiSelect from "react-select";

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
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        "https://apis.huswift.hutechweb.com/organizations/all?page=1&size=100&sort=desc",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );

      if (!response.ok) throw new Error("Failed to fetch organizations");

      const data = await response.json();
      if (Array.isArray(data.data)) {
        const transformedData = data.data.map((item) => ({
          id: item.organizationDetails.id,
          name: item.organizationDetails.organizationName,
        }));
        setOrganizations(transformedData);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setError("Failed to fetch organizations");
    }
  };

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
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );

      if (!response.ok) throw new Error("Failed to fetch driver");
      const data = await response.json();
      console.log("Driver data:", data); // For debugging

      // Transform API response to match form data structure
      if (data.drivers) {
        const driver = data?.drivers?.driver;
        console.log("Driver:", driver); // For debugging
        setFormData({
          personalDetails: {
            dateOfBirth: driver.personalDetails?.dateOfBirth || "",
            gender: driver.personalDetails?.gender || "",
            name: driver.personalDetails?.name || "",
          },
          contactDetails: {
            mobileNumber: driver.contactDetails?.mobileNumber || "",
            email: driver.contactDetails?.email || "",
          },
          licenseDetails: {
            licenseNumber: driver.licenseDetails?.licenseNumber || "",
            licenseExpiryDate: driver.licenseDetails?.licenseExpiryDate || "",
            type: driver.licenseDetails?.type || "Commercial",
            issuingAuthority:
              driver.licenseDetails?.issuingAuthority ||
              "Regional Transport Office",
          },
          vehicleAssigned: {
            vehicleId: driver.vehicleAssigned?.vehicleId || "",
            vehicleType: driver.vehicleAssigned?.vehicleType || "Truck",
          },
          employmentDetails: {
            employeeId: driver.employmentDetails?.employeeId || "",
            organizationId: driver.employmentDetails?.organizationId || "",
            joiningDate: driver.employmentDetails?.joiningDate || "",
            salary: driver.employmentDetails?.salary || 0,
            shiftStartTime: driver.employmentDetails?.shiftStartTime || "",
            shiftEndTime: driver.employmentDetails?.shiftEndTime || "",
          },
          emergencyContact: {
            name: driver.emergencyContact?.name || "",
            relation: driver.emergencyContact?.relation || "",
            phoneNumber: driver.emergencyContact?.phoneNumber || "",
          },
          documentsUpload: {
            license: driver.documentsUpload?.license || "",
            aadhar: driver.documentsUpload?.aadhar || "",
            pan: driver.documentsUpload?.pan || "",
            policeVerification:
              driver.documentsUpload?.policeVerification || "",
          },
          address: {
            addressLine1: driver.address?.addressLine1 || "",
            addressLine2: driver.address?.addressLine2 || "",
            city: driver.address?.city || "",
            state: driver.address?.state || "",
            country: driver.address?.country || "India",
            pincode: driver.address?.pincode || "",
          },
        });
      }
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

      const payload = {
        personalDetails: {
          dateOfBirth: formData.personalDetails.dateOfBirth,
          gender: formData.personalDetails.gender,
          name: formData.personalDetails.name,
        },
        contactDetails: {
          mobileNumber: formData.contactDetails.mobileNumber,
          email: formData.contactDetails.email,
        },
        licenseDetails: {
          licenseNumber: formData.licenseDetails.licenseNumber,
          licenseExpiryDate: formData.licenseDetails.licenseExpiryDate,
          type: formData.licenseDetails.type,
          issuingAuthority: formData.licenseDetails.issuingAuthority,
        },
        vehicleAssigned: {
          vehicleId: formData.vehicleAssigned.vehicleId,
          vehicleType: formData.vehicleAssigned.vehicleType,
        },
        employmentDetails: {
          employeeId: formData.employmentDetails.employeeId,
          organizationId: formData.employmentDetails.organizationId,
          joiningDate: formData.employmentDetails.joiningDate,
          salary: formData.employmentDetails.salary,
          shiftStartTime: formData.employmentDetails.shiftStartTime,
          shiftEndTime: formData.employmentDetails.shiftEndTime,
        },
        emergencyContact: {
          name: formData.emergencyContact.name,
          relation: formData.emergencyContact.relation,
          phoneNumber: formData.emergencyContact.phoneNumber,
        },
        documentsUpload: {
          license: formData.documentsUpload.license,
          aadhar: formData.documentsUpload.aadhar,
          pan: formData.documentsUpload.pan,
          policeVerification: formData.documentsUpload.policeVerification,
        },
        address: {
          addressLine1: formData.address.addressLine1,
          addressLine2: formData.address.addressLine2,
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
          pincode: formData.address.pincode,
        },
      };

      const response = await fetch(url, {
        method: id ? "PATCH" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        body: JSON.stringify(id ? payload : payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save driver");
      }

      const data = await response.json();
      console.log("data:", data);
      if (data?.data?.[0]?.code === "SUCCESS") {
        navigate("/drivers");
      } else {
        throw new Error(data.message || "Failed to save driver");
      }
    } catch (error) {
      console.error("Error saving driver:", error);
      setError(error.message || "Failed to save driver. Please try again.");
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

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      if (!formData.employmentDetails?.organizationId) return;
      try {
        const response = await fetch(
          `https://apis.huswift.hutechweb.com/vehicles/?page=${page}&limit=6`,
        );
        const data = await response.json();
        setVehicles(data?.vehicles || []);
        console.log("Fetched Vehicles:", data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [formData.employmentDetails?.organizationId, page]);

  // Log after vehicles state updates
  useEffect(() => {
    console.log("Updated Vehicles:", vehicles);
  }, [vehicles]);

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
                  value={formData.personalDetails?.name}
                  onChange={(e) =>
                    updateFormData("personalDetails", "name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.personalDetails?.dateOfBirth}
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
                  value={formData.personalDetails?.gender}
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
                  value={formData.contactDetails?.mobileNumber}
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
                  value={formData.contactDetails?.email}
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
                    value={formData.address?.addressLine1}
                    onChange={(e) =>
                      updateFormData("address", "addressLine1", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input
                    value={formData.address?.addressLine2}
                    onChange={(e) =>
                      updateFormData("address", "addressLine2", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.address?.city}
                    onChange={(e) =>
                      updateFormData("address", "city", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input
                    value={formData.address?.state}
                    onChange={(e) =>
                      updateFormData("address", "state", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input
                    value={formData.address?.pincode}
                    onChange={(e) =>
                      updateFormData("address", "pincode", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input
                  value={formData.licenseDetails?.licenseNumber}
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
                <Label>License Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.licenseDetails?.licenseExpiryDate}
                  onChange={(e) =>
                    updateFormData(
                      "licenseDetails",
                      "licenseExpiryDate",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>License Type</Label>
                <Select
                  value={formData.licenseDetails?.type}
                  onValueChange={(value) =>
                    updateFormData("licenseDetails", "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Non-Commercial">
                      Non-Commercial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Issuing Authority</Label>
                <Input
                  value={formData.licenseDetails?.issuingAuthority}
                  onChange={(e) =>
                    updateFormData(
                      "licenseDetails",
                      "issuingAuthority",
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
                <Label>Employee ID</Label>
                <Input
                  value={formData.employmentDetails?.employeeId}
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
                <Label>Organization</Label>
                <Select
                  value={formData.employmentDetails?.organizationId}
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
                <Label>Joining Date</Label>
                <Input
                  type="date"
                  value={formData.employmentDetails?.joiningDate}
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
                  value={formData.employmentDetails?.salary}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "salary",
                      parseFloat(e.target.value),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Shift Start Time</Label>
                <Input
                  type="time"
                  value={formData.employmentDetails?.shiftStartTime}
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
                  value={formData.employmentDetails?.shiftEndTime}
                  onChange={(e) =>
                    updateFormData(
                      "employmentDetails",
                      "shiftEndTime",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Vehicles</Label>
                <MultiSelect
                  options={vehicles.map((vehicle) => ({
                    value: vehicle.basicInfo.vehicleNumber, // Ensure this is unique
                    label: vehicle.basicInfo.vehicleNumber,
                  }))}
                  value={(formData.employmentDetails?.vehicles || []).map(
                    (vehicleNumber: string) => {
                      const matchedVehicle = vehicles.find(
                        (v) => v.basicInfo.vehicleNumber === vehicleNumber,
                      );
                      return {
                        value: vehicleNumber,
                        label: matchedVehicle
                          ? matchedVehicle.basicInfo.vehicleNumber
                          : "Unknown",
                      };
                    },
                  )}
                  onChange={(selected) =>
                    updateFormData(
                      "employmentDetails",
                      "vehicles",
                      selected.map((option: any) => option.value),
                    )
                  }
                  isLoading={loading}
                  placeholder="Select vehicles"
                  isMulti
                />{" "}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Emergency Contact</h3>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input
                    value={formData.emergencyContact?.name}
                    onChange={(e) =>
                      updateFormData("emergencyContact", "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input
                    value={formData.emergencyContact?.relation}
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
                  <Label>Contact Phone</Label>
                  <Input
                    value={formData.emergencyContact?.phoneNumber}
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

              <div className="space-y-4">
                <h3 className="font-medium">Document Upload</h3>
                <div className="space-y-2">
                  <Label>License Document</Label>
                  <Input
                    value={formData.documentsUpload?.license}
                    onChange={(e) =>
                      updateFormData(
                        "documentsUpload",
                        "license",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Aadhar Card</Label>
                  <Input
                    value={formData.documentsUpload?.aadhar}
                    onChange={(e) =>
                      updateFormData(
                        "documentsUpload",
                        "aadhar",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>PAN Card</Label>
                  <Input
                    value={formData.documentsUpload?.pan}
                    onChange={(e) =>
                      updateFormData("documentsUpload", "pan", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Police Verification</Label>
                  <Input
                    value={formData.documentsUpload?.policeVerification}
                    onChange={(e) =>
                      updateFormData(
                        "documentsUpload",
                        "policeVerification",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <Button
            onClick={handleSubmit}
            className="w-full mt-6"
            disabled={loading}
          >
            {id ? "Update Driver" : "Add Driver"}
          </Button>
        </Card>
      </Tabs>
    </div>
  );
}
