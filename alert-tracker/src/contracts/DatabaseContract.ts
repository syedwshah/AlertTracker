import { AlertModel } from "../models/AlertModel";

export interface IDatabaseContract {
  isReady: boolean;
  getAllAlert(): Promise<AlertModel[]>;
  subscribeToAlert(alert: AlertModel): Promise<void>;
}