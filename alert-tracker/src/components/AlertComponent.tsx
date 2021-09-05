import React, { useRef, useState, useEffect} from 'react';
import { Alert } from '../types/alerts';

const AlertComponent: React.FC<{alert: Alert; deleteAlert: Function}> = ({alert, deleteAlert}) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const [count, setCount] = useState(alert.timeLimit)

  useEffect(() => {
    intervalRef.current = setInterval(
      () => {
        setCount((count) => count - 1);
        if (count === 1) {
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
    <>
      {alert.link !== "" ?
        <a href={alert.link} target="_blank" rel="noopener noreferrer">
          <h1>{alert.alertTitle}</h1>
        </a> 
        :
        <h1>{alert.alertTitle}</h1>
      }
      <p>{count}</p>
      <p>{alert.text}</p>
      
      <p>{alert.alertType}</p>

      <button onClick={() => deleteAlert(alert.id)}>Dismiss</button>
    </>
  )
}

export default AlertComponent;