import {
  Component,
  Inject,
  OnInit,
  Optional,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PriorityEnum } from 'src/app/core/DTOs/ticketListingDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { MatDialog } from '@angular/material/dialog';

enum StatusEnum {
  Created,
  Assigned,
  WaitingResponse,
  WaitingSupport,
  InProgress,
  Esclated,
  Reopened,
  Resolved,
  OverDue,
}
@Component({
  selector: 'app-create-sla',
  templateUrl: './create-sla.component.html',
  styleUrls: ['./create-sla.component.css'],
})
export class CreateSLAComponent implements OnInit, AfterViewInit {
  createloader: Boolean = false;

  settingID: any = undefined;
  teamSoruce: any = [];
  priorityList: any = [];
  ProductCategoryList: any = [];
  createSettingsFormGroup: FormGroup;
  updateSettingsFormGroup: FormGroup;

  slaType: any;
  slaDuration: any;
  durationInSeconds: any = 3;
  team: any;
  requestType: any;
  priority: any;
  status: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HTTPMainServiceService,
    public dialogRef: MatDialogRef<CreateSLAComponent>,
    public service: TicketCreationService,
    public dialog: MatDialog,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.settingID = data ? data.updateValue : undefined;
  }
  enumSelector(definition) {
    return Object.keys(definition)
      .filter((k) => typeof StatusEnum[k as any] === 'number')
      .map((key) => ({ value: definition[key], title: key }));
  }
  ngOnInit(): void {
    this.status = this.enumSelector(StatusEnum);
    const priKeys = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'string'
    );
    priKeys.map((k) => this.priorityList.push(PriorityEnum[k as any]));

    this.http.GET('RequestType/getRequestType').subscribe((data) => {
      this.ProductCategoryList = data;
    });
    this.http.GET('Team/get').subscribe((data) => {
      this.teamSoruce = data.map((el) => {
        return { label: el.text, value: el.text };
      });
    });
    this.createSettingsFormGroup = this.formBuilder.group({
      slaType: ['', [Validators.required]],
      slaDuration: [0, [Validators.required]],
      team: ['', [Validators.required]],
      priority: ['', [Validators.required]],

      StartCounting: ['', [Validators.required]],
      EndsCounting: ['', [Validators.required]],
      workingHours: ['', [Validators.required]],

      requestType: ['', [Validators.required]],
    });
    //for edit
    this.updateSettingsFormGroup = this.formBuilder.group({
      slaType: ['', [Validators.required]],
      slaDuration: [0, [Validators.required]],
      team: ['', [Validators.required]],
      priority: ['', [Validators.required]],

      StartCounting: ['', [Validators.required]],
      EndsCounting: ['', [Validators.required]],
      workingHours: ['', [Validators.required]],

      requestType: ['', [Validators.required]],
    });
  }
  ngAfterViewInit() {
    this.http
      .GET(`SLA/GetForEdit/${parseInt(this.settingID)}`)
      .subscribe((data) => {
        debugger;
        console.log('a7aaaaaa', data);
        var workingCalendar =
          data.workingHours == '9,17' ? 0 : data.workingHours == '17,1' ? 1 : 2;
        var Opening = data.openStatus.split(',').map((el) => parseInt(el));
        var Closing = data.closeStatus.split(',').map((el) => parseInt(el));

        this.slaType = data.slaType;
        this.slaDuration = data.slaDuration;
        this.team = data.teamName;
        this.requestType = data.requestType;
        this.priority = data.priority;
        this.updateSettingsFormGroup.controls['workingHours'].setValue(
          workingCalendar
        );
        this.updateSettingsFormGroup.controls['StartCounting'].setValue(
          Opening
        );
        this.updateSettingsFormGroup.controls['EndsCounting'].setValue(Closing);
      });
  }
  submitCreateSLA() {
    this.createloader = true;

    ('');
    console.log(this.createSettingsFormGroup.value);
    debugger;
    const backendObj = {
      slaType: this.createSettingsFormGroup.value.slaType,
      priority: this.createSettingsFormGroup.value.priority,
      workingHours:
        this.createSettingsFormGroup.value.workingHours == 0
          ? '9,17'
          : this.createSettingsFormGroup.value.workingHours == 1
          ? '17,1'
          : '1,9',
      requestType: this.createSettingsFormGroup.value.requestType,

      openStatus: this.createSettingsFormGroup.value.StartCounting.join(),
      closeStatus: this.createSettingsFormGroup.value.EndsCounting.join(),
      slaDuration: this.createSettingsFormGroup.value.slaDuration,
    };
    this.http.POST('SLA/Create', backendObj).subscribe(
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
  submitUpdateSLA() {
    this.createloader = true;

    console.log(this.updateSettingsFormGroup.value);
    const backendObj = {
      id: this.settingID,
      slaType: this.updateSettingsFormGroup.value.slaType,
      priority: this.updateSettingsFormGroup.value.priority,
      workingHours:
        this.updateSettingsFormGroup.value.workingHours == 0
          ? '9,17'
          : this.updateSettingsFormGroup.value.workingHours == 1
          ? '17,1'
          : '1,9',
      requestType: this.updateSettingsFormGroup.value.requestType,

      openStatus: this.updateSettingsFormGroup.value.StartCounting.join(),
      closeStatus: this.updateSettingsFormGroup.value.EndsCounting.join(),
      slaDuration: this.updateSettingsFormGroup.value.slaDuration,
    };
    this.http.PUT('SLA/Edit', backendObj).subscribe(
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
