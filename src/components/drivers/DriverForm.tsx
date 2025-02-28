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

interface Vehicle {
  id: string;
  vehicleNumber: string;
}
export default function DriverForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<DriverFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  // const [nameError, setNameError] = useState("");
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/organizations/all?page=1&size=100&sort=desc`,
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
    fetchVehicles();
  }, []);
  const fetchVehicles = async () => {
    try {
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/vehicles/?page=10&size=5`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      if (Array.isArray(data.data)) {
        const transformedData = data.data.map((item) => ({
          id: item.vehicles.id,
          vehicleNumber: item.vehicles.basicInfo.vehicleNumber,
        }));
        setVehicles(transformedData);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles");
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
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={formData.personalDetails?.name}
                  onChange={(e) => {
                    const regex = /^[A-Za-z\s]+$/; // Only allows alphabets and spaces
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      updateFormData("personalDetails", "name", e.target.value);
                    }
                  }}
                />
                {(formData.personalDetails?.name === "" && (
                  <p className="text-red-500 text-sm">Full Name is required</p>
                )) ||
                  (formData.personalDetails?.name !== "" &&
                    !/^[A-Za-z\s]+$/.test(formData.personalDetails?.name) && (
                      <p className="text-red-500 text-sm">
                        Only alphabets are allowed
                      </p>
                    ))}
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  required
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18),
                    )
                      .toISOString()
                      .split("T")[0]
                  } // Restricts DOB to at least 18 years old
                  value={formData.personalDetails?.dateOfBirth}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const today = new Date();
                    const minAllowedDate = new Date(
                      today.getFullYear() - 18,
                      today.getMonth(),
                      today.getDate(),
                    ); // Ensures driver is at least 18 years old

                    if (
                      selectedDate <= today &&
                      selectedDate <= minAllowedDate
                    ) {
                      updateFormData(
                        "personalDetails",
                        "dateOfBirth",
                        e.target.value,
                      );
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                required
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
                  type="text"
                  placeholder="Enter your phone number"
                  required
                  maxLength={10} // Ensures only 10 characters can be entered
                  value={formData.contactDetails?.mobileNumber}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/; // Only allows numbers
                    if (
                      e.target.value === "" ||
                      (regex.test(e.target.value) &&
                        e.target.value.length <= 10)
                    ) {
                      updateFormData(
                        "contactDetails",
                        "mobileNumber",
                        e.target.value,
                      );
                    }
                  }}
                  errorMessage="Enter a valid 10-digit phone number"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  errorMessage="Please enter a valid email"
                  value={formData.contactDetails?.email}
                  onChange={(e) =>
                    updateFormData("personalDetails", "email", e.target.value)
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
                    required
                    maxLength={100}
                    value={formData.address?.addressLine1}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        updateFormData(
                          "address",
                          "addressLine1",
                          e.target.value,
                        );
                      }
                    }}
                    placeholder="Enter address line 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input
                    maxLength={100}
                    value={formData.address?.addressLine2}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        updateFormData(
                          "address",
                          "addressLine2",
                          e.target.value,
                        );
                      }
                    }}
                    placeholder="Enter address line 2"
                  />
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    required
                    maxLength={50} // Restricts input length to 50 characters
                    value={formData.address?.city}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        updateFormData("address", "city", e.target.value);
                      }
                    }}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <Select
                    value={formData.address?.state}
                    onValueChange={(value) =>
                      updateFormData("address", "state", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Andhra Pradesh">
                        Andhra Pradesh
                      </SelectItem>
                      <SelectItem value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </SelectItem>
                      <SelectItem value="Assam">Assam</SelectItem>
                      <SelectItem value="Bihar">Bihar</SelectItem>
                      <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                      <SelectItem value="Himachal Pradesh">
                        Himachal Pradesh
                      </SelectItem>
                      <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Kerala">Kerala</SelectItem>
                      <SelectItem value="Madhya Pradesh">
                        Madhya Pradesh
                      </SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Manipur">Manipur</SelectItem>
                      <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                      <SelectItem value="Mizoram">Mizoram</SelectItem>
                      <SelectItem value="Nagaland">Nagaland</SelectItem>
                      <SelectItem value="Odisha">Odisha</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="Sikkim">Sikkim</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                      <SelectItem value="Tripura">Tripura</SelectItem>
                      <SelectItem value="Uttar Pradesh">
                        Uttar Pradesh
                      </SelectItem>
                      <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                      <SelectItem value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input
                    required
                    value={formData.address?.pincode}
                    onChange={(e) => {
                      const value = e.target.value;
                      const regex = /^[0-9]{5,10}$/;
                      if (regex.test(value) || value === "") {
                        updateFormData("address", "pincode", value);
                      }
                    }}
                    placeholder="Enter pincode"
                  />
                  {formData.address?.pincode &&
                    !/^[0-9]{5,10}$/.test(formData.address?.pincode) && (
                      <p className="text-red-500 text-sm">
                        Pincode must be between 5 to 10 digits
                      </p>
                    )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input
                  required
                  value={formData.licenseDetails?.licenseNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[A-Z0-9]{8,20}$/;
                    if (regex.test(value) || value === "") {
                      updateFormData("licenseDetails", "licenseNumber", value);
                    }
                  }}
                  placeholder="Enter license number"
                />
                {formData.licenseDetails?.licenseNumber &&
                  !/^[A-Z0-9]{8,20}$/.test(
                    formData.licenseDetails?.licenseNumber,
                  ) && (
                    <p className="text-red-500 text-sm">
                      License number must be alphanumeric and between 8 to 20
                      characters
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label>License Expiry Date</Label>
                <Input
                  type="date"
                  required
                  value={formData.licenseDetails?.licenseExpiryDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
                    if (value > currentDate || value === "") {
                      updateFormData(
                        "licenseDetails",
                        "licenseExpiryDate",
                        value,
                      );
                    }
                  }}
                />
                {formData.licenseDetails?.licenseExpiryDate &&
                  formData.licenseDetails?.licenseExpiryDate <=
                    new Date().toISOString().split("T")[0] && (
                    <p className="text-red-500 text-sm">
                      License expiry date must be in the future
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label>License Type</Label>
                <Select
                  value={formData.licenseDetails?.type}
                  onValueChange={(value) =>
                    updateFormData("licenseDetails", "type", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Motorcycle without Gear">
                      MCWOG
                    </SelectItem>
                    <SelectItem value="Motorcycle with Gear">MCWG</SelectItem>
                    <SelectItem value="Heavy Motor Vehicle">HMV</SelectItem>
                    <SelectItem value="Light Motor Vehicle">LMV</SelectItem>
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
                  required
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Select
                  value={formData.employmentDetails?.organizationId}
                  onValueChange={(value) =>
                    updateFormData("employmentDetails", "organizationId", value)
                  }
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select
                  value={formData.vehicleAssigned?.vehicleId}
                  onValueChange={(value) =>
                    updateFormData("vehicleAssigned", "vehicleId", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicleAssigned" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.vehicleNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    onChange={(e) => {
                      const regex = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        updateFormData(
                          "emergencyContact",
                          "name",
                          e.target.value,
                        );
                      }
                    }}
                    required
                    placeholder="Enter contact name"
                  />
                  {formData.emergencyContact?.name &&
                    !/^[a-zA-Z\s]+$/.test(formData.emergencyContact?.name) && (
                      <p className="text-red-500 text-sm">
                        Name should contain only letters and spaces
                      </p>
                    )}
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
                    required
                    placeholder="Enter 10-digit phone number"
                    type="tel"
                    pattern="^[0-9]{10}$"
                  />
                  {formData.emergencyContact?.phoneNumber &&
                    formData.emergencyContact?.phoneNumber.length !== 10 && (
                      <p className="text-red-500 text-sm">
                        Phone number must be 10 digits long.
                      </p>
                    )}
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
                    required
                    pattern="^[A-Z0-9]{8,20}$"
                    placeholder="Enter License Number"
                  />
                  {formData.documentsUpload?.license &&
                    !/^[A-Z0-9]{8,20}$/.test(
                      formData.documentsUpload?.license,
                    ) && (
                      <p className="text-red-500 text-sm">
                        License number must be alphanumeric and between 8 to 20
                        characters
                      </p>
                    )}
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
                    required
                    pattern="^[2-9]{1}[0-9]{11}$"
                    placeholder="Enter Aadhar number"
                  />
                  {formData.documentsUpload?.aadhar &&
                    !/^[2-9]{1}[0-9]{11}$/.test(
                      formData.documentsUpload?.aadhar,
                    ) && (
                      <p className="text-red-500 text-sm">
                        Aadhar number must be a valid 12-digit number.
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label>PAN Card</Label>
                  <Input
                    value={formData.documentsUpload?.pan}
                    onChange={(e) =>
                      updateFormData("documentsUpload", "pan", e.target.value)
                    }
                    required
                    pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                    placeholder="Enter PAN number"
                  />
                  {formData.documentsUpload?.pan &&
                    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
                      formData.documentsUpload?.pan,
                    ) && (
                      <p className="text-red-500 text-sm">
                        PAN number must be in format ABCDE1234F
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label>Police Verification</Label>
                  <Select
                    value={formData.documentsUpload?.policeVerification}
                    onValueChange={(value) =>
                      updateFormData(
                        "documentsUpload",
                        "policeVerification",
                        value,
                      )
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/drivers")}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              // className="w-full mt-6"
              disabled={loading}
            >
              {id ? "Update Driver" : "Add Driver"}
            </Button>
          </div>
        </Card>
      </Tabs>
    </div>
  );
}
