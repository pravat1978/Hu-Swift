import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img src="/huswift-logo.svg" alt="HuSwift" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to HuSwift</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <LogIn className="w-4 h-4 mr-2" /> Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-500">
            Demo credentials:
            <br />
            Email: admin@huswift.com
            <br />
            Password: demo123
          </p>
        </div>
      </Card>
    </div>
  );
}
