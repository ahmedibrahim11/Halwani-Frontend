import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-add-portal-group',
  templateUrl: './add-portal-group.component.html',
  styleUrls: ['./add-portal-group.component.css']
})
export class AddPortalGroupComponent implements OnInit {
 createloader: Boolean = false;

  settingID: any = undefined;
  createSettingsFormGroup: FormGroup;
 
  updateSettingsFormGroup: FormGroup;
  name:any;
  description:any;
  viewAdd: boolean = false;
  durationInSeconds: any = 3;
  productCategory: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HTTPMainServiceService,
    public dialogRef: MatDialogRef<AddPortalGroupComponent>,
    public service: TicketCreationService,
    public dialog: MatDialog,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.settingID = data ? data.updateValue : undefined;
    console.log(this.settingID);
  }

  ngOnInit(): void {
    this.createSettingsFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
     
    });
console.log(this.createSettingsFormGroup.valid)
    //update
    if(this.settingID!=undefined)
    {
      this.http.GET(`Group/GetForEdit/${this.settingID}`).subscribe(data=>{
        this.name=data["name"],
        this.description=data["description"]
      })
    }
    this.updateSettingsFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
     
    });
  }


  submitCreatePC() {
    
    
    this.http.POST('Group/createOne', {name:this.createSettingsFormGroup.value.name,description:this.createSettingsFormGroup.value.description}).subscribe(
      (data) => {
        this.createloader = false;

        console.log('create setting');
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.dialog.closeAll();

        this.service.setValue(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      }
    );
  }
 
submitEditPC() {
    
    
    this.http.PUT('Group/Edit', {name:this.updateSettingsFormGroup.value.name,description:this.updateSettingsFormGroup.value.description,id:this.settingID}).subscribe(
      (data) => {
        this.createloader = false;

        console.log('create setting');
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.dialog.closeAll();

        this.service.setValue(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      }
    );
  }
 
  
  
 
}
