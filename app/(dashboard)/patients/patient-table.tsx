'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Product } from '../product';
// import { SelectProduct } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientFormDTO } from "@/lib/models";
import { useState } from "react";
import PatientForm from "./patient-form";

export function PatientTable({
  items,
  offset,
  total
}: {
  items: any[];
  offset: number;
  total: number;
}) {
  let router = useRouter();
  let itemPerPage = 5;

  const [editingPatient, setEditingPatient] = useState<PatientFormDTO | null>(null)
  const [deletingPatient, setDeletingPatient] = useState<PatientFormDTO | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)


  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  function addPatient(){

  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle>Pacientes</CardTitle>
        <CardDescription>
          Maneja tus pacientes en este form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setIsAddModalOpen(true)}>Agregar paciente</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cedula</TableHead>
              <TableHead className="hidden md:table-cell">Fecha de nacimiento</TableHead>
              <TableHead className="hidden md:table-cell">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((record) => (
              <TableRow>
                <TableCell className="font-medium">{record.first_name} {record.last_name}</TableCell>
                <TableCell className="font-medium">{record.email}</TableCell>
                <TableCell className="hidden md:table-cell">{record.identification_number}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {record.birthday.toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>
                        <form action={() => {setEditingPatient(record); setIsEditModalOpen(true)}}>
                          <button type="submit">Editar</button>
                        </form>

                        <form action={() => console.log('eliminar')}>
                          <button type="submit">Eliminar</button>
                        </form>

                        <form action={() => {setEditingPatient(record); setIsEditModalOpen(true)}}>
                          <button type="submit" ><a>Imagenes</a></button>
                        </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - itemPerPage, total) + 1}-{offset}
            </strong>{' '}
            of <strong>{total}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === itemPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + itemPerPage > total}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar paciente</DialogTitle>
          </DialogHeader>
          {/* <PatientForm patient={newPatient} setPatient={setNewPatient} /> */}
          <PatientForm record={null} />
          <DialogFooter>
            <Button onClick={addPatient}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar paciente</DialogTitle>
          </DialogHeader>
          {/* <PatientForm patient={newPatient} setPatient={setNewPatient} /> */}
          <PatientForm record={editingPatient} />
          <DialogFooter>
            <Button onClick={addPatient}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
