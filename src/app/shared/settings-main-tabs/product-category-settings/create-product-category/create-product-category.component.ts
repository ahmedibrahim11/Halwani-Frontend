import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrls: ['./create-product-category.component.css']
})
export class CreateProductCategoryComponent implements OnInit {

settingID:any=undefined;
createSettingsFormGroup:FormGroup;
   checkArray: FormArray=new FormArray([]);
updateSettingsFormGroup:FormGroup;
viewAdd:boolean=false
 durationInSeconds: any = 3;
 productCategory:any='';
  constructor(private formBuilder: FormBuilder, private http: HTTPMainServiceService,public dialogRef: MatDialogRef<CreateProductCategoryComponent>,
    public service: TicketCreationService,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,) {
       this.settingID = data ? data.updateValue : undefined;
       console.log(this.settingID)
     }

  ngOnInit(): void {
    this.createSettingsFormGroup=this.formBuilder.group({
      productCategory:['',[Validators.required]],
      subCategories:this.formBuilder.array([]),
      subCategoryName:[''],
      sign:[''],
      goal:['']
    })

    //update
    this.updateSettingsFormGroup=this.formBuilder.group({
      id:[''],
      productCategory:['',[Validators.required]],
      subCategories:this.formBuilder.array([]),
      subCategoryName:[''],
      subCategoryID:[''],
      sign:[''],
      goal:[''],
    })
    
  }

 ngAfterViewInit()
 {
 this.http.GET(`Category/GetForEdit/${this.settingID}`).subscribe(data=>{
   this.productCategory=data.parentCategory
   this.updateSettingsFormGroup.patchValue({productCategory:data.parentCategory});
   this.updateSettingsFormGroup.patchValue({id:data.parentCategoryId});
   
      
    data.subCategory.map(el=>{
      this.checkArray.value.push({id:new FormControl(el.subCategoryId),subCategoryName:new FormControl(el.subCategoryName),goal:el.goal!=null?el.goal<0?new FormControl(el.goal*-1):new FormControl(el.goal):new FormControl(0),sign:el.goal>=0?new FormControl(0):new FormControl(1),isDeleted:new FormControl(el.isDeleted)});
    })

 })
 }
  public viewAddGroup() {
  this.viewAdd=true;
}
submitCreatePC()
{
  console.log(this.createSettingsFormGroup.value);
  let arr=[];
  let subarr=[];
  this.checkArray.value.map(el=>
    subarr.push({subCategoryName:el.subCategoryName.value,goal:el.sign.value=="1"?(el.goal.value*-1):(el.goal.value)}))
  arr.push({parentCategory:this.createSettingsFormGroup.value.productCategory,
    subCategory:subarr});
    console.log(arr)
    this.http.POST('Category/create',arr).subscribe(
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
submitEditPC()
{
   console.log(this.updateSettingsFormGroup.value);
  let arr={};
  let subarr=[];
  this.checkArray.value.map(el=>
    subarr.push({subCategoryId:el.id.value==""?0:el.id.value,subCategoryName:el.subCategoryName.value,goal:el.sign.value=="1"?(el.goal.value*-1):(el.goal.value),isDeleted:el.isDeleted.value}))
  arr={parentCategory:this.updateSettingsFormGroup.value.productCategory,parentCategoryId:this.updateSettingsFormGroup.value.id,
    subCategory:subarr};
    console.log(arr)
    this.http.PUT('Category/edit',arr).subscribe(
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
 
public addGroup(type) {
  if(type==0)
  {
  if(this.createSettingsFormGroup.value.subCategoryName!=""&&this.createSettingsFormGroup.value.goal!="")
  {
   this.checkArray = this.createSettingsFormGroup.get('subCategories') as FormArray;
   this.checkArray.value.push({subCategoryName:new FormControl(this.createSettingsFormGroup.value.subCategoryName),goal:new FormControl(this.createSettingsFormGroup.value.goal),sign:new FormControl(this.createSettingsFormGroup.value.sign)});
     console.log(this.checkArray.value)
  this.createSettingsFormGroup.patchValue({subCategoryName:''});
  this.createSettingsFormGroup.patchValue({goal:''});
  this.createSettingsFormGroup.patchValue({sign:''});

  }
}
else{
  debugger;
  if(this.updateSettingsFormGroup.value.subCategoryName!=""&&this.updateSettingsFormGroup.value.goal!="")
  {
   var itemToEdit=this.checkArray.value.filter(r=>r.id.value==this.updateSettingsFormGroup.value.subCategoryID)
   if(itemToEdit.length==0)
   {
   this.checkArray.value.push({id:new FormControl(this.updateSettingsFormGroup.value.subCategoryID),subCategoryName:new FormControl(this.updateSettingsFormGroup.value.subCategoryName),goal:new FormControl(this.updateSettingsFormGroup.value.goal),sign:new FormControl(this.updateSettingsFormGroup.value.sign),isDeleted:new FormControl(false)});
   }
   else
   {
     itemToEdit[0].subCategoryName=new FormControl(this.updateSettingsFormGroup.value.subCategoryName);
     itemToEdit[0].goal=new FormControl(this.updateSettingsFormGroup.value.goal)
     itemToEdit[0].sign=new FormControl(this.updateSettingsFormGroup.value.sign)
     itemToEdit[0].isDeleted=new FormControl(false)
   }
  this.updateSettingsFormGroup.patchValue({subCategoryName:''});
  this.updateSettingsFormGroup.patchValue({goal:''});
  this.updateSettingsFormGroup.patchValue({sign:''});
  this.updateSettingsFormGroup.patchValue({subCategoryID:''});

  }
}
  console.log(this.checkArray.value.length)
  this.viewAdd=false;
}

/**
 * removeGroup
 */
public removeGroup(name,value) {
  let selected=this.checkArray.value.findIndex(el=>el.subCategoryName.value==name&&el.goal.value==value);
  if(selected!=-1)
  {
    this.checkArray.value.splice(selected,1)
  }

  
}
public removePreAddedGroup(name,value) {
  let selected=this.checkArray.value.findIndex(el=>el.subCategoryName.value==name&&el.goal.value==value);
  if(selected!=-1)
  {
    debugger;
    this.checkArray.value[selected].isDeleted.value=true;
  }

  
}
public removeThroughAdd()
{
   this.createSettingsFormGroup.patchValue({subCategoryName:''});
  this.createSettingsFormGroup.patchValue({goal:''});
  this.createSettingsFormGroup.patchValue({sign:''});
     this.updateSettingsFormGroup.patchValue({subCategoryName:''});
  this.updateSettingsFormGroup.patchValue({goal:''});
  this.updateSettingsFormGroup.patchValue({sign:''});

    this.viewAdd=false;
}
public editGroup(name,value,type)
{
  debugger;
  let selected=this.checkArray.value.findIndex(el=>el.subCategoryName.value==name&&el.goal.value==value);
  if(type==0)
  {
  this.createSettingsFormGroup.patchValue({subCategoryName:this.checkArray.value[selected].subCategoryName.value});
  this.createSettingsFormGroup.patchValue({goal:this.checkArray.value[selected].goal.value});
  this.createSettingsFormGroup.patchValue({sign:this.checkArray.value[selected].sign});
  }
  else
  {
     this.updateSettingsFormGroup.patchValue({subCategoryID:this.checkArray.value[selected].id.value});
    this.updateSettingsFormGroup.patchValue({subCategoryName:this.checkArray.value[selected].subCategoryName.value});
  this.updateSettingsFormGroup.patchValue({goal:this.checkArray.value[selected].goal.value});
  this.updateSettingsFormGroup.patchValue({sign:this.checkArray.value[selected].sign.value});
  
  }
  if(selected!=-1)
  {
    this.checkArray.value.splice(selected,1)
  }
  this.viewAdd=true;
  
}
}
