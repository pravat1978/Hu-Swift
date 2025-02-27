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

export default function WarehouseForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    basicInfo: {
      status: true,
      warehouseName: "",
      warehouseCode: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
      geoLocation: {
        latitude: 0,
        longitude: 0,
      },
      phoneNumber: "",
      emailAddress: "",
      website: "",
    },
    contactDetails: {
      primaryContactName: "",
      primaryContactPhone: "",
      primaryContactEmail: "",
      secondaryContactName: "",
      secondaryContactPhone: "",
      secondaryContactEmail: "",
    },
    storageCapacity: {
      warehouseType: "Cold Storage",
      totalArea: 0,
      numberOfStorageSections: 0,
      maxCapacityPallets: 0,
      storageTypesSupported: [] as string[],
      currentUtilizationPercentage: 0,
      allowedLoadPerRackKg: 0,
      temperatureControlAvailable: false,
      minTemperature: 0,
      maxTemperature: 0,
    },
    operations: {
      weekDayHours: "",
      weekendOrHolidayHours: "",
      wareHouseManagerName: "",
      managerContact: "",
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://apis.huswift.hutechweb.com/warehouses/onboard",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to save warehouse");

      const data = await response.json();
      if (data.data?.code === "SUCCESS") {
        navigate("/locations/warehouses");
      } else {
        throw new Error(data.message || "Failed to save warehouse");
      }
    } catch (error) {
      console.error("Error saving warehouse:", error);
      setError("Failed to save warehouse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

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
                <Label>Warehouse Name</Label>
                <Input
                  placeholder="Enter warehouse name"
                  value={formData.basicInfo.warehouseName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        warehouseName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Warehouse Code</Label>
                <Input
                  placeholder="Enter warehouse code"
                  value={formData.basicInfo.warehouseCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        warehouseCode: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Address Fields */}
              <div className="col-span-2 space-y-4">
                <h3 className="font-medium">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address Line 1</Label>
                    <Input
                      placeholder="Enter address line 1"
                      value={formData.basicInfo.address.addressLine1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicInfo: {
                            ...formData.basicInfo,
                            address: {
                              ...formData.basicInfo.address,
                              addressLine1: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 2</Label>
                    <Input
                      placeholder="Enter address line 2"
                      value={formData.basicInfo.address.addressLine2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicInfo: {
                            ...formData.basicInfo,
                            address: {
                              ...formData.basicInfo.address,
                              addressLine2: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Enter city"
                      value={formData.basicInfo.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicInfo: {
                            ...formData.basicInfo,
                            address: {
                              ...formData.basicInfo.address,
                              city: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      placeholder="Enter state"
                      value={formData.basicInfo.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicInfo: {
                            ...formData.basicInfo,
                            address: {
                              ...formData.basicInfo.address,
                              state: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input
                      placeholder="Enter pincode"
                      value={formData.basicInfo.address.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basicInfo: {
                            ...formData.basicInfo,
                            address: {
                              ...formData.basicInfo.address,
                              pincode: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="Enter phone number"
                  value={formData.basicInfo.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        phoneNumber: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.basicInfo.emailAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        emailAddress: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Contact Name</Label>
                <Input
                  placeholder="Enter primary contact name"
                  value={formData.contactDetails.primaryContactName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: {
                        ...formData.contactDetails,
                        primaryContactName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Primary Contact Phone</Label>
                <Input
                  placeholder="Enter primary contact phone"
                  value={formData.contactDetails.primaryContactPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactDetails: {
                        ...formData.contactDetails,
                        primaryContactPhone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Warehouse Type</Label>
                <Select
                  value={formData.storageCapacity.warehouseType}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      storageCapacity: {
                        ...formData.storageCapacity,
                        warehouseType: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                    <SelectItem value="Dry Storage">Dry Storage</SelectItem>
                    <SelectItem value="Hazmat Storage">
                      Hazmat Storage
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Total Area (sq. meters)</Label>
                <Input
                  type="number"
                  placeholder="Enter total area"
                  value={formData.storageCapacity.totalArea}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      storageCapacity: {
                        ...formData.storageCapacity,
                        totalArea: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weekday Hours</Label>
                <Input
                  type="time"
                  value={formData.operations.weekDayHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operations: {
                        ...formData.operations,
                        weekDayHours: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Weekend/Holiday Hours</Label>
                <Input
                  type="time"
                  value={formData.operations.weekendOrHolidayHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operations: {
                        ...formData.operations,
                        weekendOrHolidayHours: e.target.value,
                      },
                    })
                  }
                />
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
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Warehouse"}
        </Button>
      </div>
    </div>
  );
}
