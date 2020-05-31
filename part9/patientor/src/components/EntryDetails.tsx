import React, { ReactElement } from 'react';
import { Icon, Rating } from "semantic-ui-react";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Hospital: React.FC<{ entry: HospitalEntry}> = ({ entry }): ReactElement => {
    return (
        <div key={entry.id} style={{border: "solid", marginTop: 20, padding: 10} }>
            <h3 >{entry.date} <Icon className="user doctor"></Icon></h3>
            <p >{entry.description}</p>
        </div>
    );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry}> = ({ entry }): ReactElement => {
    return (
        <div key={entry.id} style={{border: "solid", marginTop: 20, padding: 10} }>
            <h3 >{entry.date} <Icon className="plus square outline"></Icon></h3>
            <p >{entry.description}</p>
        </div>
    );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry}> = ({ entry }): ReactElement => {
    return (
        <div key={entry.id} style={{border: "solid", marginTop: 20, padding: 10} }>
            <h3 >{entry.date} <Icon className="stethoscope"></Icon></h3>
            <p >{entry.description}</p>
            <Rating icon="heart" disabled rating={4 - entry.healthCheckRating} maxRating={4} />
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
        case "Hospital":
            return <Hospital key={entry.id} entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare key={entry.id} entry={entry}/>;
        case "HealthCheck":
            return <HealthCheck key={entry.id} entry={entry}/>;
        default:
            return assertNever(entry);
  }
};

export default EntryDetails;
