import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  @Input() showSidenav: boolean;
  @Input() showCard: boolean;
  showChip: boolean;
  userName: string;

  constructor(private authService:AuthService , private router: Router) {}

  ngOnInit() {
    this.userName = this.authService.userDataChanged.value['userName'];
  }

  onHeaderClick() {
    this.showSidenav = !this.showSidenav;
    this.toggleSideNav.emit(this.showSidenav);
  }

  onShowChip(){
    this.showChip = !this.showChip;
  }

  onLogout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['./login']);
  }
}
