import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';
import { Types } from '../reducers/alertManager';
import { Alert, AlertTypes } from '../types/alerts';
import AlertComponent from './AlertComponent';
import InvalidAlert from './InvalidAlert';

const MAX_TITLE_AND_TEXT_LENGTH = 30; 

const AlertExample = () => {
  const [form, setForm] = React.useState({
    timeLimit: 5,
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

  const createAlert = (e: any) => {
    let alertTitle = "Untitled";
    if (form.alertTitle === "") {
      dispatch({
        type: Types.Create,
        payload: {
          timeLimit: form.timeLimit,
          text: form.text,
          link: form.link,
          alertType: form.alertType,
          alertTitle: alertTitle,
        }
      })
    }
    else {
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
    
    dispatch({
      type: Types.Add
    })
  }

  const deleteAlert = (id: number) => {
    dispatch({
      type: Types.Delete,
      payload: {
        id,
      }
    });
  }

  //Return true if a string is a valid URL, else return false. Empty string will be valid.
  const isUrlValid = (url: string): boolean => {
    if (url === "") {
      return true
    }

    // eslint-disable-next-line no-useless-escape
    const pattern = /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
    if (pattern.test(url)) {
        return true;
    } 

    return false
  } 
  
  const validateAlert = ({timeLimit, text, link, alertTitle}: Alert): string => {
    if (timeLimit < 1) {
      return "time limit should be greater than 0";
    }
    else if ((alertTitle.length + text.length) > MAX_TITLE_AND_TEXT_LENGTH) {
      return "title or text too long"
    }
    else if (!isUrlValid(link)) {
      return "invalid url"
    }
    
    return "valid";
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>

      <div>
        <h3>Alerts ever created: {state.counter}</h3>
        <div>
            <p>Alert Title</p>
            <input
              value={form.alertTitle}
              onChange={e => {
                handleForm("alertTitle", e.target.value)
              }}
              placeholder="Alert Title"
            />

            <p>Time Limit</p>
            <input
              type="number"
              value={form.timeLimit}
              onChange={e => {
                handleForm("timeLimit", e.target.value)
              }}
              placeholder="Time Limit (seconds)"
            />

            <p>Text</p>
            <input
              value={form.text}
              onChange={e => {
                handleForm("text", e.target.value)
              }}
              placeholder="Text"
            />

            <p>Link</p>
            <input
              type="url"
              value={form.link}
              onChange={e => {
                handleForm("link", e.target.value)
              }}
              placeholder="url"
            />

            <p>Alert Type</p>
            <select value={form.alertType} onChange={e => {
                handleForm("alertType", e.target.value)
              }}>
              <option value={AlertTypes.Info}>info</option>
              <option value={AlertTypes.Warning}>warning</option>
              <option value={AlertTypes.Error}>error</option>
              <option value={AlertTypes.Success}>success</option>
            </select>

            <button onClick={createAlert}>create</button>
        </div>
      </div>

      <div style={{flex: .3}}>
        {state.alerts.map(alert => {
          const alertValidation = validateAlert(alert)
          if (alertValidation === "valid") {
            return (
              <div key={alert.id} id={alert.id} >
                <AlertComponent alert={alert} deleteAlert={deleteAlert} />
              </div>
            )
          }
          else {
            return (
              <div key={alert.id} id={alert.id} style={{flex: .3}}>
                <InvalidAlert alertId={alert.id} deleteAlert={deleteAlert} errorAt={alertValidation} />
              </div>
            )
          }
          
        })}
      </div>
    </div>
  )
}

export default AlertExample