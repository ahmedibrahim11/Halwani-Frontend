import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements OnInit {
  constructor() {}

  nameInitials: any;
  token: any;
  userName: any;
  userRole: any;

  getRedMenuCharacters() {
    let allName = this.userName.split(' ');
    this.nameInitials = this.initials(allName[0]);
  }
  ngOnInit(): void {
    this.getTokenPayloads();
    this.getRedMenuCharacters();
  }
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
    this.userName =
      JSON.parse(jsonPayload)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    this.userRole =
      JSON.parse(jsonPayload)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
  }
  initials(name) {
    console.log(name);
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
}
