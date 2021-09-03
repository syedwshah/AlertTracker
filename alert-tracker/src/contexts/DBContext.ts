import React, {PropsWithChildren} from 'react';

import { IDatabaseContract } from '../contracts/DatabaseContract';
import { AlertModel } from '../models/AlertModel';
import { Alert } from '../types/alerts';

interface DBContextProps {
  alerts: AlertModel[];
  subscribeToAlert: (alert: AlertModel) => Promise<void>;
}

export const DBContext = React.createContext<DBContextProps>({
  alerts: [],
  subscribeToAlert: () => Promise.resolve(),
})

export const DBProvider: React.FC = (props: PropsWithChildren<{}>) => {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  const db = React.useRef<IDatabaseContract | null>(null)
  
  //Initialize db connection on component mount:
  // React.useEffect(() => {
  //   db.current = //...initialize db connection
  // }, [])

  React.useEffect(() => {
    if (db.current?.isReady) {
      (async () => {
        if (db.current) {
          const _alerts = await db.current.getAllAlert();
          setAlerts(_alerts);
        }
      })();
    }
  }, [db.current?.isReady])

  const subscribeToAlert = async (alerts: Alert) => {
    if (db.current) {
      await db.current.subscribeToAlert(alerts);

      const _alerts = await db.current.getAllAlert()

      setAlerts(_alerts)
    }
  }

  const value: DBContextProps = {
    alerts,
    subscribeToAlert
  };

  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  )
}