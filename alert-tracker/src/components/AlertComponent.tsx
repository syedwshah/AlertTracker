import React from 'react';
import { Alert} from '../types/alerts';

const AlertComponent: React.FC<{alert: Alert}> = ({alert}) => {
  return (
    <> 
      {alert.link !== "" ?
      <a href={alert.link} target="_blank" rel="noopener noreferrer">
        <h1>{alert.alertTitle}</h1>
      </a> 
      :
      <h1>{alert.alertTitle}</h1>}
      
      <p>{alert.timeLimit}</p>
      <p>{alert.text}</p>
      <p>{alert.link}</p>
      
      <p>{alert.alertType}</p>
    </>
  )
}

export default AlertComponent;