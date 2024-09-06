"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

// import { toast } from "@/components/ui/toast"; // Assuming ChadCN UI has a toast notification component
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PatientFormDTO } from "@/lib/models"
import { AppStorage } from "@/lib/app.storage"

import { API_URL } from "@/lib/settings"
import { useToast } from "@/components/ui/hooks/use-toast"
import axios from "axios"


const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  identification_number: z.string({
    required_error: "birthday is required."
  }),
  birthday: z.string({
    required_error: "birthday is required."
  }).date()
})

const dateNow = new Date(Date.now()).toISOString().slice(0, 10);

export default function PatientForm({ record, onSuccess, patient_id }: { record: PatientFormDTO | null | undefined, onSuccess: () => void, patient_id: number }) {
  const { toast } = useToast()

  let [isLoading, setLoading] = useState<boolean>(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: record?.first_name || "",
      last_name: record?.last_name || "",
      identification_number: record?.identification_number || "",
      email: record?.email || "",
      birthday: dateNow
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Activate loader (show loader in UI)
    console.log(values);
    setLoading(true); // setLoading controls the state of a loader/spinner

    try {

      let userData = AppStorage.getUserData();


      let response = patient_id == 0 ?
        await axios.post(API_URL + '/patient/create', {
          ...values,
          patient_doctor_id: userData.id,
          birthday: values.birthday.toString(),
        }) :
        await axios.put(API_URL + '/patient/update/' + patient_id, {
          ...values,
          user_account_id: patient_id
        });
      console.log(response);

      // Stop loading (hide loader in UI)
      setLoading(false);

      // Show success notification
      toast({
        title: "Patient created",
        description: "The patient was successfully created.",
        duration: 3000,
      });
      onSuccess()
    } catch (error) {
      // Stop loading (hide loader in UI)
      setLoading(false);

      // Inform user about the error
      toast({
        title: "Error",
        description: "There was an error creating the patient. Please try again.",
        duration: 3000,
      });

      console.error(error); // Log the error for debugging purposes
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" aria-disabled={isLoading}>
        <fieldset>

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
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
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identification_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cedula</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <span className="spinner" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando.." : "Guardar"}
        </Button>

      </form>
    </Form>
  )
}
