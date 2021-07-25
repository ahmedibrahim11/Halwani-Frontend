import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  role:any;
  constructor(private router: Router) {}

  ngOnInit(): void {
   this.role=localStorage.getItem("role");
  }

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
