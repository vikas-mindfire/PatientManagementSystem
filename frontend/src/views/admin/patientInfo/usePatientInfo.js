import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import patientService from 'services/patients';

const usePatientInfo = () => {

  const [ patientInfo, setPatientInfo ] = useState(null)
  const { patientId } = useParams();

  const getPatiendInfo = useCallback(async () => {
    const response = await patientService.getPatientById(patientId)
    if (response?.status === 200) setPatientInfo( response?.data )
  }, [patientId])

  const getAppointments = useMemo(() => {
    if (patientInfo) {
      return patientInfo.appointments
    }
    return []

  }, [patientInfo])

  const getMedicalHistory = useMemo(() => {
    if (patientInfo) {
      return patientInfo.medicalHistory
    }
    return []

  }, [patientInfo])

  useEffect(() => {
    getPatiendInfo()
  }, [patientId, getPatiendInfo])

  return { patientInfo, getAppointments, getPatiendInfo, getMedicalHistory}
}

export default usePatientInfo;
