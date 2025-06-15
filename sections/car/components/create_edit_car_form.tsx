"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Car } from "@/modules/car/domain/car"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/sections/shared/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/sections/shared/components/ui/form"

import { Input } from "@/sections/shared/components/ui/input"
import { Button } from "@/sections/shared/components/ui/button"
import { Textarea } from "@/sections/shared/components/ui/textarea"
import { useAddCars } from "../hooks/use_add_car"

const createEditCarSchema = z.object({
  make: z.string().min(2, { message: "Make must be at least 2 characters" }),
  model: z.string().min(1, { message: "Model is required" }),
  year: z.coerce.number().int().gte(1886, { message: "Enter a valid year" }),
  description: z.string().optional(),
})

type CarFormValues = z.infer<typeof createEditCarSchema>

interface CarFormProps {
  userId: string
  car?: Car | null
  isOpen: boolean
  onClose: () => void
  onCarCreated?: (car: Car) => void
  onCarUpdated?: (car: Car) => void
}

export function CreateEditCarForm({
  userId,
  car,
  isOpen,
  onClose,
  onCarCreated,
  onCarUpdated,
}: CarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!car
  const { addNewCar } = useAddCars()

  const form = useForm<CarFormValues>({
    resolver: zodResolver(createEditCarSchema),
    defaultValues: {
      make: car?.make || "",
      model: car?.model || "",
      year: car?.year || new Date().getFullYear(),
      description: car?.description || "",
    },
  })

  const onSubmit = async (values: CarFormValues) => {
    console.log("Form submitted with values:", values)
    setIsSubmitting(true)
    try {
      if (isEditing && car) {
        onCarUpdated?.({
          ...car,
          make: values.make,
          model: values.model,
          year: values.year,
          description: values.description,
          updatedAt: new Date(),
        })
      } else {
        addNewCar({
          id: "new-id",
          make: values.make,
          model: values.model,
          year: values.year,
          description: values.description,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: userId,
        })
        onCarCreated?.({
          id: "new-id",
          make: values.make,
          model: values.model,
          year: values.year,
          description: values.description,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: "owner-id-placeholder",
        })
      }
    } catch (error) {
      console.error("Error saving car:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Car" : "Add New Car"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Corolla" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add details about the car..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Car"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
