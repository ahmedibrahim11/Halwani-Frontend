import { Component, OnInit } from '@angular/core';
import {MatIconModule  } from "@angular/material/icon";
import {MatFormFieldModule  } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginDTO } from "../core/DTOs/userLoginDTO";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide = true;
UserViewInfoObject: UserLoginDTO = new UserLoginDTO();
  UserViewInfoFormGroup: FormGroup;


  constructor( private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {
     this.UserViewInfoFormGroup = this.formBuilder.group({

      
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }
submitLogin()
{
  console.log(this.UserViewInfoFormGroup.value );
  if(this.UserViewInfoFormGroup.valid)
  {
    ///navigate depending on credentials
  }
}
}
