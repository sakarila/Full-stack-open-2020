import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";


export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: payload
  };
};

export const setDiagnoseList = (payload: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: payload
  };
};


export const setCurrentPatient = (payload: Patient): Action => {
  return {
    type: "SET_CURRENT_PATIENT",
    payload: payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: payload
  };
};

export const addEntry = (payload: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: payload,
    id: id,
  };
};


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_CURRENT_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    }
  |  {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_CURRENT_PATIENT":
        return {
          ...state,
          currentPatient: {
            ...action.payload
          }
        };
      case "SET_DIAGNOSE_LIST":
        return {
          ...state,
          diagnoses: action.payload
        };
      case "ADD_ENTRY":
        return {
          ...state,
          currentPatient: {
            ...state.currentPatient, entries: [...state.currentPatient.entries, action.payload]
          }
        };
      default:
        return state;
  }
};
