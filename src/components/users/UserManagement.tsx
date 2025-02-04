import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactSelect from 'react-select';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'driver', label: 'Driver' },
  { value: 'manager', label: 'Manager' },
  // Add more roles as needed
];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: null });
  const [newRole, setNewRole] = useState('');

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', role: null });
  };

  const handleCreateRole = () => {
    roles.push({ value: newRole.toLowerCase(), label: newRole });
    setNewRole('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Add User</h2>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Enter user name"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Enter user email"
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <ReactSelect
            value={newUser.role}
            onChange={(selectedOption) => setNewUser({ ...newUser, role: selectedOption })}
            options={roles}
            placeholder="Select role"
            isSearchable
          />
        </div>
        <Button onClick={handleAddUser}>Add User</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Create Role</h2>
        <div className="space-y-2">
          <Label>Role Name</Label>
          <Input
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter role name"
          />
        </div>
        <Button onClick={handleCreateRole}>Create Role</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} ({user.email}) - {user.role?.label}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}