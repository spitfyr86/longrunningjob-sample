import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WpsComponent } from './wps.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: WpsComponent,
        children: [
            {
              path: '**',
              component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WpsRoutingModule { }
