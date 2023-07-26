import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../services/helpers/modal.service';

@Component({
    selector: 'ngx-confirmation-modal',
    styleUrls: ['./confirmation-modal.component.scss'],
    templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {

    modalHeader: string;
    message: string;
    isHtmlContent: boolean;
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

    cancel() {
        this.activeModal.close();
    }
}
