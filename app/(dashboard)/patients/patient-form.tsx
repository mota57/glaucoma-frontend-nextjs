"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { client, PatientsService, CreateData } from "@/lib/client"

client.setConfig({
  baseUrl: API_URL
})


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

export default function PatientForm({ record }: { record: PatientFormDTO | null | undefined }) {

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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //activate loader
    console.log(values)
    debugger;
    console.log('todo loading')
    try {

      let userData = AppStorage.getUserData()

      let response = await PatientsService.create({
        client: client,
        body: {
          ...values,
          patient_doctor_id: userData.id,
          birthday: values.birthday.toString()
        }
      })
      console.log(response)

      console.log('todo stop loading')

    } catch {
      console.log('todo stop loading')
      console.log('todo inform user about the error')
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Birthday</FormLabel>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
