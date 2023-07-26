import { Component, ViewChild, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { BaThemePreloader } from '../../../theme/services';

import 'amcharts3';
import 'amcharts3/amcharts/plugins/responsive/responsive.js';
import 'amcharts3/amcharts/serial.js';

import 'ammap3';
import 'ammap3/ammap/maps/js/worldLow';

import { BaAmChartThemeService } from './baAmChartTheme.service';
import { AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
    selector: 'ngx-ba-am-chart',
    templateUrl: './baAmChart.html',
    styleUrls: ['./baAmChart.scss'],
    providers: [BaAmChartThemeService],
})
// tslint:disable-next-line
export class BaAmChart implements OnChanges {

    @Input() baAmChartConfiguration: object;
    @Input() baAmChartClass: string;
    @Output() onChartReady = new EventEmitter<any>();

    @ViewChild('baAmChart') public _selector: ElementRef;

    private chart: any;

    constructor(private _baAmChartThemeService: BaAmChartThemeService,
        private amCharts: AmChartsService) {
        this._loadChartsLib();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.chart) {
            this.chart.dataProvider = changes.baAmChartConfiguration.currentValue.dataProvider;
            this.chart.validateData();
        }
    }

    // tslint:disable-next-line
    ngOnInit() {
        this.amCharts.theme.blur = this._baAmChartThemeService.getTheme();
    }

    // tslint:disable-next-line
    ngAfterViewInit() {
        this.chart = this.amCharts.makeChart(this._selector.nativeElement, this.baAmChartConfiguration);
        this.onChartReady.emit(this.chart);

    }

    // tslint:disable-next-line
    private _loadChartsLib(): void {
        BaThemePreloader.registerLoader(new Promise((resolve, reject) => {
            const amChartsReadyMsg = 'AmCharts ready';
            const makeReady = this.amCharts.addListener(this.chart, 'ready', (e) => {
                resolve(amChartsReadyMsg);
            });
            makeReady();
        }));
    }
}
