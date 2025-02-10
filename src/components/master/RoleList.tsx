import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  status: "active" | "inactive";
}

const demoRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    permissions: ["All"],
    status: "active",
  },
  {
    id: "2",
    name: "Driver Manager",
    description: "Manage drivers and their assignments",
    permissions: ["View Drivers", "Manage Drivers", "View Vehicles"],
    status: "active",
  },
];

export default function RoleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredRoles = demoRoles.filter((role) =>
    Object.values(role).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Button onClick={() => navigate("/master/roles/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Role
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>

                <Badge
                    className={cn(
                      role.status === "active"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white",
                    )}
                  >
                    {role.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/master/roles/${role.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log("Toggle status")}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
