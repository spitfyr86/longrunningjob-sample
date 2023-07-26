import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../services/helpers/modal.service';

@Component({
    selector: 'ngx-alert-modal',
    styleUrls: ['./alert-modal.component.scss'],
    templateUrl: './alert-modal.component.html',
})
export class AlertModalComponent {

    modalHeader: string;
    message: string;
    isHtmlContent: boolean;
    showCloseButton: boolean;
    okLabel: string;
    okCallback: () => void;

    constructor(
        private ngbModal: NgbModal,
        private activeModal: NgbActiveModal,
        private modalService: ModalService) {
    }

    ok() {
        this.activeModal.close();
        this.okCallback();
    }

    closeModal() {
        this.activeModal.close();
    }
}
