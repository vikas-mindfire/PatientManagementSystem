
import { useDisclosure} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import medicalHistoryService from "services/medicalHistory";

const useMedicalHistory = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSave = async ({ condition, diagnosisDate, treatments, patientId }) => {
    const data = { condition, diagnosisDate, treatments, patientId }
    const response = await medicalHistoryService.addPaitentMedicalHistory(patientId, { data })
    if (response.status === 201) {
      toast({
        status: 'success',
        title: 'Medical history is successfully added',
        duration: 3000,
        isClosable: true,
      })
      onClose()
    }
  }

  return { isOpen, onOpen, onClose, onSave }
}

export default useMedicalHistory;