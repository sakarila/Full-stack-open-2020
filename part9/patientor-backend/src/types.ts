export interface Diagnose {
    code: string;
    name: string;
    latin: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {startDate: string, endDate: string};
}

interface HospitalEntry extends BaseEntry {
    type:"Hospital";
    discharge?: {date: string, criteria: string}
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = "other"
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type FilteredPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type NewEntry = Omit<BaseEntry, 'id'>;