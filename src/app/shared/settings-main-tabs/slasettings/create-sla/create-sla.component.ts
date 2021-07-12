import { Component, Inject, OnInit, Optional,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriorityEnum } from 'src/app/core/DTOs/ticketListingDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-create-sla',
  templateUrl: './create-sla.component.html',
  styleUrls: ['./create-sla.component.css']
})
export class CreateSLAComponent implements OnInit,AfterViewInit {
settingID:any=undefined;
  teamSoruce:any=[];
    priorityList: any = [];
    ProductCategoryList: any = [];
createSettingsFormGroup:FormGroup;
updateSettingsFormGroup:FormGroup;

slaType:any;
slaDuration:any;
 durationInSeconds: any = 3;
  team: any;
  productCategory: any;
  priority: any;
  constructor(private formBuilder: FormBuilder, private http: HTTPMainServiceService,public dialogRef: MatDialogRef<CreateSLAComponent>,
    public service: TicketCreationService,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,) {
         this.settingID = data ? data.updateValue : undefined;
     }

  ngOnInit(): void {
    
    const priKeys = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'string'
    );
    priKeys.map((k) => this.priorityList.push(PriorityEnum[k as any]));

     this.http.GET('Category/getCategory').subscribe((data) => {
      this.ProductCategoryList = data;
      
    });
     this.http.GET('Team/get').subscribe((data) => {
      this.teamSoruce = data.map((el) => {
        return { label: el.text, value: el.text };
      });
    })
     this.createSettingsFormGroup=this.formBuilder.group({
      slaType:['',[Validators.required]],
      slaDuration:[0,[Validators.required]],
       team:['',[Validators.required]],
       priority:['',[Validators.required]],
      
      workingDays:['',[Validators.required]],
     workingHours:['',[Validators.required]],

     productCategory:['',[Validators.required]],
     
    })
    //for edit
this.updateSettingsFormGroup=this.formBuilder.group({
slaType:['',[Validators.required]],
      slaDuration:['',[Validators.required]],
       team:['',[Validators.required]],
       priority:['',[Validators.required]],
      workingDays:['',[Validators.required]],
     workingHours:['',[Validators.required]],
     productCategory:['',[Validators.required]],
       })


  }
  ngAfterViewInit()
  {
    
     this.http.GET(`SLA/GetForEdit/${parseInt(this.settingID)}`).subscribe((data) => {
       debugger;
       console.log("a7aaaaaa",data);
       var workingCalendar=data.workingHours=="9,17"?0:data.workingHours=="17,1"?1:2
       var workingDaysForGet=data.workingDays.split(",").map(el=> parseInt(el));
       console.log(workingDaysForGet)
       console.log(workingCalendar)
       console.log("dataaaaaa",data);
       this.slaType=data.slaType;
       this.slaDuration=data.slaDuration;
       this.team=data.teamName;
       this.productCategory=data.productCategoryName;
       this.priority=data.priority;
       this.updateSettingsFormGroup.controls["workingHours"].setValue(workingCalendar);
       this.updateSettingsFormGroup.controls["workingDays"].setValue(workingDaysForGet);
    })
  }
submitCreateSLA()
{""
  console.log(this.createSettingsFormGroup.value);
  debugger;
   const backendObj={
     slaType:this.createSettingsFormGroup.value.slaType,
     priority:this.createSettingsFormGroup.value.priority,
     teamName:this.createSettingsFormGroup.value.team,
     workingHours:this.createSettingsFormGroup.value.workingHours==0?"9,17":this.createSettingsFormGroup.value.workingHours==1?"17,1":"1,9",
     workingDays:this.createSettingsFormGroup.value.workingDays.join(),
     slaDuration:this.createSettingsFormGroup.value.slaDuration,
     productCategoryName:this.createSettingsFormGroup.value.productCategory
   }
    this.http.POST('SLA/Create',backendObj).subscribe(
      (data) => {
        console.log('create setting');
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
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
submitUpdateSLA()
{
  console.log(this.createSettingsFormGroup.value);
   const backendObj={
     id:this.settingID,
     slaType:this.updateSettingsFormGroup.value.slaType,
     priority:this.updateSettingsFormGroup.value.priority,
     teamName:this.updateSettingsFormGroup.value.team,
     workingHours:this.updateSettingsFormGroup.value.workingHours==0?"9,17":this.updateSettingsFormGroup.value.workingHours==1?"17,1":"1,9",
     workingDays:this.updateSettingsFormGroup.value.workingDays.join(),
     slaDuration:this.updateSettingsFormGroup.value.slaDuration,
     productCategoryName:this.updateSettingsFormGroup.value.productCategory
   }
    this.http.PUT('SLA/Edit',backendObj).subscribe(
      (data) => {
        console.log('create setting');
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
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
