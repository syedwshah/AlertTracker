import React, { useRef, useState, useEffect} from 'react';

import { Alert } from '../types/alerts';
import { theme } from '../constants/theme';

const AlertComponent: React.FC<{alert: Alert; deleteAlert: Function}> = ({alert, deleteAlert}) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState(alert.timeLimit)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => {
        setCount((count) => count - 1);
        if (count <= 1) {
          deleteAlert(alert.id);
        }
      },
      1000
    )

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [alert.id, count, deleteAlert])

  return (
    <div style={{
      display: "flex", 
      backgroundColor: "#FAFAFA",
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: 10,
      borderBottomStyle: "solid",
      borderWidth: "1px",
      borderColor: "black",
    }}>
      <button onClick={() => deleteAlert(alert.id)}>X</button>

      {alert.link !== "" ?
        <a href={alert.link} target="_blank" rel="noopener noreferrer">
          <p>{alert.alertTitle}</p>
        </a> 
        :
        <p>{alert.alertTitle}</p>
      }
      <p>{alert.text}</p>
      <p style={{color: theme.palette[alert.alertType].main}}>{alert.alertType}</p>
      <p>{count}</p>
    </div>
  )
}

export default AlertComponent;