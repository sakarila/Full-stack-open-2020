/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */


/*
I didn't know if this was the correct way of doing this, but it seemed to me that I had different eslint configurations than in the course material...
So I disabled some of the eslint-checks to get this implementation to work
*/


import { NewPatient, Gender, HealthCheckRating } from './types';

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

export const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};

export const checkHealthCheckRating = (healthCheckRating: any): boolean => {
  if (!Object.values(HealthCheckRating).includes(healthCheckRating)) {
    console.log(Object.values(HealthCheckRating).includes(healthCheckRating));
    throw new Error('Incorrect or missing healthcheck-rating');
  }
  return true;
};

export const checkEmployerName = (employerName: any): boolean => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return true;
};

export const checkDescription = (description: any): boolean => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return true;
};

export const checkSpecialist = (specialist: any): boolean => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return true;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth');
    }
    return date;
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  const newpatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
  return newpatient;
};