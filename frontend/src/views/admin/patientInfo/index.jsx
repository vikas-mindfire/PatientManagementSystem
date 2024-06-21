import React from "react";
import Card from "components/card";
import usePatientInfo from "./usePatientInfo";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { formatDistance, format } from "date-fns";
import AppointmentForm from "../patients/components/AddAppointment";

const PatientInfoPage = () => {
  const { patientInfo, getAppointments, getPatiendInfo, getMedicalHistory } =
    usePatientInfo();

  const fields = [
    {
      title: "First Name",
      field: "firstName",
    },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "Gender",
      field: "gender",
    },
  ];

  return (
    <>
      <Card extra={"w-full sm:overflow-auto p-4 mb-4"}>
        <header className="relative">
          <div className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Patient Information
          </div>
          <Box className="grid grid-cols-6 gap-4">
            {patientInfo ? (
              <>
                {fields.map((item) => (
                  <Box key={item.title}>
                    {patientInfo[item.field] ? (
                      <Box className="col-span-1" key={item.title}>
                        <Box className="mb-1 font-semibold">{item.title} </Box>{" "}
                        <Box> {patientInfo[item.field]} </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                ))}

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Date of Birth </Box>{" "}
                  <Box>
                    {" "}
                    {format(
                      new Date(patientInfo["dateOfBirth"]),
                      "dd-MM-yyyy"
                    )}{" "}
                  </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Admittied on </Box>{" "}
                  <Box>
                    {" "}
                    {format(
                      new Date(patientInfo["createdAt"]),
                      "dd-MM-yyyy"
                    )} /{" "}
                    {formatDistance(
                      new Date(patientInfo["createdAt"]),
                      new Date(),
                      { addSuffix: true }
                    )}{" "}
                  </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Medical History </Box>{" "}
                  <Box> {patientInfo?.medicalHistory?.length} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Total Appointments </Box>{" "}
                  <Box> {patientInfo?.appointments?.length} </Box>
                </Box>


                <Box className="col-span-6 font-semibold mt-4 text-xl">
                  Contact Information
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Email </Box>{" "}
                  <Box> {patientInfo?.contact?.email ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Phone Number </Box>{" "}
                  <Box> {patientInfo?.contact?.phone ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-6 font-semibold mt-4 text-xl">
                  Address
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Street </Box>{" "}
                  <Box> {patientInfo?.address?.street ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">City </Box>{" "}
                  <Box> {patientInfo?.address?.city ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">State </Box>{" "}
                  <Box> {patientInfo?.address?.state ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Country </Box>{" "}
                  <Box> {patientInfo?.address?.country ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Zip Code </Box>{" "}
                  <Box> {patientInfo?.address?.zipCode ?? "N/A"} </Box>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </header>
      </Card>

      {getAppointments?.length ? (
        <Card extra={"w-full sm:overflow-auto p-4 mb-4"}>
          <header className="relative">
            <Box className="mb-4 flex items-center justify-between">
              <div className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
                Appointments
              </div>
              <AppointmentForm
                patientId={patientInfo?._id}
                inInfoPage
                fetchInfo={getPatiendInfo}
              />
            </Box>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>
                  Appointments Information of{" "}
                  {patientInfo
                    ? `${patientInfo.firstName} ${patientInfo.lastName}`
                    : ""}{" "}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Doctor Name</Th>
                    <Th>Appointment Date</Th>
                    <Th>Reason</Th>
                    <Th width={"30%"}>Notes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getAppointments.map((item) => (
                    <Tr key={item._id}>
                      <Td>
                        {item.doctor?.firstName} {item.doctor?.lastName}
                      </Td>

                      <Td>{format(new Date(item.date), "dd-MM-yyyy")}</Td>
                      <Td>{item.reason}</Td>
                      <Td>
                        <Box as={"span"} sx={{ whiteSpace: "break-spaces" }}>
                          {item.notes}
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Doctor Name</Th>
                    <Th>Appointment Date</Th>
                    <Th>Reason</Th>
                    <Th>Notes</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </header>
        </Card>
      ) : (
        ""
      )}

      {getMedicalHistory?.length ? (
        <Card extra={"w-full sm:overflow-auto p-4"}>
          <header className="relative">
            <Box className="mb-4 flex items-center justify-between">
              <div className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
                Medical History
              </div>
            </Box>
          </header>
          <Accordion defaultIndex={[0]} allowMultiple>
            {getMedicalHistory.map((item, index) => (
              <AccordionItem key={item._id}>
                <AccordionButton>
                  <Box className="grid w-full grid-cols-3 p-2">
                    <Box className="col-span-1 flex items-center justify-start">
                      <Box className="mr-2 font-semibold">
                        {index + 1}. Condition:{" "}
                      </Box>
                      <Box>{item.condition}</Box>
                    </Box>
                    <Box className="col-span-1 flex items-center justify-center">
                      <Box className="mr-2 font-semibold">
                        {" "}
                        Diagnosis Date:{" "}
                      </Box>
                      <Box>
                        {item.diagnosisDate
                          ? format(new Date(item.diagnosisDate), "dd-MM-yyy")
                          : ""}
                      </Box>
                    </Box>
                    <Box className="col-span-1 flex items-center justify-end">
                      <AccordionIcon />
                    </Box>
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {item?.treatments.length > 0 ? (
                    <UnorderedList>
                      {item?.treatments.map((treatment) => (
                        <ListItem>
                          {treatment.name} on{" "}
                          {format(new Date(treatment.date), "dd-MM-yyy")}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  ) : (
                    <Box as="h2" className="font-semibold text-sm">
                      No Treament added.
                    </Box>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default PatientInfoPage;
