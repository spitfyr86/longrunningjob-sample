import { NbMenuItem } from '@nebular/theme';

export class NbMenuItemWithPermissions extends NbMenuItem {
    permission?: Permissions;
    children?: NbMenuItemWithPermissions[];
}

