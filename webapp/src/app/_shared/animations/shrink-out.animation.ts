import { trigger, state, animate, transition, style } from '@angular/animations';

export const shrinkOutAnimation =
    trigger('shrinkOut', [
        state('in', style({height: '*'})),
        transition('* => void', [
          style({height: '*'}),
          animate(250, style({height: 0})),
        ]),
    ]);
