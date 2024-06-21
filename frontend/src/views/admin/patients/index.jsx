import React from "react";
import Card from "components/card";
import PatientTable from "./components/PatientTable";
import usePatients from './usePatients'
import AddPatient from './components/AddEditPatient'
import { FiSearch } from "react-icons/fi";

const PatientPage = () => {
  const { patients, columns, fetchPatients, handleSearch } = usePatients(true);

  return (
    <Card extra={"w-full sm:overflow-auto p-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Patients Information
        </div>
        <div className="flex items-center justify-between">
        <div className="flex h-[40px] items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px] mr-4">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            onChange={handleSearch}
          />
        </div>
        <AddPatient fetchPatients={fetchPatients} />
        </div>
      </header>
      { patients && <PatientTable patients={patients} columns={columns} />}
    </Card>
  );
};

export default PatientPage;
