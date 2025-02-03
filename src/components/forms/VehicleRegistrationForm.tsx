import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";

interface VehicleRegistrationFormProps {
  onSubmit?: (data: any) => void;
  initialStep?: number;
}

const VehicleRegistrationForm = ({
  onSubmit = () => {},
  initialStep = 0,
}: VehicleRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [date, setDate] = useState<Date>();

  const steps = [
    "Vehicle Specs",
    "Registration Details",
    "Maintenance History",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-[800px] p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Vehicle Registration
        </h2>
        <p className="text-gray-500">
          Complete the form to register a new vehicle
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600",
                )}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm">{step}</span>
              {index < steps.length - 1 && (
                <div className="w-24 h-[2px] mx-4 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={`step-${currentStep + 1}`} className="w-full">
        <TabsContent value="step-1">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input id="make" placeholder="Vehicle make" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="Vehicle model" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="Manufacturing year"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="Vehicle color" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN Number</Label>
              <Input id="vin" placeholder="Vehicle Identification Number" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="step-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plateNumber">License Plate Number</Label>
                <Input id="plateNumber" placeholder="Enter plate number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationDate">Registration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationAuthority">
                Registration Authority
              </Label>
              <Input
                id="registrationAuthority"
                placeholder="Enter authority name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceDetails">Insurance Details</Label>
              <Textarea
                id="insuranceDetails"
                placeholder="Enter insurance information"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="step-3">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lastService">Last Service Date</Label>
              <Input type="date" id="lastService" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="Enter current mileage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceHistory">Service History</Label>
              <Textarea
                id="serviceHistory"
                placeholder="Enter service history details"
                className="min-h-[150px]"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={() => onSubmit({})}>Submit Registration</Button>
        ) : (
          <Button onClick={handleNext}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default VehicleRegistrationForm;
