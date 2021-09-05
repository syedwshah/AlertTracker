import { Alert } from "../types/alerts";
import { Guid } from "../utils/guid";

//Mapped Type: Map the Types enum to assosciated payload shape 
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum Types {
  Create = 'CREATE_ALERT',
  Delete =  'DELETE_ALERT',
  Add = 'ADD_ALERT',
}

//Alert 
type AlertPayload = {
  [Types.Create]: Alert;
  [Types.Delete]: {
    id: string
  }
}

export type AlertActions = ActionMap<AlertPayload>[keyof ActionMap<AlertPayload>];

export const alertReducer = (state: Alert[], action: AlertActions | CounterActions) => {
  switch (action.type) {
    case Types.Create:
     return [
       ...state,
       {
         id: action.payload.id ?? Guid.newGuid(),
         timeLimit: action.payload.timeLimit,
         link: action.payload.link,
         text: action.payload.text,
         alertType: action.payload.alertType,
         alertTitle: action.payload.alertTitle,
       }
     ]
     case Types.Delete:
      return [
        ...state.filter((alert) => alert.id !== action.payload.id),
      ]
    default: 
     return state;
  }
}

//Counter
type CounterPayload = {
  [Types.Add]: undefined;
}

export type CounterActions = ActionMap<CounterPayload>[keyof ActionMap<CounterPayload>];

export const counterReducer = (state: number, action: AlertActions | CounterActions) => {
  switch (action.type) {
    case Types.Add:
      return state + 1
    default:
      return state
  }
}