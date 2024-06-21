import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Box,
  InputGroup,
  InputLeftAddon,
  useToast,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { MdAdd, MdEdit } from "react-icons/md";
import { useEffect } from "react";
import { format } from "date-fns";
import usePatients from "../usePatients";
import DatePickerField from "components/fields/DatePickerField";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: format(new Date(), "yyyy-MM-dd"),
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
};

function AddPatientModal({ fetchPatients, patientId }) {
  const [isOpen, setOpen] = useState(false);

  const { onAdd, getPatientById, onEdit } = usePatients();

  const onClose = () => setOpen(false);

  const toast = useToast();
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: format(date, "yyyy-MM-dd"),
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.firstName || formData.firstName.length < 2) {
      toast({
        title:
          "First Name is required and should be at least 2 characters long.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!formData.gender) {
      toast({
        title: "Gender is required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!formData.dateOfBirth) {
      toast({
        title: "Date of Birth is required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Call the function and pass the form data
    const response = patientId ? await onEdit(patientId, formData) : await onAdd(formData);
    if (response) {
      toast({
        title: "Patient is successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ ...initialState });
      if (fetchPatients) fetchPatients();
      onClose(); // Close the modal
    }
  };

  const getPatientData = useCallback(async () => {
    const response = await getPatientById(patientId)
    if (response) {
      const data = {
        ...response,
        dateOfBirth: format(new Date(response.dateOfBirth), "yyyy-MM-dd")
      }
      setFormData(data)
    }
  }, [patientId, getPatientById])

  useEffect(() => {
    if (isOpen) {
      getPatientData()
    }
  }, [patientId, isOpen, getPatientData])

  return (
    <>
    {
      patientId ? <Tooltip hasArrow label="Edit" bg="blue.600">
      <IconButton
        colorScheme="blue"
        aria-label="edit patient"
        isRound
        variant={"ghost"}
        onClick={() => setOpen(true)}
        icon={<MdEdit />}
      />
    </Tooltip> : <button
        className="linear flex items-center rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
        onClick={() => setOpen(true)}
      >
        {" "}
        <MdAdd className="mr-1 text-xl" /> <span> Add Patient</span>{" "}
      </button>
    }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ patientId ? 'Edit' : 'Add'} Patient</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <Box as="div" className="grid grid-cols-2 gap-4">
                  <FormControl isRequired className="col-span-1">
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl className="col-span-1">
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>

                <FormControl isRequired>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                <DatePickerField value={formData.dateOfBirth} label={'Date Of Birth'} handleDateChange={handleDateChange} inputProps={{
                      placeholder:"Date Of Birth",
                      name:"dateOfBirth",
                      id:"dateOfBirth"
              }} />

                <FormControl isRequired>
                  <FormLabel>Contact Info</FormLabel>
                  <Box as="div" className="grid grid-cols-2 gap-4">
                    <Input
                      className="col-span-1"
                      type="tel"
                      name="phone"
                      max={15}
                      min={10}
                      placeholder="Phone Number"
                      value={formData.contact.phone}
                      onChange={handleContactChange}
                    />
                    <Input
                      className="col-span-1"
                      type="email"
                      min={5}
                      name="email"
                      placeholder="Email"
                      value={formData.contact.email}
                      onChange={handleContactChange}
                    />
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <VStack spacing={2}>
                    <Input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                    />
                    <Box as="div" className="grid grid-cols-2 gap-4">
                      <Input
                        className="col-span-1"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                      />
                      <Input
                        className="col-span-1"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                      />
                    </Box>
                    <Box as="div" className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                      />
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="Zipcode"
                        value={formData.address.zipCode}
                        onChange={handleAddressChange}
                      />
                    </Box>
                  </VStack>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                { patientId ? 'Save' : 'Add'}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddPatientModal;
