import React, { createContext, useReducer} from 'react';

import { AlertActions, CounterActions, alertReducer, counterReducer } from '../reducers/alertManager';
import { Alert } from '../types/alerts';


type InitialStateType = {
  alerts: Alert[],
  counter: number
}

const initialState = {
  alerts: [],
  counter: 0
}

export const AlertContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({alerts, counter}: InitialStateType, action: AlertActions | CounterActions) => ({
  alerts: alertReducer(alerts, action),
  counter: counterReducer(counter, action)
});

export const AlertProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  
  return (
    <AlertContext.Provider value={{state, dispatch}}>
      {children}
    </AlertContext.Provider>
  )
}