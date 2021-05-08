import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  token: any;
  userName: any;
  userRole: any;
  firstCharacter: any;
  secondCharacter: any;

  getTokenPayloads() {
    this.token = localStorage.getItem('userData');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this.userName = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
    this.userRole = JSON.parse(jsonPayload)[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }

  getRedMenuCharacters() {
    let allName = this.userName.split(' ');
    this.firstCharacter = allName[0].charAt(0);
    this.secondCharacter = allName[1].charAt(0);
  }
  ngOnInit(): void {
    this.getTokenPayloads();
    this.getRedMenuCharacters();
  }

  initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
}
