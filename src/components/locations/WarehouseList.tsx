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

interface Warehouse {
  id: string;
  name: string;
  code: string;
  type: string;
  capacity: string;
  manager: string;
  status: "active" | "inactive";
}

const demoWarehouses: Warehouse[] = [
  {
    id: "1",
    name: "Mumbai Central Warehouse",
    code: "MCW001",
    type: "Public",
    capacity: "5000 sq.m",
    manager: "Rahul Shah",
    status: "active",
  },
];

export default function WarehouseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredWarehouses = demoWarehouses.filter((warehouse) =>
    Object.values(warehouse).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search warehouses..."
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
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWarehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell>{warehouse.code}</TableCell>
                <TableCell>{warehouse.type}</TableCell>
                <TableCell>{warehouse.capacity}</TableCell>
                <TableCell>{warehouse.manager}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      warehouse.status === "active" ? "default" : "secondary"
                    }
                  >
                    {warehouse.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/locations/warehouses/${warehouse.id}/edit`)
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
