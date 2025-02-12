import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface Permission {
  id: string;
  name: string;
  module: string;
}

const demoPermissions: Permission[] = [
  { id: "1", name: "View Drivers", module: "Drivers" },
  { id: "2", name: "Create Driver", module: "Drivers" },
  { id: "3", name: "Edit Driver", module: "Drivers" },
  { id: "4", name: "View Vehicles", module: "Vehicles" },
  { id: "5", name: "Create Vehicle", module: "Vehicles" },
  { id: "6", name: "Edit Vehicle", module: "Vehicles" },
];

export default function RoleForm() {
  const navigate = useNavigate();
  const [role, setRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  // Group permissions by module
  const groupedPermissions = demoPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  const handleSubmit = () => {
    console.log("Saving role:", role);
    navigate("/master/roles");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Role Name</Label>
            <Input
              placeholder="Enter role name"
              value={role.name}
              onChange={(e) => setRole({ ...role, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter role description"
              value={role.description}
              onChange={(e) =>
                setRole({ ...role, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            {Object.entries(groupedPermissions).map(([module, permissions]) => (
              <div key={module} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  {module}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={role.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setRole({
                              ...role,
                              permissions: [...role.permissions, permission.id],
                            });
                          } else {
                            setRole({
                              ...role,
                              permissions: role.permissions.filter(
                                (id) => id !== permission.id,
                              ),
                            });
                          }
                        }}
                      />
                      <Label
                        htmlFor={permission.id}
                        className="text-sm font-medium leading-none"
                      >
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/master/roles")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Role</Button>
      </div>
    </div>
  );
}
