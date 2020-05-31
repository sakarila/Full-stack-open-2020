import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Icon } from "semantic-ui-react";

import { Patient, Entry } from "../types";
import { useStateValue, setCurrentPatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";

import EntryDetails from '../components/EntryDetails';
import AddEntryForm from '../components/EntryForm';
import { HealthCheckForm} from '../components/EntryForm';

const PatientPage = () => {
const [{ currentPatient }, dispatch] = useStateValue();
  // const [{ diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const fetchPatient = async (id: string) => {
    if(id === currentPatient.id) {
      return;
    }
    try {
      const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(patient));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  useEffect(() => {
    fetchPatient(id);
  });

  const getIcon = (): string => {
    if (currentPatient.gender === 'male') {
      return 'mars';
    } else if (currentPatient.gender === 'female') {
      return 'venus';
    } else {
      return 'genderless';
    }
  };

  const submitNewEntry = async (values: HealthCheckForm) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addEntry(newEntry, id));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  /*
  const getCodeDiagnose = (code: string): string | undefined => {
    const name = diagnoses.find((diagnose) => diagnose.code === code)?.name;
    return name;
  };
  */

  return (
    <div>
      <h2>{currentPatient.name} <Icon className={getIcon()}></Icon></h2>
      <div>
        <p>ssn: {currentPatient.ssn}</p>
        <p>occupation: {currentPatient.occupation}</p>
      </div>
      <h3>entries</h3>
      <div>
        {currentPatient.entries.map((entry) => {
            return (
                <EntryDetails key={entry.id} entry={entry} />
            );
          })}
      </div>
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;
