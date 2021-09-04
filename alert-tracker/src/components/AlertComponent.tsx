import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { Types } from '../reducers/alertManager';

const Alerts = () => {
  const { state, dispatch } = useContext(AlertContext);

  return (
    <div>
      <button onClick={() => {
        dispatch({
          type: Types.Add
        })
      }}>
        Click
      </button>
      {state.counter}
    </div>
  )
}

export default Alerts