import { useCallback, useEffect, useState } from "react";
import doctorService from "services/doctors";
import { useDisclosure} from "@chakra-ui/react";
import appointmentService from "services/appointment";
import { useToast } from "@chakra-ui/react";

const useAppointment = ({ fetchInfo }) => {

  const [ doctors, setDoctors] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getAllDoctors = useCallback(async () => {
    const response = await doctorService.getAllDoctors()
    if (response?.data) setDoctors(response.data)
  }, [])

  const onAddAppointment = async (patientId, formData) => {
    const response = await appointmentService.addAppointment(patientId, { data: formData})
    if (response.status === 201) {
      toast({
        title: "Appointment is successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (fetchInfo) {
        fetchInfo()
      }
      onClose();
      return true
    }
  }

  useEffect(() => {
    if (isOpen) getAllDoctors()
  }, [isOpen, getAllDoctors])

  return { doctors, isOpen, onOpen, onClose, onAddAppointment }

}

export default useAppointment;