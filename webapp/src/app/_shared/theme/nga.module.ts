import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    BaThemeConfig,
} from './theme.config';

import {
    BaThemeConfigProvider,
} from './theme.configProvider';

import {
    BaAmChart,
} from './components';


import {
    BaThemeRun,
} from './directives';


import {
    BaThemePreloader,
} from './services';

const NGA_COMPONENTS = [
    BaAmChart,
];

const NGA_DIRECTIVES = [
    BaThemeRun,
];
const NGA_SERVICES = [
    BaThemePreloader,
];

@NgModule({
    declarations: [
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS,
    ],
})

export class NgaModule {
    static forRoot(): ModuleWithProviders<NgaModule> {
        return {
            ngModule: NgaModule,
            providers: [
                BaThemeConfigProvider,
                BaThemeConfig,
                ...NGA_SERVICES,
            ],
        };
    }
}

// export class NgaModule {
//     static forRoot(): ModuleWithProviders {
//         // tslint:disable-next-line
//         return <ModuleWithProviders>{
//             ngModule: NgaModule,
//             providers: [
//                 BaThemeConfigProvider,
//                 BaThemeConfig,
//                 ...NGA_SERVICES
//             ]
//         };
//     }
// }
