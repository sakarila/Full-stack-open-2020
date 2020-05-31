import patients from '../../data/patients';

import { FilteredPatient, Patient, NewPatient, Entry } from '../types';
import { checkDescription, checkSpecialist, checkEmployerName, checkHealthCheckRating, isDate} from '../utils';

const getFilteredPatients = (): FilteredPatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries: []
    }));
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(x => x.id === id);
    return patient;
};

const createPatient = (patient: NewPatient):  Patient => {
    const newPatientEntry = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        entries: [],
        ...patient
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const createEntry = (entry: Entry): Entry => {
    checkSpecialist(entry.specialist);
    checkDescription(entry.description);
    if (!entry.date || !isDate(entry.date)) throw new Error('Incorrect or missing date');

    const entryID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    switch (entry.type) {
        case "Hospital":
          return  {
            ...entry,
            discharge: entry.discharge,
            id: entryID
          };
        case "HealthCheck":
            console.log(entry);
            console.log(entry.healthCheckRating);
            checkHealthCheckRating(entry.healthCheckRating);
            return {
             ...entry,
             healthCheckRating: entry.healthCheckRating,
             id: entryID
            };
        case "OccupationalHealthcare":
            checkEmployerName(entry.employerName);
            return {
            ...entry,
            employerName: entry.employerName,
            sickLeave: entry.sickLeave,
            id: entryID
            };
    }
};


export default {
getFilteredPatients,
getPatient,
createPatient,
createEntry
};