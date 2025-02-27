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
  organizationName: string | null;
  companyRegistrationNumber: string | null;
  type: string;
  industry: string;
  status: "active" | "inactive";
}

export default function OrganizationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizations(currentPage);
  }, [currentPage]);

  const fetchOrganizations = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://apis.huswift.hutechweb.com/organizations/all?page=${page}&size=5&sort=desc`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        },
      );

      if (response.status === 404) {
        // If the status is 404, set empty organizations
        setOrganizations([]);
        setTotalPages(1);
        setTotalRecords(0);
        setError(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const data = await response.json();

      // Handle empty data gracefully
      if (Array.isArray(data.data)) {
        const transformedData = data.data.map((item) => {
          const details = item.organizationDetails;
          return {
            id: details.id,
            organizationName: details.organizationName,
            companyRegistrationNumber: details.companyRegistrationNumber,
            type: details.type,
            industry: details.industry,
            status: details.status ? details.status : "inactive", // Assuming status is optional
          };
        });
        setOrganizations(transformedData);
        setTotalPages(data.totalPages || 1); // Use the correct field for totalPages
        setTotalRecords(data.totalRecords || 0); // Use the correct field for totalRecords
      } else {
        throw new Error("Unexpected response structure");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching organizations:", err);
      setError("Failed to fetch organizations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrganizations = organizations.filter((org) =>
    Object.values(org).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOrganizations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm
                    ? "No organizations found matching your search"
                    : "No organizations added yet"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.organizationName || "N/A"}</TableCell>
                  <TableCell>
                    {org.companyRegistrationNumber || "N/A"}
                  </TableCell>
                  <TableCell>{org.type || "N/A"}</TableCell>
                  <TableCell>{org.industry || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        org.status?.toLowerCase() === "active"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white",
                      )}
                    >
                      {org.status?.toUpperCase() || "INACTIVE"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          try {
                            const response = await fetch(
                              `https://apis.huswift.hutechweb.com/organizations/${org.id}`,
                              {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                },
                                mode: "cors",
                              },
                            );

                            if (!response.ok)
                              throw new Error("Failed to fetch organization");

                            const data = await response.json();

                            // Navigate to edit page with the organization data
                            navigate(`/organization/${org.id}/edit`, {
                              state: {
                                organizationData: data,
                              },
                            });
                          } catch (error) {
                            console.error(
                              "Error fetching organization:",
                              error,
                            );
                            setError("Failed to fetch organization details");
                          }
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => console.log("Toggle status")}
                        className={cn(
                          org.status === "active"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white",
                        )}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>
        <span className="flex items-center px-4 text-sm text-gray-600">
          Page {currentPage} of {totalPages} ({totalRecords} total records)
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
