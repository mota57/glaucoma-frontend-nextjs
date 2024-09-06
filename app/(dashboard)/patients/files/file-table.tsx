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
// import { SelectProduct } from '@/lib/db';
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientDTO, PatientFileDTO } from "@/lib/models";
import { useEffect, useState } from "react";
import FileForm from "./file-form";
import { GLAUCOMA_API_S3_DOMAIN } from "@/lib/settings";
import { apiSecure } from "@/lib/utils";

export function FileTable() {
  const searchParams = useSearchParams()

  const patient_id = searchParams.get('patient_id')
  console.log(patient_id)

  let offset = 0;
  let total = 0;

  let itemPerPage = 100;
  const [items, setItems] = useState<any[]>([])
  const [editingFile, setEditingFile] = useState<PatientFileDTO | null>(null)
  const [deletingFile, setDeletingFile] = useState<PatientFileDTO | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    // Fetch data when component mounts
    (async () => {
      await fetchData();
    })();

  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  async function fetchData() {
    try {
      const response = await apiSecure.get('/patient/list_patient_files/?patient_id=' + patient_id);
      setItems(response.data);  // Store fetched data
    } catch (err) {
      // setError('Failed to load data');  // Handle error
    } finally {
      // setIsLoading(false);  // Set loading to false after data fetch or error
    }

  }

  function prevPage() {
    //router.back();
  }

  function nextPage() {
    // router.push(`/?offset=${offset}`, { scroll: false });
  }
  enum FileStatusValue {
    Enqueue = 1,
    Processing = 2,
    Success = 3,
    Error = 4,
  }

  function getStatus(fileStatusId:number):String {
    return FileStatusValue[fileStatusId]
  }


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Imagenes</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsAddModalOpen(true)}>Agregar Imagen</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Glaucoma</TableHead>
                <TableHead className="hidden md:table-cell">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((record) => (
                <TableRow>
                  <TableCell className="font-medium">
                    <a target="_blank"  href={GLAUCOMA_API_S3_DOMAIN + record.path}>{record.path}
                    <img src={GLAUCOMA_API_S3_DOMAIN + record.path} height={100} width={100}/></a>
                  </TableCell>
                  <TableCell className="font-medium">{getStatus(record.file_status_id)}</TableCell>
                  <TableCell className="font-medium">{record.prediction_value == 1 ? 'Si' : record.prediction_value == 0 ? 'No' : 'N/A'}</TableCell>
                  <TableCell>
                    <form action={() => console.log('eliminar')}>
                      <button type="submit">Eliminar</button>
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
            <DialogTitle>Agregar Imagen</DialogTitle>
          </DialogHeader>
          <FileForm patient_id={Number(patient_id)} onSuccess={() => { setIsAddModalOpen(false); fetchData() }} />
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
