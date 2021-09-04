export enum AlertTypes {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success"
}

export interface Alert {
  id: number;
  timeLimit: number,
  text: string,
  link: string,
  alertType: AlertTypes,
  alertTitle: string
}