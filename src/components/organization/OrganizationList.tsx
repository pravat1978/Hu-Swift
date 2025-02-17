import React, { useState, useEffect } from "react";
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

interface Organization {
  id: string;
  organizationName: string;
  companyRegistrationNumber: string;
  type: string;
  industry: string;
  status: "active" | "inactive";
}

export default function OrganizationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://apis.huswift.hutechweb.com/organizations/all?page=1&size=5",
        );
        if (!response.ok) throw new Error("Failed to fetch organizations");
        const result = await response.json();

        // Check if 'data' exists and is an array
        if (Array.isArray(result.data)) {
          const transformedData = result.data.map((item) => {
            const details = item.organizationDetails;
            return {
              id: details.id,
              organizationName: details.organizationName,
              companyRegistrationNumber: details.companyRegistrationNumber,
              type: details.type,
              industry: details.industry,
              status: details.active ? "active" : "inactive",
            };
          });
          setOrganizations(transformedData);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to load organizations");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );

  const filteredOrganizations = organizations.filter((org) =>
    Object.values(org).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate("/organization/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Organization
        </Button>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.organizationName}</TableCell>
                <TableCell>{org.companyRegistrationNumber}</TableCell>
                <TableCell>{org.type}</TableCell>
                <TableCell>{org.industry}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      org.status === "active"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white",
                    )}
                  >
                    {org.status}
                  </Badge>
                </TableCell>
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
