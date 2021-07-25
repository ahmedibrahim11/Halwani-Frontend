import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { PriorityEnum, SevirityEnum } from 'src/app/core/DTOs/ticketListingDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SettingDTO } from "src/app/core/DTOs/settingDTO";
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.css']
})
export class AddSettingsComponent implements OnInit {
  severities = new FormControl();
  severityList: any = [];
  priorities = new FormControl();
  priorityList: any = [];
  groups: any = [];
  settingID: any = undefined;
  createSettingsFormGroup: FormGroup;
  UpdateSettingsFormGroup: FormGroup;
  FileLinks: any = [];
  viewAdd: Boolean = false;
  secondPage: Boolean = false;
  formData: FormData = new FormData();
  updateFormData: FormData = new FormData();
  checkArray: FormArray = new FormArray([]);
  teamSoruce: any = [];
  settingDTO: SettingDTO = new SettingDTO();
  durationInSeconds: any = 3;
  loading: any = true;
  constructor(private formBuilder: FormBuilder,
    private http: HTTPMainServiceService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddSettingsComponent>,
    public service: TicketCreationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,) {
    this.settingID = data ? data.updateValue : undefined;
  }

  ngOnInit(): void {
    this.http.GET('Team/get').subscribe((data) => {
      this.teamSoruce = data.map((el) => {
        return { label: el.text, value: el.text };
      });
    })
    const sevKeys = Object.keys(SevirityEnum).filter(
      (k) => typeof SevirityEnum[k as any] === 'string'
    );
    sevKeys.map((k) => this.severityList.push(SevirityEnum[k as any]));

    console.log('seeeeeeev', this.severityList);
    const priKeys = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'string'
    );
    priKeys.map((k) => this.priorityList.push(PriorityEnum[k as any]));
    //create
    this.createSettingsFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: [0, [Validators.required]],
      team: [0, [Validators.required]],
      priority: [0, [Validators.required]],
      sevirity: [0, [Validators.required]],
      groups: this.formBuilder.array([]),
      groupName: [''],
    })
    this.UpdateSettingsFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: [0, [Validators.required]],
      team: [0, [Validators.required]],
      priority: [0, [Validators.required]],
      sevirity: [0, [Validators.required]],
      groups: this.formBuilder.array([]),
      groupName: [''],
    })
    if (this.settingID != undefined) {
      this.http.POST(`RequestType/GetRequestType`, { id: this.settingID }).subscribe(data => {
        this.UpdateSettingsFormGroup = this.formBuilder.group({
          name: [data.title, [Validators.required]],
          description: [data.description, [Validators.required]],
          type: [data.ticketType, [Validators.required]],
          team: [data.team, [Validators.required]],
          priority: [data.priority, [Validators.required]],
          sevirity: [data.sevirity, [Validators.required]],
          groups: this.formBuilder.array([data.groupIDs]),
          groupName: [''],
        })
        this.loading = false;
        this.FileLinks.push(data.icon)
        this.http.POST(`Group/getGroupforTicketTypeEdit`, { id: this.UpdateSettingsFormGroup.value.type, rtid: this.settingID }).subscribe(data => {
          this.groups = data;
        })
      })
    }


  }

  onCreateCheckboxChange(e) {
    debugger;
    this.checkArray = this.createSettingsFormGroup.get('groups') as FormArray;
    debugger;
    if (e.checked) {
      this.checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.source.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }
  }
  private deleteImage(url: any): void {
    this.FileLinks = this.FileLinks.filter((a) => a !== url);
    this.formData.delete(url);
    this.updateFormData.delete(url);
    console.log('formdata', this.formData);
    console.log('after deleted', this.FileLinks);
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], value: any) {
    console.log('valueee', value, files);
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log('eeee', file);
          if (value === 0) {
            this.formData.append(file.name, file);
            console.log('insert', this.formData);
            this.FileLinks.push(file.name);
            console.log('fillllll', this.FileLinks);
          } else {
            this.updateFormData.append(file.name, file);
            this.FileLinks.push(file.name);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    console.log('files uploaded', files);
  }

  public fileOver(event) {
    alert('ovvver');
    console.log(event);
  }

  public fileLeave(event) {
    alert('leaaave');
    console.log(event);
  }
  public getGroups() {
    console.log(this.createSettingsFormGroup.value)
    let type = this.settingID != '' ? this.createSettingsFormGroup.value.type : this.UpdateSettingsFormGroup.value.type;
    if (this.settingID === undefined) {
      this.http.POST(`Group/getGroupforTicketType`, { id: type }).subscribe((data) => {
        console.log(data)

        data.forEach(element => {
          if (!element.selected) {
            element.selected = false
          }
        });
        this.groups = data;

      });
    }
    this.secondPage = true;
  }
  public submitCreateSetting() {
    debugger; console.log(this.createSettingsFormGroup.value)
    this.settingDTO.description = this.createSettingsFormGroup.value.description;
    this.settingDTO.name = this.createSettingsFormGroup.value.name;
    this.settingDTO.teamName = this.createSettingsFormGroup.value.team;
    this.settingDTO.priority = this.createSettingsFormGroup.value.priority;
    this.settingDTO.severity = this.createSettingsFormGroup.value.severity;
    this.settingDTO.ticketType = this.createSettingsFormGroup.value.type;
    this.settingDTO.groupIds = this.createSettingsFormGroup.value.groups;
    var requestData = JSON.stringify(this.settingDTO);
    this.formData.append('data', requestData);
    this.http.POST('RequestType/CreateRequestType', this.formData).subscribe(
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
  public submitUpdateSetting() {
    debugger; console.log(this.UpdateSettingsFormGroup.value)

    this.settingDTO.description = this.UpdateSettingsFormGroup.value.description;
    this.settingDTO.name = this.UpdateSettingsFormGroup.value.name;
    this.settingDTO.teamName = this.UpdateSettingsFormGroup.value.team;
    this.settingDTO.priority = this.UpdateSettingsFormGroup.value.priority;
    this.settingDTO.severity = this.UpdateSettingsFormGroup.value.severity;
    this.settingDTO.ticketType = this.UpdateSettingsFormGroup.value.type;
    this.settingDTO.groupIds = this.checkArray.value;
    this.settingDTO.id = this.settingID;
    var requestData = JSON.stringify(this.settingDTO);
    this.updateFormData.append('data', requestData);
    this.http.PUT('RequestType/UpdateRequestType', this.updateFormData).subscribe(
      (data) => {
        console.log('update setting');
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
  public goBack() {
    this.secondPage = false;
  }
  /**
   * addGroup
   */
  public viewAddGroup() {
    this.viewAdd = true;
  }
  /**
   * addGroup
   */
  public addGroup() {
    debugger;
    this.http.POST(`Group/createOne`, { name: this.createSettingsFormGroup.value.groupName }).subscribe(data => {
      this.groups.push({ id: data, name: this.createSettingsFormGroup.value.groupName, selected: true });
      this.createSettingsFormGroup.value.groups.push(data);

      this.createSettingsFormGroup.patchValue({ groupName: '' });
      console.log(this.createSettingsFormGroup.value);
      this.viewAdd = false;
    })
    console.log(this.createSettingsFormGroup.value.groupName)

  }
  /**
   * removeGroup
   */
  public removeGroup() {
    this.createSettingsFormGroup.patchValue({ groupName: '' });
    this.viewAdd = false;
  }
}

