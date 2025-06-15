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
import { useCars } from "@/sections/car/hooks/use_cars"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/sections/shared/components/ui/table"

interface UserDetailsProps {
  user: User
  isOpen: boolean
  onClose: () => void
}

export function UserInListDetails({ user, isOpen, onClose }: UserDetailsProps) {
  const { cars, setCars, addCar } = useCars(user.id)

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

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Car</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cars.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-10 text-muted-foreground"
                          >
                            No cars.
                          </TableCell>
                        </TableRow>
                      ) : (
                        cars.map((car) => (
                          <TableRow key={car.id}>
                            <TableCell className="font-medium">
                              {car.year} {car.make} {car.model}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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
