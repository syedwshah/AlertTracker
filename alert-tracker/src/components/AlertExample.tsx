import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { Types } from '../reducers/alertManager';
import AlertComponent from './AlertComponent';

const AlertExample = () => {
  const [form, setForm] = React.useState({
    timeLimit: 10,
    text: "",
    link: "",
    alertType: "info",
    alertTitle: "",
  })
  const { state, dispatch } = useContext(AlertContext);

  const handleForm = (type: string, value: string) => {
    setForm(form => ({
      ...form,
      [type]: value
    }));
  }

  const createAlert = () => {
    dispatch({
      type: Types.Create,
      payload: {
        timeLimit: form.timeLimit,
        text: form.text,
        link: form.link,
        alertType: form.alertType,
        alertTitle: form.alertTitle,
      }
    })
  }

  const deleteAlert = (id: number) => {
    dispatch({
      type: Types.Delete,
      payload: {
        id,
      }
    })
  }

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

      <div>
          <p>Alert Title:</p>
          <input
            value={form.alertTitle}
            onChange={e => {
              handleForm("alertTitle", e.target.value)
            }}
            placeholder="Alert Title"
          />

          <p>Time Limit:</p>
          <input
            value={form.timeLimit}
            onChange={e => {
              handleForm("timeLimit", e.target.value)
            }}
            placeholder="Time Limit (seconds)"
          />

          <p>Text:</p>
          <input
            value={form.text}
            onChange={e => {
              handleForm("text", e.target.value)
            }}
            placeholder="Text"
          />

          <p>Link:</p>
          <input
            type="url"
            value={form.link}
            onChange={e => {
              handleForm("link", e.target.value)
            }}
            placeholder="url"
          />

          <p>Alert Type:</p>
          <select value={form.alertType} onChange={e => {
              handleForm("alertType", e.target.value)
            }}>
            <option value="warning">warning</option>
            <option value="info">info</option>
            <option value="error">error</option>
            <option value="success">success</option>
          </select>

          <button onClick={createAlert}>create</button>

          <div style={{marginTop: 20}}>
            {state.alerts.map(alert => (
              <div key={alert.id}>
                <AlertComponent alert={alert} deleteAlert={deleteAlert} />
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default AlertExample