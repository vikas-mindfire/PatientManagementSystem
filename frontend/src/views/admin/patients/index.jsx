import React from "react";
import Card from "components/card";
import PatientTable from "./components/PatientTable";
import usePatients from './usePatients'
import AddPatient from './components/AddEditPatient'

const CheckTable = () => {
  const { patients, columns, fetchPatients } = usePatients(true);

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Patients Information
        </div>
        <AddPatient fetchPatients={fetchPatients} />
      </header>
      { patients && <PatientTable patients={patients} columns={columns} />}
    </Card>
  );
};

export default CheckTable;
