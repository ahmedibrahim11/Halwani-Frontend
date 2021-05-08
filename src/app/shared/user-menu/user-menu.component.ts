import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  constructor(private router: Router) {}
  userLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
