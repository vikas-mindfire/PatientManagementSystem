import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import DatePickerField from "components/fields/DatePickerField";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import useAppointment from "./useAppointment";
import { format } from "date-fns";

const initialState = {
  doctor: "",
  date: "",
  reason: "",
  notes: "",
}

const AppointmentForm = ({ patientId, inInfoPage, fetchInfo }) => {

  const { doctors, isOpen, onOpen, onClose, onAddAppointment } = useAppointment({ fetchInfo })
  const [formData, setFormData] = useState({ ...initialState});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: format(date, 'yyyy-MM-dd')
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to backend)
    const added = onAddAppointment(patientId, formData)
    if (added) {
      setFormData({ ...initialState})
    }
  };

  return (
    <>
    {
      inInfoPage ? <Button colorScheme="green" leftIcon={<MdOutlineHealthAndSafety />} onClick={onOpen}>
        Add Appointment
      </Button> : <Tooltip hasArrow label="Add Appointments" bg="green.500">
        <IconButton
          colorScheme="green"
          aria-label="Appointments"
          isRound
          variant={"ghost"}
          onClick={onOpen}
          icon={<MdOutlineHealthAndSafety />}
        />
      </Tooltip>
    }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Appointment</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl mb={4} isRequired>
              <FormLabel>Doctor</FormLabel>
              <Select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Select doctor"
              >
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.firstName} {doctor.lastName} - { doctor.specialization}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Box mb={4}>
              <DatePickerField
                inputProps={{
                  placeholder: "Appointment Date",
                  name: "date",
                  id: "appointmentDate",
                }}
                value={formData.date}
                handleDateChange={handleDateChange}
                label="Appointment Date"
                datePickerProps={{ minDate: new Date()}}
              />
            </Box>

            <FormControl mb={4} isRequired>
              <FormLabel>Reason</FormLabel>
              <Input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Notes</FormLabel>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentForm;
