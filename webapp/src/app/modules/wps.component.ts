import { Component } from '@angular/core';

import { NbMenuItemWithPermissions } from './wps-menu';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['./wps.component.scss'],
    template: `
    <nb-layout windowMode>
        <nb-layout-header fixed>
            <ngx-header></ngx-header>
        </nb-layout-header>

        <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
            <nb-menu [items]="menu"></nb-menu>
        </nb-sidebar>

        <nb-layout-column class="">
            <router-outlet></router-outlet>
        </nb-layout-column>
    </nb-layout>
  `,
})
export class WpsComponent {

    menu: NbMenuItemWithPermissions[] = [];

    constructor() { }
}
