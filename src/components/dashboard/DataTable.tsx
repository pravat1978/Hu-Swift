import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SortAsc, SortDesc } from "lucide-react";

interface DataTableProps {
  data?: Array<{
    id: string;
    name: string;
    status: "active" | "inactive";
    type: "driver" | "vehicle";
    lastUpdated: string;
  }>;
  type?: "driver" | "vehicle";
}

const DataTable = ({
  data = [
    {
      id: "1",
      name: "John Doe",
      status: "active",
      type: "driver",
      lastUpdated: "2024-03-20",
    },
    {
      id: "2",
      name: "Toyota Camry",
      status: "inactive",
      type: "vehicle",
      lastUpdated: "2024-03-19",
    },
    {
      id: "3",
      name: "Jane Smith",
      status: "active",
      type: "driver",
      lastUpdated: "2024-03-18",
    },
  ],
  type = "driver",
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = data
    .filter((item) => item.type === type)
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder={`Search ${type}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSort}
          className="flex items-center gap-2"
        >
          Sort by Name
          {sortDirection === "asc" ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "active" ? "default" : "secondary"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  No {type}s found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
