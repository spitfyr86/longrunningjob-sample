export class Alert {
    type: AlertType; // tslint:disable-line
    message: string;
    timeout: number;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
}
