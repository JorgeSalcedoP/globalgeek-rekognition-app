import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from '../../../layout/admin/navigation/navigation';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() type: string;

  public navigation: any;
  breadcrumbList: Array<any> = [];
  public navigationList: Array<any> = [];

  constructor(private route: Router, public nav: NavigationItem, private titleService: Title) {
    this.navigation = this.nav.get();
    this.type = 'theme2';
    this.setBreadcrumb();
  }

  ngOnInit() {
    let routerUrl: string;
    routerUrl = this.route.url;
    if (routerUrl && typeof routerUrl === 'string') {
      this.filterNavigation(routerUrl);
    }
  }

  setBreadcrumb() {
    let routerUrl: string;
    this.route.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;
        const activeLink = router.url;
        this.filterNavigation(activeLink);
      }
    });
  }

  filterNavigation(activeLink) {
    let result = [];
    let title = 'Welcome';
    this.navigation.forEach((a) => {
      if (a.type === 'item' && 'url' in a && (('/admin/' + a.url) === activeLink || ('/user/' + a.url) === activeLink)) {
        result = [
          {
            url: ('url' in a) ? a.url : false,
            title: a.title,
            breadcrumbs: ('breadcrumbs' in a) ? a.breadcrumbs : true,
            type: a.type
          }
        ];
        title = a.title;
      } else {
        if (a.type === 'group' && 'children' in a) {
          a.children.forEach((b) => {
            if (b.type === 'item' && 'url' in b && (('/admin/' + b.url) === activeLink || ('/user/' + b.url) === activeLink)) {
              result = [
                {
                  url: ('url' in b) ? b.url : false,
                  title: b.title,
                  breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                  type: b.type
                }
              ];
              title = b.title;
            } else {
              if (b.type === 'collapse' && 'children' in b) {
                b.children.forEach((c) => {
                  if (c.type === 'item' && 'url' in c && (('/admin/' + c.url) === activeLink || ('/user/' + c.url) === activeLink)) {
                    result = [
                      {
                        url: ('url' in b) ? b.url : false,
                        title: b.title,
                        breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                        type: b.type
                      },
                      {
                        url: ('url' in c) ? c.url : false,
                        title: c.title,
                        breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                        type: c.type
                      }
                    ];
                    title = c.title;
                  } else {
                    console.log(activeLink);
                    if(activeLink != '/admin' && activeLink != '/user'){
                      result = [
                        {
                          url: ('url' in b) ? b.url : false,
                          title: b.title,
                          breadcrumbs: ('breadcrumbs' in b) ? b.breadcrumbs : true,
                          type: b.type
                        },
                        {
                          url: ('url' in c) ? c.url : false,
                          title: 'Editar ' + b.title,
                          breadcrumbs: ('breadcrumbs' in c) ? c.breadcrumbs : true,
                          type: c.type
                        }
                      ];
                      title = c.title;
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
    this.navigationList = result;
    this.titleService.setTitle(title + ' | Flat Able Angular 9+ Admin Template');
  }

}