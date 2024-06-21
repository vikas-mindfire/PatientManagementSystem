import { useState, useEffect, useCallback } from "react";
import patientService from "services/patients";
import { differenceInYears, parseISO } from "date-fns";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import DeletePatientModal from "./components/DeletePatient";
import { FaBookMedical, FaInfo } from "react-icons/fa";
import EditPatientModal from "./components/AddEditPatient";
import AppointmentForm from "./components/AddAppointment";
import format from "date-fns/format";
import debounce from 'debounce';
import { useNavigate } from "react-router-dom";

const usePatients = (getPatients = false) => {
  const [patients, setPatients] = useState([]);
  const [ search, setSearch ] = useState('')

  const fetchPatients = useCallback(async () => {
    let query = ''
    if (search.length > 0) {
      query += `search=${search}`
    }
    const response = await patientService.getAllPatients(query);
    if (response?.data) setPatients(response.data);
  }, [search]);

  const handleSearch = debounce((e) => {
    const value = e.target.value;
    setSearch(value)
  }, 500)

  const handleDelete = async (patientId) => {
    const response = await patientService.deletePatient(patientId)
    if (response.status === 200) {
      fetchPatients()
      return true
    }
  };

  const navigate = useNavigate()

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
      Header: "Added By",
      accessor: (row) => `${row.createdByFirstName} ${row.createdByLastName}`,
    },
    {
      Header: "Lastest Apointment",
      accessor: (row) => `${row.latestAppointment?.date ? format(new Date(row.latestAppointment?.date), 'dd-MM-yyyy') : 'No Appointment'}`,
    },
    {
      Header: "Action",
      accessor: (row) => (
        <Box as="span">
          <EditPatientModal patientId={row._id} fetchPatients={fetchPatients} />
          <Tooltip hasArrow label="Patient Info" bg="yellow.600">
            <IconButton
              colorScheme="yellow"
              aria-label="Patient Info"
              isRound
              variant={"ghost"}
              onClick={() => navigate(`/admin/patients/${row._id}`)}
              icon={<FaInfo />}
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
          <AppointmentForm patientId={row._id} />
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

  const onEdit = async (patientId, formData) => {
    const { createdAt, __v, _id, updatedAt, ...restData } = formData
    const response = await patientService.updatePatient(patientId, { data: restData })
    if (response?.status === 200) {
      return true
    }
  }

  const getPatientById = useCallback(async (patientId) => {
    const response = await patientService.getPatientById(patientId)
    if (response?.data) return response.data
  }, [])

  useEffect(() => {
    if (getPatients) {
      fetchPatients();
    }
  }, [getPatients, fetchPatients, search]);

  return { patients, columns, onAdd, fetchPatients, handleDelete, getPatientById, onEdit, handleSearch };
};

export default usePatients;
