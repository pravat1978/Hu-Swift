import { useState } from "react";
import { Plus, Edit, Power } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; // Ensure this import exists

export default function OrganizationForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branches, setBranches] = useState([
    {
      id: "1",
      name: "Mumbai Central",
      code: "MUM001",
      contactPerson: "Rahul Shah",
      status: "active",
    },
  ]);

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setShowBranchForm(true);
  };

  const handleToggleBranchStatus = (branchId) => {
    setBranches(
      branches.map((branch) =>
        branch.id === branchId
          ? { ...branch, status: branch.status === "active" ? "inactive" : "active" }
          : branch
      )
    );
  };

  const handleSaveBranch = () => {
    setShowBranchForm(false);
    setEditingBranch(null);
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Organization</h1>
        <Button variant="outline" onClick={() => navigate("/organization")}>
          Cancel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="legal">Legal Details</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-6">
          <TabsContent value="branches" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Branch List</h3>
              <Button onClick={() => setShowBranchForm(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Branch
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell>{branch.name}</TableCell>
                      <TableCell>{branch.code}</TableCell>
                      <TableCell>{branch.contactPerson}</TableCell>
                      <TableCell>
                        <Badge variant={branch.status === "active" ? "default" : "secondary"}>
                          {branch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditBranch(branch)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleToggleBranchStatus(branch.id)}>
                            <Power className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
