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
} from "@chakra-ui/react";
import { formatDistance, format } from "date-fns";

const PatientInfoPage = () => {
  const { patientInfo, getAppointments } = usePatientInfo();
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
                  <>
                    {patientInfo[item.field] ? (
                      <Box className="col-span-1" key={item.title}>
                        <Box className="mb-1 font-semibold">{item.title} </Box>{" "}
                        <Box> {patientInfo[item.field]} </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </>
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
                  <Box className="mb-1 font-semibold">Email </Box>{" "}
                  <Box> {patientInfo?.contact?.email ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Phone Number </Box>{" "}
                  <Box> {patientInfo?.contact?.phone ?? "N/A"} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Medical History </Box>{" "}
                  <Box> {patientInfo?.medicalHistory?.length} </Box>
                </Box>

                <Box className="col-span-1">
                  <Box className="mb-1 font-semibold">Total Appointments </Box>{" "}
                  <Box> {patientInfo?.appointments?.length} </Box>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </header>
      </Card>

      {getAppointments?.length ? (
        <Card extra={"w-full sm:overflow-auto p-4"}>
          <header className="relative">
            <div className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
              Appointments
            </div>
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
                    <Th>Notes</Th>
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
                      <Td>{item.notes}</Td>
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
    </>
  );
};

export default PatientInfoPage;
