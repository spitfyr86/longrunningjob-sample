import { Component, Input } from '@angular/core';
import { FooterLink } from '../../../_shared/models';

@Component({
    selector: 'ngx-footer-v2',
    templateUrl: './footer-v2.component.html',
    styleUrls: ['./footer-v2.component.scss'],
})
export class FooterV2Component {

    socialLinks: FooterLink[] = [
        {
            label: 'Facebook',
            link: 'http://www.facebook.com/buildtechnologygroup',
            icon: 'facebook',
        },
        {
            label: 'LinkedIn',
            link: 'http://www.linkedin.com/company/build-technology-group',
            icon: 'linkedin',
        },
        {
            label: 'Twitter',
            link: 'http://www.twitter.com/BuildTechGroup',
            icon: 'twitter',
        },
    ];

    constructor() { }


}
