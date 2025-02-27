import { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import VehicleMaintenance from "./VehicleMaintenance";
interface VehicleFormData {
  assignedDriver: {
    driverId: string;
    name: string;
  };
  basicInfo: {
    vehicleNumber: string;
    type: string;
    make: string;
    model: string;
    yearOfManufacturing: string;
  };
  capacity: {
    maxLoad: string;
    seatingCapacity: string;
  };
  documentUpload: {
    rc: string;
    insurance: string;
    permit: string;
    pollutionCertificate: string;
  };
  fuelDetails: {
    fuelType: string;
    mileage: string;
    tankCapacity: string;
  };
  gpsTracking: {
    deviceId: string;
    installed: false;
  };
  insuranceDetails: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  maintenanceSchedule: {
    lastServiceDate: string;
    nextDueDate: string;
    serviceCenter: string;
  };
  ownerShipType: {
    ownerShipType: string;
  };
  permitDetails: {
    permit: string;
    validity: string;
    routRestriction: string;
  };
  registrationDetails: {
    rcNumber: string;
    state: string;
    expiryDate: string;
  };
}
const initialFormData: VehicleFormData = {
  assignedDriver: {
    driverId: "",
    name: "",
  },
  basicInfo: {
    vehicleNumber: "",
    type: "",
    make: "",
    model: "",
    yearOfManufacturing: "",
  },
  capacity: {
    maxLoad: "",
    seatingCapacity: "",
  },
  documentUpload: {
    rc: "",
    insurance: "",
    permit: "",
    pollutionCertificate: "",
  },
  fuelDetails: {
    fuelType: "",
    mileage: "",
    tankCapacity: "",
  },
  gpsTracking: {
    deviceId: "",
    installed: false,
  },
  insuranceDetails: {
    provider: "",
    policyNumber: "",
    expiryDate: "",
  },
  maintenanceSchedule: {
    lastServiceDate: "",
    nextDueDate: "",
    serviceCenter: "",
  },
  ownerShipType: {
    ownerShipType: "",
  },
  permitDetails: {
    permit: "",
    validity: "",
    routRestriction: "",
  },
  registrationDetails: {
    rcNumber: "",
    state: "",
    expiryDate: "",
  },
};
export default function VehicleForm() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VehicleFormData>(initialFormData);

  useEffect(() => {
    if (id) {
      fetchVehicles();
    }
  }, [id]);
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/vehicles/${id}`,
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
      console.log("Vehicle data:", data); // For debugging

      // Transform API response to match form data structure
      if (data.vehicles) {
        const vehicle = data?.vehicles?.vehicle;
        console.log("Vehicle:", vehicle);
        setFormData({
          assignedDriver: {
            driverId: vehicle.assignedDriver?.driverId || "",
            name: vehicle.assignedDriver?.name || "",
          },
          basicInfo: {
            vehicleNumber: vehicle.basicInfo?.vehicleNumber || "",
            type: vehicle.basicInfo?.type || "",
            make: vehicle.basicInfo?.make || "",
            model: vehicle.basicInfo?.model || "",
            yearOfManufacturing: vehicle.basicInfo?.yearOfManufacturing || "",
          },
          capacity: {
            maxLoad: vehicle.capacity?.maxLoad || "",
            seatingCapacity: vehicle.capacity?.seatingCapacity || "",
          },
          documentUpload: {
            rc: vehicle.documentUpload?.rc || "",
            insurance: vehicle.documentUpload?.insurance || "",
            permit: vehicle.documentUpload?.permit || "",
            pollutionCertificate:
              vehicle.documentUpload?.pollutionCertificate || "",
          },
          fuelDetails: {
            fuelType: vehicle.fuelDetails?.fuelType || "",
            mileage: vehicle.fuelDetails?.mileage || "",
            tankCapacity: vehicle.fuelDetails?.tankCapacity || "",
          },
          gpsTracking: {
            deviceId: vehicle.gpsTracking?.deviceId || "",
            installed: vehicle.gpsTracking?.installed || "",
          },
          insuranceDetails: {
            provider: vehicle.insuranceDetails?.provider || "",
            policyNumber: vehicle.insuranceDetails?.policyNumber || "",
            expiryDate: vehicle.insuranceDetails?.expiryDate || "",
          },
          maintenanceSchedule: {
            lastServiceDate: vehicle.maintenanceSchedule?.lastServiceDate || "",
            nextDueDate: vehicle.maintenanceSchedule?.nextDueDate || "",
            serviceCenter: vehicle.maintenanceSchedule?.serviceCenter || "",
          },
          ownerShipType: {
            ownerShipType: vehicle.ownerShipType?.ownerShipType || "",
          },
          permitDetails: {
            permit: vehicle.permitDetails?.permit || "",
            validity: vehicle.permitDetails?.validity || "",
            routRestriction: vehicle.permitDetails?.routRestriction || "",
          },
          registrationDetails: {
            rcNumber: vehicle.registrationDetails?.rcNumber || "",
            state: vehicle.registrationDetails?.state || "",
            expiryDate: vehicle.registrationDetails?.expiryDate || "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      setError("Failed to fetch vehicle details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = id
        ? `https://apis.huswift.hutechweb.com/vehicles/${id}`
        : "https://apis.huswift.hutechweb.com/vehicles/onboard";

      const payload = {
        assignedDriver: {
          driverId: formData.assignedDriver.driverId,
          name: formData.assignedDriver.name,
        },
        basicInfo: {
          vehicleNumber: formData.basicInfo.vehicleNumber,
          type: formData.basicInfo.type,
          make: formData.basicInfo.make,
          model: formData.basicInfo.model,
          yearOfManufacturing: formData.basicInfo.yearOfManufacturing,
        },
        capacity: {
          maxLoad: formData.capacity.maxLoad,
          seatingCapacity: formData.capacity.seatingCapacity,
        },
        documentUpload: {
          rc: formData.documentUpload.rc,
          insurance: formData.documentUpload.insurance,
          permit: formData.documentUpload.permit,
          pollutionCertificate: formData.documentUpload.pollutionCertificate,
        },
        fuelDetails: {
          fuelType: formData.fuelDetails.fuelType,
          mileage: formData.fuelDetails.mileage,
          tankCapacity: formData.fuelDetails.tankCapacity,
        },
        gpsTracking: {
          deviceId: formData.gpsTracking.deviceId,
          installed: formData.gpsTracking.installed,
        },
        insuranceDetails: {
          provider: formData.insuranceDetails.provider,
          policyNumber: formData.insuranceDetails.policyNumber,
          expiryDate: formData.insuranceDetails.expiryDate,
        },
        maintenanceSchedule: {
          lastServiceDate: formData.maintenanceSchedule.lastServiceDate,
          nextDueDate: formData.maintenanceSchedule.nextDueDate,
          serviceCenter: formData.maintenanceSchedule.serviceCenter,
        },
        ownerShipType: {
          ownerShipType: formData.ownerShipType.ownerShipType,
        },
        permitDetails: {
          permit: formData.permitDetails.permit,
          validity: formData.permitDetails.validity,
          routRestriction: formData.permitDetails.routRestriction,
        },
        registrationDetails: {
          rcNumber: formData.registrationDetails.rcNumber,
          state: formData.registrationDetails.state,
          expiryDate: formData.registrationDetails.expiryDate,
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
        throw new Error(errorData.message || "Failed to save vehicles");
      }
      const data = await response.json();
      console.log("data:", data);
      if (data?.data?.[0]?.code === "SUCCESS") {
        navigate("/vehicles");
      } else {
        throw new Error(data.message || "Failed to save vehicles");
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      setError(error.message || "Failed to save vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const updateFormData = (
    section: keyof VehicleFormData,
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
      {/* <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Add New Vehicle</h1>
         <Button variant="outline" onClick={() => navigate("/vehicles")}>
          Cancel
         </Button>
       </div> */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="docs">Documents</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Number</Label>
                <Input
                  placeholder="Enter vehicle number"
                  value={formData.basicInfo?.vehicleNumber}
                  onChange={(e) =>
                    updateFormData("basicInfo", "vehicleNumber", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.basicInfo.type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        type: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="container">Bike</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="two_wheeler">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Make</Label>
                <Input
                  placeholder="Vehicle make"
                  value={formData.basicInfo.make}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        make: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input
                  placeholder="Vehicle model"
                  value={formData.basicInfo.model}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        model: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input
                  type="number"
                  placeholder="Manufacturing year"
                  value={formData.basicInfo.yearOfManufacturing}
                  onChange={(e) =>
                    updateFormData(
                      "basicInfo",
                      "yearofManufacturing",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Registration State</Label>
                <Input
                  placeholder="State of registration"
                  value={formData.registrationDetails?.state}
                  onChange={(e) =>
                    updateFormData(
                      "registrationDetails",
                      "state",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chassis Number</Label>
                <Input placeholder="Enter chassis number" />
              </div>
              <div className="space-y-2">
                <Label>Engine Number</Label>
                <Input placeholder="Enter engine number" />
              </div>
              <div className="space-y-2">
                <Label>VIN</Label>
                <Input placeholder="Enter Vehicle Identification Number" />
              </div>
              <div className="space-y-2">
                <Label>Number of Axles</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of axles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuel Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuel Tank Capacity (Liters)</Label>
                <Input type="number" placeholder="Enter fuel tank capacity" />
              </div>
              <div className="space-y-2">
                <Label>Mileage (KM/L)</Label>
                <Input type="number" placeholder="Enter mileage" />
              </div>
              <div className="space-y-2">
                <Label>Average Fuel Consumption (KM/L)</Label>
                <Input
                  type="number"
                  placeholder="Enter average fuel consumption"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Max Load (kg)</Label>
                <Input type="number" placeholder="Maximum load capacity" />
              </div>
              <div className="space-y-2">
                <Label>Cargo Volume (m³)</Label>
                <Input type="number" placeholder="Cargo volume" />
              </div>
              <div className="space-y-2">
                <Label>Length (m)</Label>
                <Input type="number" placeholder="Cargo length" />
              </div>
              <div className="space-y-2">
                <Label>Width (m)</Label>
                <Input type="number" placeholder="Cargo width" />
              </div>
              <div className="space-y-2">
                <Label>Height (m)</Label>
                <Input type="number" placeholder="Cargo height" />
              </div>
              <div className="space-y-2">
                <Label>Pallet Capacity</Label>
                <Input type="number" placeholder="Number of pallets" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>RC Number</Label>
                <Input placeholder="Registration certificate number" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Policy</Label>
                <Input placeholder="Insurance policy number" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Provider</Label>
                <Input placeholder="Insurance company name" />
              </div>
              <div className="space-y-2">
                <Label>Insurance Expiry</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Permit Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National Permit</SelectItem>
                    <SelectItem value="state">State Permit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Permit Validity</Label>
                <Input type="date" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GPS Device ID</Label>
                <Input placeholder="GPS device identifier" />
              </div>
              <div className="space-y-2">
                <Label>Installation Date</Label>
                <Input type="date" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance">
            <VehicleMaintenance />
          </TabsContent>
        </Card>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSubmit}
          className="w-full mt-6"
          disabled={loading}
        >
          {id ? "Update Vehicle" : "Add Vehicle"}
        </Button>
      </div>
    </div>
  );
}
