import React, { useState } from "react";
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
  Stack,
  IconButton,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import useMedicalHistory from "./useMedicalHistory";
import { FaBookMedical, FaTrash, FaPlus } from "react-icons/fa";
import DatePickerField from "components/fields/DatePickerField";
import { format } from "date-fns";

const MedicalHistoryModal = ({ patientId }) => {
  const { isOpen, onOpen, onClose, onSave } = useMedicalHistory();

  const toast = useToast();
  const [condition, setCondition] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [treatments, setTreatments] = useState([]);

  const handleAddTreatment = () => {
    const checkLastTreatment = treatments[treatments.length - 1];
    if (treatments.length === 0 || (checkLastTreatment.name && checkLastTreatment.date)) {
      setTreatments([...treatments, { name: "", date: format(new Date(), 'yyyy-MM-dd') }]);
    } else {
      toast({
        status: "error",
        title: "Please fill the empty treatment first.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveTreatment = (index) => {
    const updatedTreatments = [...treatments];
    updatedTreatments.splice(index, 1);
    setTreatments(updatedTreatments);
  };

  const handleTreatmentChange = (index, field, value) => {
    const updatedTreatments = [...treatments];
    updatedTreatments[index][field] = value;
    setTreatments(updatedTreatments);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Validate fields before saving
    if (!condition || !diagnosisDate || treatments.some((item) => !item.name || !item.date)) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const added = onSave({ condition, diagnosisDate, treatments, patientId });
    if (added) {
      //refreash
    }
  };

  return (
    <>
      <Tooltip hasArrow label="Medical History" bg="pink.600">
        <IconButton
          colorScheme="pink"
          aria-label="medical history"
          isRound
          variant={"ghost"}
          onClick={onOpen}
          icon={<FaBookMedical />}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Medical History</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSave}>
            <ModalBody>
              <FormControl mb={4} isRequired>
                <FormLabel>Condition</FormLabel>
                <Input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Diagnosis Date</FormLabel>
                <DatePickerField
                  value={diagnosisDate}
                  handleDateChange={(e) => {
                    const date = format(e, "yyyy-MM-dd");
                    setDiagnosisDate(date);
                  }}
                  isRequired
                  inputProps={{
                    placeholder: "Treament Date",
                  }}
                  datePickerProps={{
                    maxDate: new Date(),
                  }}
                />
              </FormControl>
              {treatments?.length > 0 ? (
                <FormControl mb={4}>
                  <FormLabel>Treatments</FormLabel>
                  <Stack spacing={4}>
                    {treatments.map((treatment, index) => (
                      <Stack direction="row" key={index}>
                        <Input
                          type="text"
                          placeholder="Treatment Name"
                          isRequired
                          value={treatment.name}
                          onChange={(e) =>
                            handleTreatmentChange(index, "name", e.target.value)
                          }
                        />
                        <DatePickerField
                          value={treatment.date}
                          handleDateChange={(e) => {
                            const date = format(e, "yyyy-MM-dd");
                            handleTreatmentChange(index, "date", date);
                          }}
                          inputProps={{
                            placeholder: "Treament Date",
                          }}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Remove Treatment"
                          onClick={() => handleRemoveTreatment(index)}
                          variant="ghost"
                          colorScheme="red"
                        />
                      </Stack>
                    ))}
                  </Stack>
                </FormControl>
              ) : (
                ""
              )}
               <Button
                    colorScheme={"green"}
                    leftIcon={<FaPlus />}
                    mt={4}
                    onClick={handleAddTreatment}
                  >
                    Treatment
                  </Button>
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

export default MedicalHistoryModal;
