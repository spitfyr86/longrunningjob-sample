import { Component } from '@angular/core';

@Component({
    selector: 'ngx-one-column-layout',
    styleUrls: ['./one-column.layout.scss'],
    template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <span class="created-by">© Copyright <b><a href="#" target="_blank">Build Technology Group</a></b> 2023</span>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent { }
