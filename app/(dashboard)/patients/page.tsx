import { PatientFormDTO } from "@/lib/models";
import { PatientTable } from "./patient-table";

export default function Page() {
    let patients: PatientFormDTO[] = [
        {
            first_name: "hector",
            last_name: "mota",
            email: "motamendez@gmail.com",
            birthday: new Date(Date.now()),
            identification_number: "123"
        }
    ]
    return (
        <div>
            <PatientTable items={patients} total={1} offset={0}>
            </PatientTable>
        </div>

    )
}