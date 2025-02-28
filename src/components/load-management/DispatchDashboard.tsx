import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Truck, Package, MapPin, Calendar, User } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface OrderLineItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paymentStatus: string;
  warehouseId: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  orderLineItems: OrderLineItem[];
  selected?: boolean;
}

interface Vehicle {
  id: string;
  type: string;
  capacity: number;
  status: "available" | "assigned" | "maintenance";
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  driver?: {
    id: string;
    name: string;
  };
}

interface Trip {
  id: string;
  orders: Order[];
  vehicle?: Vehicle;
  status: "planning" | "assigned" | "in_transit" | "completed";
  totalWeight: number;
  eta?: string;
}

// Sample data
const demoOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "00005",
    orderDate: "2025-02-20T10:30:00",
    deliveryDate: "2025-02-20T10:30:00",
    totalAmount: 5000,
    paymentStatus: "PAID",
    warehouseId: "500001",
    geoLocation: {
      latitude: 17.385,
      longitude: 78.4867,
    },
    orderLineItems: [
      {
        productId: "P005",
        productName: "TV",
        quantity: 1,
        unitPrice: 45000.5,
        totalPrice: 45000.5,
      },
      {
        productId: "P006",
        productName: "Remote",
        quantity: 2,
        unitPrice: 500.0,
        totalPrice: 1000.0,
      },
    ],
  },
  {
    id: "ORD002",
    customerName: "00007",
    orderDate: "2025-02-21T11:30:00",
    deliveryDate: "2025-02-22T14:30:00",
    totalAmount: 7500,
    paymentStatus: "PENDING",
    warehouseId: "500001",
    geoLocation: {
      latitude: 17.385,
      longitude: 78.4867,
    },
    orderLineItems: [
      {
        productId: "P007",
        productName: "Refrigerator",
        quantity: 1,
        unitPrice: 35000.0,
        totalPrice: 35000.0,
      },
    ],
  },
  {
    id: "ORD003",
    customerName: "00010",
    orderDate: "2025-02-22T09:15:00",
    deliveryDate: "2025-02-23T13:00:00",
    totalAmount: 12000,
    paymentStatus: "PAID",
    warehouseId: "500002",
    geoLocation: {
      latitude: 17.4,
      longitude: 78.5,
    },
    orderLineItems: [
      {
        productId: "P008",
        productName: "Washing Machine",
        quantity: 1,
        unitPrice: 28000.0,
        totalPrice: 28000.0,
      },
      {
        productId: "P009",
        productName: "Microwave",
        quantity: 1,
        unitPrice: 15000.0,
        totalPrice: 15000.0,
      },
    ],
  },
];

const demoVehicles: Vehicle[] = [
  {
    id: "V001",
    type: "Small Truck",
    capacity: 1000,
    status: "available",
    currentLocation: {
      latitude: 17.385,
      longitude: 78.487,
    },
    driver: {
      id: "D001",
      name: "John Doe",
    },
  },
  {
    id: "V002",
    type: "Medium Truck",
    capacity: 3000,
    status: "available",
    currentLocation: {
      latitude: 17.395,
      longitude: 78.492,
    },
    driver: {
      id: "D002",
      name: "Jane Smith",
    },
  },
  {
    id: "V003",
    type: "Large Truck",
    capacity: 5000,
    status: "maintenance",
    currentLocation: {
      latitude: 17.375,
      longitude: 78.477,
    },
  },
];

// Helper function to calculate volumetric weight (simplified)
const calculateWeight = (order: Order): number => {
  // Simplified weight calculation
  return order.orderLineItems.reduce((total, item) => {
    // Assign weights based on product name (simplified)
    let weight = 0;
    if (item.productName.includes("TV")) weight = 25 * item.quantity;
    else if (item.productName.includes("Remote")) weight = 0.5 * item.quantity;
    else if (item.productName.includes("Refrigerator"))
      weight = 80 * item.quantity;
    else if (item.productName.includes("Washing")) weight = 60 * item.quantity;
    else if (item.productName.includes("Microwave"))
      weight = 15 * item.quantity;
    else weight = 10 * item.quantity; // Default weight

    return total + weight;
  }, 0);
};

export default function DispatchDashboard() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles);
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "TRIP001",
      orders: [],
      status: "planning",
      totalWeight: 0,
    },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle drag end event
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Handle order to trip drag
    if (
      source.droppableId === "orders" &&
      destination.droppableId.startsWith("trip-")
    ) {
      const tripId = destination.droppableId.replace("trip-", "");
      const orderToMove = orders.find((order) => order.id === draggableId);

      if (orderToMove) {
        // Create a copy of the order to move
        const orderCopy = { ...orderToMove };

        // Add order to trip
        setTrips((prevTrips) =>
          prevTrips.map((trip) => {
            if (trip.id === tripId) {
              const updatedOrders = [...trip.orders, orderCopy];
              const totalWeight = updatedOrders.reduce(
                (sum, order) => sum + calculateWeight(order),
                0,
              );
              return {
                ...trip,
                orders: updatedOrders,
                totalWeight,
              };
            }
            return trip;
          }),
        );
      }
    }

    // Handle vehicle to trip drag
    if (
      source.droppableId === "vehicles" &&
      destination.droppableId.startsWith("trip-")
    ) {
      const tripId = destination.droppableId.replace("trip-", "");
      const trip = trips.find((t) => t.id === tripId);
      const vehicleId = draggableId;
      const vehicle = vehicles.find((v) => v.id === vehicleId);

      if (trip && vehicle) {
        // Check if vehicle has enough capacity
        if (vehicle.capacity < trip.totalWeight) {
          alert(
            `Vehicle ${vehicle.id} doesn't have enough capacity for this trip!`,
          );
          return;
        }

        // Assign vehicle to trip
        setTrips((prevTrips) =>
          prevTrips.map((t) => {
            if (t.id === tripId) {
              return {
                ...t,
                vehicle,
                status: "assigned",
              };
            }
            return t;
          }),
        );

        // Update vehicle status
        setVehicles((prevVehicles) =>
          prevVehicles.map((v) => {
            if (v.id === vehicleId) {
              return {
                ...v,
                status: "assigned",
              };
            }
            return v;
          }),
        );
      }
    }
  };

  // Create a new trip
  const createNewTrip = () => {
    const newTripId = `TRIP${trips.length + 1}`.padStart(7, "0");
    setTrips([
      ...trips,
      {
        id: newTripId,
        orders: [],
        status: "planning",
        totalWeight: 0,
      },
    ]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
        {/* Orders Panel */}
        <div className="col-span-3 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-2">Orders</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Droppable droppableId="orders">
            {(provided) => (
              <div
                className="flex-1 overflow-auto p-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredOrders.length === 0 ? (
                  <div className="text-center text-gray-500 mt-4">
                    {searchTerm ? "No orders found" : "No orders available"}
                  </div>
                ) : (
                  filteredOrders.map((order, index) => (
                    <Draggable
                      key={order.id}
                      draggableId={order.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-2 rounded-lg border ${snapshot.isDragging ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{order.id}</h3>
                              <p className="text-sm text-gray-500">
                                {order.customerName}
                              </p>
                            </div>
                            <Badge
                              className={`${order.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                            >
                              {order.paymentStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              Due:{" "}
                              {new Date(
                                order.deliveryDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Package className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {order.orderLineItems.length} items ·{" "}
                              {calculateWeight(order).toFixed(1)} kg
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>Warehouse: {order.warehouseId}</span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Trips Panel */}
        <div className="col-span-5 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Trips</h2>
            <Button onClick={createNewTrip} size="sm">
              Create New Trip
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {trips.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                No trips created yet
              </div>
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => (
                  <Card key={trip.id} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-medium">{trip.id}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {trip.orders.length} orders ·{" "}
                            {trip.totalWeight.toFixed(1)} kg
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          trip.status === "planning"
                            ? "bg-blue-500"
                            : trip.status === "assigned"
                              ? "bg-purple-500"
                              : trip.status === "in_transit"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        } text-white`}
                      >
                        {trip.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>

                    {trip.vehicle && (
                      <div className="mb-3 p-2 bg-blue-50 rounded-md">
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 text-blue-500 mr-2" />
                          <div>
                            <p className="font-medium text-sm">
                              {trip.vehicle.type} ({trip.vehicle.id})
                            </p>
                            {trip.vehicle.driver && (
                              <p className="text-xs text-gray-600">
                                Driver: {trip.vehicle.driver.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <Droppable droppableId={`trip-${trip.id}`}>
                      {(provided, snapshot) => (
                        <div
                          className={`border rounded-md p-2 min-h-[100px] ${snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"}`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {trip.orders.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">
                              Drag orders here
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {trip.orders.map((order, index) => (
                                <Draggable
                                  key={`${trip.id}-${order.id}`}
                                  draggableId={`${trip.id}-${order.id}`}
                                  index={index}
                                  isDragDisabled={true}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="p-2 bg-white rounded border"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="font-medium text-sm">
                                            {order.id}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {order.customerName}
                                          </p>
                                        </div>
                                        <p className="text-xs">
                                          {calculateWeight(order).toFixed(1)} kg
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    <div className="mt-3 flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedTrip(trip)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Vehicles Panel */}
        <div className="col-span-4 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Vehicles</h2>
          </div>

          <Droppable droppableId="vehicles">
            {(provided) => (
              <div
                className="flex-1 overflow-auto p-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {vehicles.map((vehicle, index) => (
                  <Draggable
                    key={vehicle.id}
                    draggableId={vehicle.id}
                    index={index}
                    isDragDisabled={vehicle.status !== "available"}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 mb-3 rounded-lg border ${snapshot.isDragging ? "bg-blue-50 border-blue-200" : "bg-white"} ${vehicle.status === "maintenance" ? "opacity-60" : ""}`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{vehicle.type}</h3>
                            <p className="text-sm text-gray-500">
                              {vehicle.id}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              vehicle.status === "available"
                                ? "bg-green-500"
                                : vehicle.status === "assigned"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                            } text-white`}
                          >
                            {vehicle.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Truck className="h-3.5 w-3.5 mr-1" />
                          <span>Capacity: {vehicle.capacity} kg</span>
                        </div>
                        {vehicle.driver && (
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <User className="h-3.5 w-3.5 mr-1" />
                            <span>Driver: {vehicle.driver.name}</span>
                          </div>
                        )}
                        {vehicle.currentLocation && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>
                              Location:{" "}
                              {vehicle.currentLocation.latitude.toFixed(4)},{" "}
                              {vehicle.currentLocation.longitude.toFixed(4)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {selectedVehicle && (
            <div className="p-4 border-t">
              <h3 className="font-medium mb-2">Vehicle Details</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">ID:</span> {selectedVehicle.id}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {selectedVehicle.type}
                </p>
                <p>
                  <span className="font-medium">Capacity:</span>{" "}
                  {selectedVehicle.capacity} kg
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {selectedVehicle.status}
                </p>
                {selectedVehicle.driver && (
                  <p>
                    <span className="font-medium">Driver:</span>{" "}
                    {selectedVehicle.driver.name}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedVehicle(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}
