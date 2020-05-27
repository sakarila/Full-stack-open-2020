import patientsData from '../../data/patients.json';

import { FilteredPatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getFilteredPatientEntries = (): FilteredPatientEntry [] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const createPatientEntry = (entry: NewPatientEntry):  PatientEntry => {
    const newPatientEntry = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
getFilteredPatientEntries,
createPatientEntry,
};