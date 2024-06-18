import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

function DeletePatientModal({ patientId, handleDelete  }) {

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const onDeleteClick = () => {
    if (handleDelete && patientId) {
      const isDeleted = handleDelete(patientId);
      if (isDeleted) {
        handleClose()
      }
    } 
  }
  
  return (
    <>
    <Tooltip hasArrow label='Delete Patient' bg='red.600'>
    <IconButton
        colorScheme="red"
        aria-label="delete patient"
        isRound
        variant={"ghost"}
        onClick={handleOpen}
        icon={<MdDelete />}
      />
    </Tooltip>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this patient?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDeleteClick}>
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePatientModal;
