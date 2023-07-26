import { Component, OnInit } from '@angular/core';
import { SlimLoaderService } from '../../services/helpers/slim-loader.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
    selector: 'ngx-bs-slim',
    templateUrl: 'slim.component.html',
    styleUrls: ['./slim.component.scss'],
})

export class SlimComponent implements OnInit {
    loader = this.loadingBarService.useRef();

    constructor(private slimLoaderService: SlimLoaderService, private loadingBarService: LoadingBarService) { }
    // tslint:disable-next-line
    ngOnInit() {
        this.slimLoaderService.getSlimLoader().subscribe((progress: any) => {
            if (progress.start) {
                // this.loadingBarService.height = progress.height;
                // this.loadingBarService.color = progress.color;
                // this.loadingBarService.progress = 30;
                // this.loader.start();
                // if (this.loadingBarService.progress === 90) {
                //     this.loader.stop();
                // }
            }
            if (progress.stop) {
                this.loader.stop();
            }
            if (progress.complete) {
                this.loader.complete();
            }
            if (progress.reset) {
                this.loader.stop(); // old .reset()
            }
        });
    }
}
