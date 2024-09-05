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
import { PatientFormDTO as PatientFormDTO } from "@/lib/models"
// import { UsersService, client } from "@/lib/client"

// client.setConfig({
//   baseUrl: process.env.API_URL
// })


const formSchema = z.object({
  path: z.string()
})

const dateNow = new Date(Date.now()).toISOString().slice(0,10);

export default function FileForm() {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      path:  "",
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.



    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormDescription>
                {/* This is your public display name. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}
