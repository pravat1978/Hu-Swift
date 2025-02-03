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

interface Branch {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  phone: string;
  status: "active" | "inactive";
  facilities: string[];
}

const demoBranches: Branch[] = [
  {
    id: "1",
    name: "Mumbai Central",
    code: "MUM001",
    contactPerson: "Rahul Shah",
    phone: "+91 98765 43210",
    status: "active",
    facilities: ["Parking", "Maintenance"],
  },
];

export default function BranchList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredBranches = demoBranches.filter((branch) =>
    Object.values(branch).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Branches</h1>
        <Button onClick={() => navigate("/organization/branches/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Branch
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search branches..."
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
              <TableHead>Code</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Facilities</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.code}</TableCell>
                <TableCell>{branch.contactPerson}</TableCell>
                <TableCell>{branch.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      branch.status === "active" ? "default" : "secondary"
                    }
                  >
                    {branch.status}
                  </Badge>
                </TableCell>
                <TableCell>{branch.facilities.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/organization/branches/${branch.id}/edit`)
                      }
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
