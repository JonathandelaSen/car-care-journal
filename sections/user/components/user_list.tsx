"use client"

import { useState } from "react"
import { PlusCircle, Pencil, Eye, Car, Wrench, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/sections/shared/components/ui/table"
// import { UserForm } from "./user-form"
// import { UserDetails } from "./user-details"
// import { VehicleForm } from "./vehicle-form"
// import { RevisionForm } from "./revision-form"
// import { DeleteConfirmation } from "./delete-confirmation"
import { Button } from "@/sections/shared/components/ui/button"
import { Card, CardContent } from "@/sections/shared/components/ui/card"
import { User } from "@/modules/user/domain/user"
import { UserInListDetails } from "./user_in_list_details"
import { CreateEditUserForm } from "./create_edit_user_form"
import { useUsers } from "@/sections/user/hooks/use_users"

type ModalType =
  | "create"
  | "edit"
  | "view"
  | "addVehicle"
  | "addRevision"
  | "delete"
  | null

export function UserList({ users: _users }: { users: User[] }) {
  const { users, setUsers, addUser } = useUsers(_users)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalType, setModalType] = useState<ModalType>(null)

  const openModal = (type: ModalType, user?: User) => {
    if (user) setSelectedUser(user)
    setModalType(type)
  }

  const closeModal = () => {
    setModalType(null)
    setSelectedUser(null)
  }

  const handleUserCreated = (newUser: User) => {
    console.log(`User created: user`, newUser)
    setUsers([...users, newUser])
    closeModal()
  }

  const handleUserUpdated = (updatedUser: User) => {
    //addUser(updatedUser)
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    )
    closeModal()
  }

  const handleUserDeleted = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
    closeModal()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <Button onClick={() => openModal("create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vehicles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No users found. Add your first user to get started.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal("view", user)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal("edit", user)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal("addVehicle", user)}
                        >
                          <Car className="h-4 w-4" />
                          <span className="sr-only">Add Vehicle</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal("addRevision", user)}
                        >
                          <Wrench className="h-4 w-4" />
                          <span className="sr-only">Add Revision</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openModal("delete", user)}
                        >
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

      {(modalType === "create" || modalType === "edit") && (
        <CreateEditUserForm
          user={selectedUser}
          isOpen={true}
          onClose={closeModal}
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {modalType === "view" && selectedUser && (
        <UserInListDetails
          user={selectedUser}
          isOpen={true}
          onClose={closeModal}
        />
      )}

      {/*{modalType === "addVehicle" && selectedUser && (
        <VehicleForm
          userId={selectedUser.id}
          isOpen={true}
          onClose={() => {
            closeModal()
            refreshUsers()
          }}
        />
      )}

      {modalType === "addRevision" && selectedUser && (
        <RevisionForm
          userId={selectedUser.id}
          isOpen={true}
          onClose={() => {
            closeModal()
            refreshUsers()
          }}
        />
      )}

      {modalType === "delete" && selectedUser && (
        <DeleteConfirmation
          user={selectedUser}
          isOpen={true}
          onClose={closeModal}
          onConfirm={handleUserDeleted}
        />
      )} */}
    </div>
  )
}
