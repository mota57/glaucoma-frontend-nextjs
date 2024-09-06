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
import { API_URL } from "@/lib/settings"
import { useToast } from "@/components/ui/hooks/use-toast"
import axios from "axios"
import { useState } from "react"
// import { AppStorage } from "@/lib/app.storage"


const formSchema = z.object({
  path: z.string()
})


export default function FileForm({ patient_id, onSuccess }: { patient_id: number, onSuccess: () => void }) {
  const { toast } = useToast()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState(null);


  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };


  async function handleUploadClick() {
    // Activate loader (show loader in UI)
    setLoading(true); // setLoading controls the state of a loader/spinner

    try {

      if (!file) {
        return;
      }

      // Example of uploading the file using the Fetch API
      const formData = new FormData();

      formData.append('file', file);
      formData.append('patient_id', patient_id.toString())

      // let userData = AppStorage.getUserData();
      let response = await axios.post(API_URL + '/patient/create', formData);

      console.log(response);

      // Stop loading (hide loader in UI)
      setLoading(false);

      // Show success notification
      toast({
        title: "created",
        description: "The file successfully created.",
        duration: 3000,
      });
      onSuccess()
    } catch (error) {
      // Stop loading (hide loader in UI)
      setLoading(false);

      // Inform user about the error
      toast({
        title: "Error",
        description: "There was an error creating the file. Please try again.",
        duration: 3000,
      });

      console.error(error); // Log the error for debugging purposes
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && <div>{(file as any).name}</div>}
      
      <Button onClick={handleUploadClick}>Upload</Button>
    </div>

  )
}
