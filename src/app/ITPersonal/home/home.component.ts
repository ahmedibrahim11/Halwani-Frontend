import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(
     private router: Router
     ) { }

  ngOnInit(): void {
    debugger;
  }


}
