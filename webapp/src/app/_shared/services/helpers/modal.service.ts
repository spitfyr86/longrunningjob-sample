import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {

    public modalMessage: string;
    public okLabel: string;

    constructor(
        private ngbModal: NgbModal) {
    }

    alert(
        alertComponent: any,
        message: string,
        okCallback: () => void,
        okLabel?: string,
        isHtml: boolean = false,
        showCloseButton: boolean = true,
        header?: string) {
        
            this.modalMessage = message;
        const activeModal = this.ngbModal.open(alertComponent, {
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'animated bounceInDown alert-modal',
        });
        activeModal.componentInstance.modalHeader = header || 'Base64 Encoder';
        activeModal.componentInstance.message = message;
        activeModal.componentInstance.okLabel = okLabel || 'Dismiss';
        activeModal.componentInstance.isHtmlContent = isHtml;
        activeModal.componentInstance.showCloseButton = showCloseButton;
        activeModal.componentInstance.okCallback = okCallback;
    }

    confirmation(
        confirmationComponent: any,
        message: string,
        okCallback: () => void,
        okLabel?: string,
        isHtml: boolean = false,
        header?: string) {

        this.modalMessage = message;
        const activeModal = this.ngbModal.open(confirmationComponent, {
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'animated bounceInDown confirm-modal',
        });
        activeModal.componentInstance.modalHeader = header || 'Base64 Encoder';
        activeModal.componentInstance.message = message;
        activeModal.componentInstance.okLabel = okLabel || 'OK';
        activeModal.componentInstance.isHtmlContent = isHtml;
        activeModal.componentInstance.okCallback = okCallback;
    }
}
