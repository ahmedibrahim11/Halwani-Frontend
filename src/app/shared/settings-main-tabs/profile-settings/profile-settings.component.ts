import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  userName: any;
  userRole: any;
  userEmail: any;
  userTeam: any;
  token: any;
  userInitials: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getTokenPayloads();
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
    this.userEmail =
      JSON.parse(jsonPayload)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    this.userTeam = JSON.parse(jsonPayload)['Teams'];
    this.userRole =
      JSON.parse(jsonPayload)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    this.userInitials = this.initials(this.userName);
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
