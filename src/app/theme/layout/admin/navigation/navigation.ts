import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'ui-element',
    title: 'MANTENIMIENTO',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'users-lu',
        title: 'Usuarios',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'users',
            title: 'Listar Usuarios',
            type: 'item',
            url: 'users',
          },
          {
            id: 'new-user',
            title: 'Nuevo Usuario',
            type: 'item',
            url: 'user/nuevo'
          },
        ]
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
