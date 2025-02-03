import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Car, Users, Wrench } from "lucide-react";

interface FleetMetric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  progress?: number;
}

interface FleetOverviewProps {
  metrics?: FleetMetric[];
}

const defaultMetrics: FleetMetric[] = [
  {
    label: "Active Drivers",
    value: "42",
    icon: <Users className="h-6 w-6 text-blue-500" />,
    change: "+12% from last month",
    progress: 75,
  },
  {
    label: "Active Vehicles",
    value: "38",
    icon: <Car className="h-6 w-6 text-green-500" />,
    change: "+5% from last month",
    progress: 85,
  },
  {
    label: "Maintenance Alerts",
    value: "3",
    icon: <Wrench className="h-6 w-6 text-yellow-500" />,
    change: "-2 from last week",
    progress: 25,
  },
  {
    label: "Critical Issues",
    value: "1",
    icon: <AlertCircle className="h-6 w-6 text-red-500" />,
    change: "No change",
    progress: 10,
  },
];

const FleetOverview: React.FC<FleetOverviewProps> = ({
  metrics = defaultMetrics,
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Fleet Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-gray-50">{metric.icon}</div>
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-500">
                {metric.label}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {metric.value}
              </h3>
              {metric.progress !== undefined && (
                <div className="mt-2">
                  <Progress value={metric.progress} className="h-2" />
                </div>
              )}
              {metric.change && (
                <p className="text-sm text-gray-500 mt-2">{metric.change}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FleetOverview;
