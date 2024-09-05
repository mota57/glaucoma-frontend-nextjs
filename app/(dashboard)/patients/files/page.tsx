import { FileTable } from "./file-table";

import { GetPatientFileMock, GetPatientsMock } from "@/lib/models";
export default function Page(){
    let patient = GetPatientsMock()[0]
    let files = GetPatientFileMock()
    return (

        <FileTable patient={patient}  items={files} offset={0} total={files.length} ></FileTable>
    )
}