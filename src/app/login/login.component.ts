import { Component, OnInit } from '@angular/core';
import {MatIconModule  } from "@angular/material/icon";
import {MatFormFieldModule  } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide = true;
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
