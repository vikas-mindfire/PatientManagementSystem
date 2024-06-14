import React, { useMemo } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import PatientTable from "./components/PatientTable";
import usePatients from './usePatients'

const CheckTable = () => {
  const { patients, columns } = usePatients(true);

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Patients Information
        </div>
        <CardMenu />
      </header>
      { patients && <PatientTable patients={patients} columns={columns} />}
    </Card>
  );
};

export default CheckTable;
