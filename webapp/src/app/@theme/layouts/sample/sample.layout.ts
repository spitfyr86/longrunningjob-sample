import { Component, OnDestroy } from '@angular/core';
import {
    NbMediaBreakpoint,
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';

import { Subscription } from 'rxjs';
import { StateService } from '../../../@core/utils';

// TODO: move layouts into the framework
@Component({
    selector: 'ngx-sample-layout',
    styleUrls: ['./sample.layout.scss'],
    template: `
    <nb-layout>
        <nb-layout-header subheader>
            <ngx-header></ngx-header>
        </nb-layout-header>

        <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
            <ng-content select="nb-menu"></ng-content>
        </nb-sidebar>

        <nb-layout-column class="colored-column-basic">Layout Content</nb-layout-column>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {
    layout: any = {};
    sidebar: any = {};

    protected layoutState$: Subscription;
    protected sidebarState$: Subscription;
    protected menuClick$: Subscription;

    constructor(
        protected stateService: StateService,
        protected menuService: NbMenuService,
        protected themeService: NbThemeService,
        protected bpService: NbMediaBreakpointsService,
        protected sidebarService: NbSidebarService,
    ) {
        this.layoutState$ = this.stateService
            .onLayoutState()
            .subscribe((layout: string) => (this.layout = layout));

        this.sidebarState$ = this.stateService
            .onSidebarState()
            .subscribe((sidebar: string) => {
                this.sidebar = sidebar;
            });

        const isBp = this.bpService.getByName('is');
        this.menuClick$ = this.menuService
            .onItemSelect()
            // .withLatestFrom(this.themeService.onMediaQueryChange())
            // .delay(20)
            .subscribe(
                () => {
                    // original collapse condition
                    // if (bpTo.width <= isBp.width) {
                    //   this.sidebarService.collapse('menu-sidebar');
                    // }

                    // collapse on web and mobile
                    this.sidebarService.collapse('menu-sidebar');
                },
            );
    }

    ngOnDestroy() {
        this.layoutState$.unsubscribe();
        this.sidebarState$.unsubscribe();
        this.menuClick$.unsubscribe();
    }
}
