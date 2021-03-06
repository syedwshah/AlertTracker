export enum AlertTypes {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success"
}

export interface Alert {
  id: string;
  timeLimit: number;
  text: string;
  link: string;
  alertType: AlertTypes;
  alertTitle: string;
}