"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@/modules/user/domain/user"
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

const createEditUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

type UserFormValues = z.infer<typeof createEditUserSchema>

interface UserFormProps {
  user?: User | null
  isOpen: boolean
  onClose: () => void
  onUserCreated?: (user: User) => void
  onUserUpdated?: (user: User) => void
}

export function CreateEditUserForm({
  user,
  isOpen,
  onClose,
  onUserCreated,
  onUserUpdated,
}: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!user

  const form = useForm<UserFormValues>({
    resolver: zodResolver(createEditUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  })

  const onSubmit = async (values: UserFormValues) => {
    // setIsSubmitting(true)
    // try {
    //   if (isEditing && user) {
    //     // Update existing user
    //     const { data, error } = await supabase
    //       .from("users")
    //       .update(values)
    //       .eq("id", user.id)
    //       .select()
    //       .single()
    //     if (error) throw error
    //     onUserUpdated?.({
    //       ...data,
    //       vehiclesCount: user.vehiclesCount,
    //     })
    //   } else {
    //     // Create new user
    //     const { data, error } = await supabase
    //       .from("users")
    //       .insert(values)
    //       .select()
    //       .single()
    //     if (error) throw error
    //     onUserCreated?.({
    //       ...data,
    //       vehiclesCount: 0,
    //     })
    //   }
    // } catch (error) {
    //   console.error("Error saving user:", error)
    //   // You could add toast notifications here
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Main St, City, Country"
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
                    : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
