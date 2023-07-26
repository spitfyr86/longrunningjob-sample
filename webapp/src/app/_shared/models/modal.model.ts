
export interface ModalModel {
    message: string;
    type: ModalType; //tslint:disable-line
}

export enum ModalType {
    ALERT,
    CONFIRMATION,
    PROMPT
}
