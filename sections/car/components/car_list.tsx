"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Eye, Wrench, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/sections/shared/components/ui/table"

import { Button } from "@/sections/shared/components/ui/button"
import { Card, CardContent } from "@/sections/shared/components/ui/card"
import { CreateEditCarForm } from "./create_edit_car_form"
import { Car } from "@/modules/car/domain/car"
import { useCars } from "../hooks/use_cars"

export function CarList({ userId }: { cars: Car[]; userId: string }) {
  const { cars } = useCars(userId)

  const [displayEditCreateModal, setDisplayEditCreateModal] = useState(false)
  const closeModal = () => setDisplayEditCreateModal(false)
  const handleUserCreated = (car: Car) => {
    setDisplayEditCreateModal(false)
  }

  const handleUserUpdated = (car: Car) => {
    setDisplayEditCreateModal(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cars</h2>
        <Button onClick={() => setDisplayEditCreateModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add car
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No cars found.
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">
                      {`${car.make} ${car.model} ${car.year}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => {}}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {}}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {}}>
                          <Wrench className="h-4 w-4" />
                          <span className="sr-only">Add Revision</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {}}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {displayEditCreateModal && (
        <CreateEditCarForm
          userId={userId}
          isOpen={displayEditCreateModal}
          onClose={closeModal}
          onCarCreated={handleUserCreated}
          onCarUpdated={handleUserUpdated}
        />
      )}
    </div>
  )
}
