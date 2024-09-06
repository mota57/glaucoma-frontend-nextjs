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
import { PatientDTO, PatientFormDTO } from "@/lib/models";
import { useEffect, useState } from "react";
import PatientForm from "./patient-form";
import axios from "axios";
import { API_URL } from "@/lib/settings";
import { AppStorage } from "@/lib/app.storage";

export function PatientTable() {
  let offset = 0
  let total = 100;

  let user = AppStorage.getUserData();
  let router = useRouter();
  let itemPerPage = 5;

  const [editingPatient, setEditingPatient] = useState<any>(null)
  const [deletingPatient, setDeletingPatient] = useState<PatientFormDTO | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [items, setItems] = useState<PatientDTO[]>([]);  // State to hold the table data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setError] = useState<String>(''); // Error state

  useEffect(() => {
    // Fetch data when component mounts
    (async () => {
      await fetchPatient();
    })();

  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  async function fetchPatient() {
      try {
        const response = await axios.get(API_URL + '/patient/list/' + user.id);
        setItems(response.data);  // Store fetched data
      } catch (err) {
        setError('Failed to load data');  // Handle error
      } finally {
        setIsLoading(false);  // Set loading to false after data fetch or error
      }

  }


  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  function goToFiles(patient_id:any) {
    router.push('/patients/files?patient_id='+patient_id);
  }

  function onCreateSuccess() {
    setIsAddModalOpen(false);
    fetchPatient();
  }

  function onEditSuccess() {
    setIsEditModalOpen(false);
    fetchPatient();
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

          {
            isLoading ? (<p> is Loading </p>) :
              isError ? (<p> An error occured when loading the data</p>) :

                (<Table>
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
                    {items.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.first_name} {record.last_name}</TableCell>
                        <TableCell className="font-medium">{record.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{record.identification_number}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {record.birthday.toString()}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => { setEditingPatient(record); setIsEditModalOpen(true) }}>Editar</Button>
                          <Button style={{marginLeft:'10px'}} onClick={() => { goToFiles(record.user_account_id) }}>Imagenes</Button>
                          <Button style={{marginLeft:'10px'}} className="bg-destructive" onClick={() => { window.alert('todo') }}>Eliminar</Button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>)

          }
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
          <PatientForm record={null} onSuccess={onCreateSuccess} patient_id={0} />
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar paciente</DialogTitle>
          </DialogHeader>
          <PatientForm record={editingPatient} onSuccess={onEditSuccess} patient_id={editingPatient?.user_account_id || 0} />
          <DialogFooter>
            {/* <Button onClick={addPatient}>Guardar</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
