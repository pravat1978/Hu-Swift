import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Upload, User, Car, FileCheck } from "lucide-react";

interface DriverOnboardingFormProps {
  onSubmit?: (data: any) => void;
  defaultValues?: any;
}

const DriverOnboardingForm = ({
  onSubmit = () => {},
  defaultValues = {},
}: DriverOnboardingFormProps) => {
  const [activeStep, setActiveStep] = useState("personal");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      licenseNumber: "DL123456",
      licenseExpiry: "2025-12-31",
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Driver Onboarding</h1>

      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="license" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            License Details
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TabsContent value="personal">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={() => setActiveStep("license")}>
                  Next
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="license">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input id="licenseNumber" {...register("licenseNumber")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    {...register("licenseExpiry")}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep("personal")}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveStep("documents")}
                >
                  Next
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your license scan here, or click to select
                    files
                  </p>
                  <Input type="file" className="hidden" id="license-upload" />
                  <Button type="button" variant="outline" className="mt-4">
                    Upload License Scan
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Drag and drop additional documents here, or click to select
                    files
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="documents-upload"
                    multiple
                  />
                  <Button type="button" variant="outline" className="mt-4">
                    Upload Additional Documents
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep("license")}
                >
                  Previous
                </Button>
                <Button type="submit">Complete Onboarding</Button>
              </div>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
};

export default DriverOnboardingForm;
