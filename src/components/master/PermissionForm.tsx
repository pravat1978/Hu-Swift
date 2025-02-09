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
import { useNavigate } from "react-router-dom";

const modules = [
  "Drivers",
  "Vehicles",
  "Organizations",
  "Warehouses",
  "Fleet Yards",
  "Users",
];

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export default function PermissionForm() {
  const navigate = useNavigate();
  const [permission, setPermission] = useState({
    name: "",
    url: "",
    methods: [] as string[],
    module: "",
  });

  const handleSubmit = () => {
    console.log("Saving permission:", permission);
    navigate("/master/permissions");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Permission</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/master/permissions")}
        >
          Cancel
        </Button>
      </div>

      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Permission Name</Label>
            <Input
              placeholder="Enter permission name"
              value={permission.name}
              onChange={(e) =>
                setPermission({ ...permission, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Module</Label>
            <Select
              value={permission.module}
              onValueChange={(value) =>
                setPermission({ ...permission, module: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module} value={module}>
                    {module}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>API URL</Label>
            <Input
              placeholder="Enter API URL (e.g., /api/drivers)"
              value={permission.url}
              onChange={(e) =>
                setPermission({ ...permission, url: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>HTTP Methods</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {methods.map((method) => (
                <div className="flex items-center space-x-2" key={method}>
                  <Checkbox
                    id={method}
                    checked={permission.methods.includes(method)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPermission({
                          ...permission,
                          methods: [...permission.methods, method],
                        });
                      } else {
                        setPermission({
                          ...permission,
                          methods: permission.methods.filter(
                            (m) => m !== method,
                          ),
                        });
                      }
                    }}
                  />
                  <Label
                    htmlFor={method}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {method}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate("/master/permissions")}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Permission</Button>
      </div>
    </div>
  );
}
