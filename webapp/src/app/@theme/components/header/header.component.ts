import { Component, OnDestroy, OnInit, Input, NgZone } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();

    @Input() position = 'normal';

    user: any;

    userMenu = [
        { title: 'Profile', link: '/wps/profile' },
        { title: 'Sign out' },
    ];

    isHomePage: boolean = false;
    borderless: string = '';

    constructor(private sidebarService: NbSidebarService,
        private layoutService: LayoutService,
        private menuService: NbMenuService,
        private ngZone: NgZone,
        private router: Router) {

        if (location.href.includes('home')) {
            this.isHomePage = true;
            this.borderless = 'borderless';
        }
    }

    ngOnInit() {
    }

    toggleSidebar(): boolean {
        // this.sidebarService.toggle(true, 'menu-sidebar');
        // return false;
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();

        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }

    goToHome() {
        // this.menuService.navigateHome();
        this.ngZone.run(() => this.router.navigateByUrl('/home'));
    }

    startSearch() {
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
