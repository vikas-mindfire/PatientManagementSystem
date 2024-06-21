import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Patients from "views/admin/patients"
import PatientInfoPage from "views/admin/patientInfo";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";


// Icon Imports
import {
  MdHome,
  MdOutlineHealthAndSafety,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    hideRoute: true
  },
  {
    name: "Patients",
    layout: "/admin",
    path: "patients",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Patients />
  },
  {
    name: "PatientsInfo",
    layout: "/admin",
    path: "patients/:patientId",
    icon: <FaUsers className="h-6 w-6" />,
    component: <PatientInfoPage />,
    hideRoute: true,
    secondary: true
  },
  {
    name: "NFT",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "nft",
    component: <NFTMarketplace />,
    hideRoute: true
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
    hideRoute: true
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    hideRoute: true
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
