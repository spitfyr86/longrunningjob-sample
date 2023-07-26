import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../../models/alert.model';
import { AlertService } from '../../services/helpers/alert.service';

@Component({
    selector: 'ngx-bs-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss'],
})

export class AlertComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }
    // tslint:disable-next-line
    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);

            setTimeout(() => {
                this.removeAlert(alert);
            }, alert.timeout);
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return 'alert';
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
            default:
                return 'alert';
        }
    }
}
