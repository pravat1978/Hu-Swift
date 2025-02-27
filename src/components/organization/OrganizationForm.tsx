import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function OrganizationForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    type: "",
    industry: "",
    phone: "",
    email: "",
    website: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    gstin: "",
    pan: "",
    incorporationDate: "",
    cin: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = id
        ? `https://apis.huswift.hutechweb.com/organizations/${id}`
        : "https://apis.huswift.hutechweb.com/organizations/create";

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        body: JSON.stringify({
          basicInfo: {
            organizationName: formData.name,
            companyRegistrationNumber: formData.regNumber,
            type: formData.type,
            industry: formData.industry,
            phone: formData.phone,
            email: formData.email,
            website: formData.website,
            orgId: id,
            active: true,
            address: {
              addressLine1: formData.address.addressLine1,
              addressLine2: formData.address.addressLine2,
              city: formData.address.city,
              state: formData.address.state,
              pincode: formData.address.pincode,
              country: formData.address.country,
            },
          },
          legalDetails: {
            gstin: formData.gstin,
            pan: formData.pan,
            incorporationDate: formData.incorporationDate,
            corporateIdentificationNumber: formData.cin,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to save organization");

      const data = await response.json();
      if (data.data?.[0]?.status === "SUCCESS") {
        navigate("/organization");
      } else {
        throw new Error(data.message || "Failed to save organization");
      }
    } catch (error) {
      console.error("Error saving organization:", error);
      setError("Failed to save organization. Please try again.");
    } finally {
      setLoading(false);
    }
    try {
      setLoading(true);
      setError(null);

      const payload = {
        basicInfo: {
          organizationName: formData.name,
          companyRegistrationNumber: formData.regNumber,
          type: formData.type,
          industry: formData.industry,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
          uniqueId: `HS_OG_${Date.now()}`,
          address: {
            addressLine1: formData.address.addressLine1,
            addressLine2: formData.address.addressLine2,
            city: formData.address.city,
            state: formData.address.state,
            pincode: formData.address.pincode,
            country: formData.address.country,
          },
        },
        legalDetails: {
          gstin: formData.gstin,
          pan: formData.pan,
          incorporationDate: formData.incorporationDate,
          corporateIdentificationNumber: formData.cin,
        },
      };

      const response = await fetch(
        "https://apis.huswift.hutechweb.com/organizations/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Failed to create organization");

      navigate("/organization");
    } catch (err) {
      console.error("Error creating organization:", err);
      setError("Failed to create organization. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="legal">Legal Details</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input
                  placeholder="Enter organization name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Company Registration Number</Label>
                <Input
                  placeholder="Enter company registration number"
                  value={formData.regNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, regNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  placeholder="Enter industry"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  placeholder="Enter website URL"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2 space-y-4">
                <h3 className="font-medium">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address Line 1</Label>
                    <Input
                      placeholder="Enter address line 1"
                      value={formData.address.addressLine1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            addressLine1: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 2</Label>
                    <Input
                      placeholder="Enter address line 2"
                      value={formData.address.addressLine2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            addressLine2: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Enter city"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      placeholder="Enter state"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input
                      placeholder="Enter pincode"
                      value={formData.address.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            pincode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value="India" disabled />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GSTIN</Label>
                <Input
                  placeholder="Enter GSTIN"
                  value={formData.gstin}
                  onChange={(e) =>
                    setFormData({ ...formData, gstin: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>PAN</Label>
                <Input
                  placeholder="Enter PAN"
                  value={formData.pan}
                  onChange={(e) =>
                    setFormData({ ...formData, pan: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Incorporation Date</Label>
                <Input
                  type="date"
                  value={formData.incorporationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      incorporationDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Corporate Identification Number</Label>
                <Input
                  placeholder="Enter CIN"
                  value={formData.cin}
                  onChange={(e) =>
                    setFormData({ ...formData, cin: e.target.value })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
      )}

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/organization")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Organization"}
        </Button>
      </div>
    </div>
  );
}
