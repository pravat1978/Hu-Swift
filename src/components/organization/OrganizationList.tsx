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

interface Organization {
  id: string;
  name: string;
  regNumber: string;
  type: string;
  industry: string;
  status: "active" | "inactive";
  subscription: string;
}

const demoOrganizations: Organization[] = [
  {
    id: "1",
    name: "Swift Logistics Ltd",
    regNumber: "REG123456",
    type: "Logistics",
    industry: "Transportation",
    status: "active",
    subscription: "Premium",
  },
];

export default function OrganizationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredOrganizations = demoOrganizations.filter((org) =>
    Object.values(org).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <Button onClick={() => navigate("/organization/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Organization
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
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
              <TableHead>Registration Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.regNumber}</TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{org.industry}</TableCell>
                <TableCell>
                  <Badge
                    variant={org.status === "active" ? "default" : "secondary"}
                  >
                    {org.status}
                  </Badge>
                </TableCell>
                <TableCell>{org.subscription}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/organization/${org.id}/edit`)}
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
