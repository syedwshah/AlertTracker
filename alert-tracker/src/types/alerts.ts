export enum AlertEnum {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success"
}

export interface Alert {
  uid?: string,
  timeLimit: number,
  text: string,
  link: string,
  alertType: AlertEnum,
  alertTitle: string
}