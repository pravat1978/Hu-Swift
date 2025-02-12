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

interface FleetYard {
  id: string;
  name: string;
  code: string;
  location: string;
  capacity: string;
  manager: string;
  status: "active" | "inactive";
}

const demoFleetYards: FleetYard[] = [
  {
    id: "1",
    name: "Mumbai Central Fleet Yard",
    code: "MCF001",
    location: "Mumbai, Maharashtra",
    capacity: "100 vehicles",
    manager: "Rahul Shah",
    status: "active",
  },
];

export default function FleetYardList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFleetYards = demoFleetYards.filter((yard) =>
    Object.values(yard).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fleet yards..."
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
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFleetYards.map((yard) => (
              <TableRow key={yard.id}>
                <TableCell>{yard.name}</TableCell>
                <TableCell>{yard.code}</TableCell>
                <TableCell>{yard.location}</TableCell>
                <TableCell>{yard.capacity}</TableCell>
                <TableCell>{yard.manager}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      yard.status === "active"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white",
                    )}
                  >
                    {yard.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/locations/fleet-yards/${yard.id}/edit`)
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
