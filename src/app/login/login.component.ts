import { Component, OnInit } from '@angular/core';
import {MatIconModule  } from "@angular/material/icon";
import {MatFormFieldModule  } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginDTO } from "../core/DTOs/userLoginDTO";
import { HTTPMainServiceService } from '../core/services/httpmain-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide = true;
UserViewInfoObject: UserLoginDTO = new UserLoginDTO();
  UserViewInfoFormGroup: FormGroup;


  constructor( private formBuilder: FormBuilder,
     private http:HTTPMainServiceService,
     private router:Router) {
    
   }

  ngOnInit(): void {
     this.UserViewInfoFormGroup = this.formBuilder.group({

      
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
submitLogin()
{
  console.log(this.UserViewInfoFormGroup.value );
  if(this.UserViewInfoFormGroup.valid)
  {
    this.http.POST(`Authentication/Login`,{
      userName:this.UserViewInfoFormGroup.value.email,
      password:this.UserViewInfoFormGroup.value.password
    }).subscribe(data=>
    {  console.log(data)
      localStorage.setItem("userData",JSON.stringify(data))
      switch (data.userProfile.roleEnum) {
        case 0:
          this.router.navigate(["/itmanager"])
          break;
          case 1:
          this.router.navigate(["/itpersonal"])
          break;
          case 2:
          this.router.navigate(["/user"])
          break;
      
      }
    })
    ///navigate depending on credentials
  }
}
}
