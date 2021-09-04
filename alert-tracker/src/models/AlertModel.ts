import { Alert, AlertTypes } from "../types/alerts";

export class AlertModel {
  public timeLimit: number;
  public text: string;
  public link: string;
  public alertType: AlertTypes;
  public alertTitle: string;


  constructor(params: Alert) {
    this.timeLimit = params.timeLimit;
    this.text = params.text;
    this.link = params.link;
    this.alertType = params.alertType;
    this.alertTitle = params.alertTitle;
  }
}