import { useState, useEffect, useCallback } from "react";
import patientService from "services/patients";
import { differenceInYears, parseISO } from "date-fns";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import DeletePatientModal from "./components/DeletePatient";
import { MdEdit, MdOutlineHealthAndSafety } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";
const usePatients = (getPatients = false) => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = useCallback(async () => {
    const response = await patientService.getAllPatients();
    if (response?.data) setPatients(response.data);
  }, []);

  const handleDelete = async (patientId) => {
    const response = await patientService.deletePatient(patientId)
    if (response.status === 200) {
      fetchPatients()
      return true
    }
  };

  const columns = [
    {
      Header: "Full Name",
      accessor: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      Header: "Age",
      accessor: (row) => {
        const date = parseISO(row.dateOfBirth);
        const age = differenceInYears(new Date(), date);
        return age;
      },
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
      accessor: (row) => (
        <Box as="span">
          <Tooltip hasArrow label="Edit" bg="blue.600">
            <IconButton
              colorScheme="blue"
              aria-label="edit patient"
              isRound
              variant={"ghost"}
              // onClick={handleOpen}
              icon={<MdEdit />}
            />
          </Tooltip>

          <Tooltip hasArrow label="Medical History" bg="pink.600">
            <IconButton
              colorScheme="pink"
              aria-label="medical history"
              isRound
              variant={"ghost"}
              // onClick={handleOpen}
              icon={<FaBookMedical />}
            />
          </Tooltip>
          <Tooltip hasArrow label="Appointments" bg="pink.600">
            <IconButton
              colorScheme="pink"
              aria-label="medical history"
              isRound
              variant={"ghost"}
              // onClick={handleOpen}
              icon={<MdOutlineHealthAndSafety />}
            />
          </Tooltip>
          <DeletePatientModal patientId={row._id} handleDelete={handleDelete} />
        </Box>
      ),
    },
  ];

  const onAdd = async (formData) => {
    const response = await patientService.addPatients({ data: formData })
    if (response.status === 201) {
      return true
    }
  }

  useEffect(() => {
    if (getPatients) {
      fetchPatients();
    }
  }, [getPatients, fetchPatients]);

  return { patients, columns, onAdd, fetchPatients, handleDelete };
};

export default usePatients;