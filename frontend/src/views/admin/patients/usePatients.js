import { useState, useEffect, useCallback } from "react"
import patientService from "services/patients"
import { differenceInYears, parseISO } from 'date-fns';
import { Box } from "@chakra-ui/react";
import DeletePatientModal from "./components/DeletePatient";

const usePatients = (getPatients = false) => {
  const [ patients, setPatients ] = useState([])

  // delete patient
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    // Your delete logic here
    // For example: onDeletePatient(patientId);
    setIsOpen(false);
  };
  
  const columns = [
    {
      Header: "Full Name",
      accessor: row => `${row.firstName} ${row.lastName}`,
    },
    {
      Header: "Age",
      accessor: (row) => {
        console.log(row, 'row')
        const date = parseISO(row.dateOfBirth);
        const age = differenceInYears(new Date(), date);
       return  age
      }
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Created By",
      accessor: "createdBy",
    },
    {
      Header: "Lastest Apointment",
      accessor: "latestAppointment",
    },
    {
      Header: "Action",
      accessor: (row) => (<Box>
        <DeletePatientModal patientId={row._id} />
      </Box>),
    },
  ]

  const fetchPatients = useCallback(async () => {
    const response = await patientService.getAllPatients()
    if (response.data) setPatients(response.data)
  }, [])

  useEffect(() => {
    if (getPatients) {
      fetchPatients()
    }
  }, [getPatients, fetchPatients])

  return { patients, isOpen,
    handleOpen,
    handleClose,
    handleDelete, columns}
}

export default usePatients;