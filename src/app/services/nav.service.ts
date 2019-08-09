import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { NavItem } from 'src/app/shared/models/nav-item.model';
import { MENUURL } from '../shared/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnInit {
  currentUrl = new BehaviorSubject<string>(undefined);
  private selectedNavItem: NavItem;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {

  }

  getMenu(): Observable<any> {
    const {userId} = this.authService.userDataChanged.value;
    return this.http.get(`${MENUURL}${userId}`);
  }

  setSelectedNavItem(navItem: NavItem) {
    this.selectedNavItem = navItem;
  }

  getSelectedNavItem(): NavItem {
    // return the items of object not the reference
    return { ...this.selectedNavItem };
  }
}
