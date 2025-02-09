import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const maintenanceTypes = [
  { value: "preventive", label: "Preventive" },
  { value: "corrective", label: "Corrective" },
  { value: "emergency", label: "Emergency" },
];

const serviceTypes = [
  { id: "oil-change", label: "Oil Change" },
  { id: "brake-check", label: "Brake Check" },
  { id: "tire-replacement", label: "Tire Replacement" },
  { id: "battery-check", label: "Battery Check" },
  { id: "engine-tuneup", label: "Engine Tune-up" },
  { id: "suspension-check", label: "Suspension Check" },
  { id: "air-filter", label: "Air Filter Replacement" },
  { id: "transmission", label: "Transmission Service" },
];

const maintenanceStatuses = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "pending-approval", label: "Pending Approval" },
];

export default function VehicleMaintenance() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [maintenanceData, setMaintenanceData] = useState({
    maintenanceType: "",
    maintenanceStatus: "",
    serviceDate: "",
    nextServiceDate: "",
    odometerReading: "",
    serviceProvider: "",
    maintenanceCost: "",
  });

  const handleServiceTypeChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Maintenance Type */}
        <div className="space-y-2">
          <Label>Maintenance Type</Label>
          <Select
            value={maintenanceData.maintenanceType}
            onValueChange={(value) =>
              setMaintenanceData({ ...maintenanceData, maintenanceType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select maintenance type" />
            </SelectTrigger>
            <SelectContent>
              {maintenanceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Maintenance Status */}
        <div className="space-y-2">
          <Label>Maintenance Status</Label>
          <Select
            value={maintenanceData.maintenanceStatus}
            onValueChange={(value) =>
              setMaintenanceData({
                ...maintenanceData,
                maintenanceStatus: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {maintenanceStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Service Types */}
        <div className="col-span-2 space-y-2">
          <Label>Service Type</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {serviceTypes.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={(checked) =>
                    handleServiceTypeChange(service.id, checked as boolean)
                  }
                />
                <Label htmlFor={service.id}>{service.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Service Date */}
        <div className="space-y-2">
          <Label>Service Date</Label>
          <Input
            type="date"
            value={maintenanceData.serviceDate}
            onChange={(e) =>
              setMaintenanceData({
                ...maintenanceData,
                serviceDate: e.target.value,
              })
            }
          />
        </div>

        {/* Next Service Due Date */}
        <div className="space-y-2">
          <Label>Next Service Due Date</Label>
          <Input
            type="date"
            value={maintenanceData.nextServiceDate}
            onChange={(e) =>
              setMaintenanceData({
                ...maintenanceData,
                nextServiceDate: e.target.value,
              })
            }
          />
        </div>

        {/* Odometer Reading */}
        <div className="space-y-2">
          <Label>Odometer Reading</Label>
          <Input
            type="number"
            placeholder="Enter current reading"
            value={maintenanceData.odometerReading}
            onChange={(e) =>
              setMaintenanceData({
                ...maintenanceData,
                odometerReading: e.target.value,
              })
            }
          />
        </div>

        {/* Service Provider */}
        <div className="space-y-2">
          <Label>Service Provider</Label>
          <Input
            placeholder="Enter service provider details"
            value={maintenanceData.serviceProvider}
            onChange={(e) =>
              setMaintenanceData({
                ...maintenanceData,
                serviceProvider: e.target.value,
              })
            }
          />
        </div>

        {/* Maintenance Cost */}
        <div className="space-y-2">
          <Label>Maintenance Cost</Label>
          <Input
            type="number"
            placeholder="Enter cost"
            value={maintenanceData.maintenanceCost}
            onChange={(e) =>
              setMaintenanceData({
                ...maintenanceData,
                maintenanceCost: e.target.value,
              })
            }
          />
        </div>

        {/* Invoice Upload */}
        <div className="space-y-2">
          <Label>Upload Invoice</Label>
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
}
