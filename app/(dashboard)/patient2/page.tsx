"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Trash2, Edit, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Patient {
  id: number
  nombre: string
  apellido: string
  cedula: string
  fechaDeNacimiento: Date
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    nombre: '',
    apellido: '',
    cedula: '',
    fechaDeNacimiento: new Date(),
  })
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const addPatient = () => {
    if (isValidPatient(newPatient)) {
      setPatients([...patients, { ...newPatient, id: Date.now() }])
      setNewPatient({
        nombre: '',
        apellido: '',
        cedula: '',
        fechaDeNacimiento: new Date(),
      })
      setIsAddModalOpen(false)
    }
  }

  const updatePatient = () => {
    if (editingPatient && isValidPatient(editingPatient)) {
      setPatients(patients.map(patient => patient.id === editingPatient.id ? editingPatient : patient))
      setEditingPatient(null)
      setIsEditModalOpen(false)
    }
  }

  const deletePatient = () => {
    if (deletingPatient) {
      setPatients(patients.filter(patient => patient.id !== deletingPatient.id))
      setDeletingPatient(null)
      setIsDeleteModalOpen(false)
    }
  }

  const isValidPatient = (patient: Omit<Patient, 'id'>) => {
    return (
      patient.nombre.trim() !== '' && patient.nombre.length <= 50 &&
      patient.apellido.trim() !== '' && patient.apellido.length <= 50 &&
      patient.cedula.trim() !== '' && patient.cedula.length <= 50
    )
  }

  const PatientForm = ({ patient, setPatient }: { patient: Omit<Patient, 'id'>, setPatient: (patient: Omit<Patient, 'id'>) => void }) => (
    <div className="space-y-4">
      <Input
        value={patient.nombre}
        onChange={(e) => setPatient({ ...patient, nombre: e.target.value })}
        placeholder="Nombre"
        maxLength={50}
      />
      <Input
        value={patient.apellido}
        onChange={(e) => setPatient({ ...patient, apellido: e.target.value })}
        placeholder="Apellido"
        maxLength={50}
      />
      <Input
        value={patient.cedula}
        onChange={(e) => setPatient({ ...patient, cedula: e.target.value })}
        placeholder="Cédula"
        maxLength={50}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !patient.fechaDeNacimiento && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {patient.fechaDeNacimiento ? format(patient.fechaDeNacimiento, "PPP") : <span>Fecha de Nacimiento</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={patient.fechaDeNacimiento}
            onSelect={(date) => date && setPatient({ ...patient, fechaDeNacimiento: date })}
          />
        </PopoverContent>
      </Popover>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Paciente Mantenimiento</h1>
      <Button onClick={() => setIsAddModalOpen(true)} className="mb-4">
        Add Patient
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map(patient => (
          <div key={patient.id} className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold">{patient.nombre} {patient.apellido}</h2>
            <p>Cédula: {patient.cedula}</p>
            <p>Fecha de Nacimiento: {format(patient.fechaDeNacimiento, "PPP")}</p>
            <div className="mt-2">
              <Button variant="ghost" size="icon" onClick={() => {
                setEditingPatient(patient)
                setIsEditModalOpen(true)
              }}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {
                setDeletingPatient(patient)
                setIsDeleteModalOpen(true)
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <PatientForm patient={newPatient} setPatient={setNewPatient} />
          <DialogFooter>
            <Button onClick={addPatient}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          {editingPatient && (
            <PatientForm
              patient={editingPatient}
              setPatient={(updatedPatient) => setEditingPatient({ ...editingPatient, ...updatedPatient })}
            />
          )}
          <DialogFooter>
            <Button onClick={updatePatient}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Patient Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this patient?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={deletePatient}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}