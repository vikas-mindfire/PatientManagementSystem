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
} from "@chakra-ui/react";
import usePatients from "../usePatients";
import { MdDelete } from "react-icons/md";

function DeletePatientModal({ patientId }) {
  const { isOpen, handleOpen, handleClose, handleDelete } = usePatients();
  return (
    <>
      <IconButton
        colorScheme="red"
        aria-label="delete patient"
        isRound
        variant={"ghost"}
        onClick={handleOpen}
        icon={<MdDelete />}
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this patient?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
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
