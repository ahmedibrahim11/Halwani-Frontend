import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent implements OnInit {
 constructor(private router: Router) {}

  ngOnInit(): void {}

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
  fromManager() {
    return window.location.href.includes('/itmanager');
  }

  userLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
