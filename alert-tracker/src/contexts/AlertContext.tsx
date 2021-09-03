import React, {PropsWithChildren} from 'react';

import { Alert } from '../types/alerts';

interface AlertContextType {
  alerts: Alert[]
}

export const AlertContext = React.createContext<AlertContextType>({
  alerts: []
})

export const AlertContextProvider: React.FC = (props: PropsWithChildren<{}>) => {
  // const [alerts, setAlerts] = React.useState<Alert[]>([]);


}