"use client"

import { User } from "@/modules/user/domain/user"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/sections/shared/components/ui/card"
import { Button } from "@/sections/shared/components/ui/button"
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/sections/shared/components/ui/dialog"
import { DialogContent } from "@radix-ui/react-dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/sections/shared/components/ui/tabs"

interface UserDetailsProps {
  user: User
  isOpen: boolean
  onClose: () => void
}

export function UserInListDetails({ user, isOpen, onClose }: UserDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {user && (
          <div className="py-4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {user.id || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Calle Rio Duero 17, Parla, Madrid, Spain
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vehicles</p>
                    <p className="text-sm text-muted-foreground">1</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="vehicles">
              <TabsList className="mb-4">
                <TabsTrigger value="vehicles">Vehicles 1</TabsTrigger>
                <TabsTrigger value="revisions">Revisions 2</TabsTrigger>
              </TabsList>

              {/* <TabsContent value="vehicles">
                {vehicles.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">
                    No vehicles found for this user.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {vehicles.map((vehicle) => (
                      <Card key={vehicle.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                License: {vehicle.license_plate}
                              </p>
                              {vehicle.vin && (
                                <p className="text-sm text-muted-foreground">
                                  VIN: {vehicle.vin}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent> */}

              {/* <TabsContent value="revisions">
                {revisions.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">
                    No revisions found for this user's vehicles.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {revisions.map((revision) => (
                      <Card key={revision.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{revision.type}</h3>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(revision.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Vehicle: {revision.vehicle?.make}{" "}
                                {revision.vehicle?.model} (
                                {revision.vehicle?.license_plate})
                              </p>
                              <p className="text-sm mt-2">
                                {revision.description}
                              </p>
                              <div className="flex gap-4 mt-2">
                                <p className="text-sm">
                                  <span className="font-medium">Mileage:</span>{" "}
                                  {revision.mileage} km
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Cost:</span> $
                                  {revision.cost.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent> */}
            </Tabs>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
