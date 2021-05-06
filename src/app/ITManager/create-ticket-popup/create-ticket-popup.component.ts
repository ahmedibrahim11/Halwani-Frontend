import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createTicketDTO } from '../../core/DTOs/createTicketDTO';
import { getTicketDTO } from '../../core/DTOs/getTicketDTO';

import { HTTPMainServiceService } from '../../core/services/httpmain-service.service';
import { TicketCreationService } from '../../core/services/ticket-creation.service';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { TicketListingDTO } from 'src/app/core/DTOs/ticketListingDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';

@Component({
  selector: 'app-create-ticket-popup',
  templateUrl: './create-ticket-popup.component.html',
  styleUrls: ['./create-ticket-popup.component.css'],
})
export class CreateTicketPopupComponent implements OnInit {
  createTicketDTO: createTicketDTO = new createTicketDTO();
  updateTicketDto: createTicketDTO = new createTicketDTO();
  getTicketDTO: getTicketDTO = new getTicketDTO();
  createTicketDTOFormGroup: FormGroup;
  formData: FormData = new FormData();
  updateFormData: FormData = new FormData();
  fromPage: any;
  updateStatus: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    public service: TicketCreationService,
    private share: SharingdataService,
    private tabs: TabscreationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTicketPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
    this.updateStatus = tabs.getTabValue();
  }

  private FileLinks;

  showSecondCategory: boolean = false;
  saveAndOpenAnother: boolean = false;
  @Input() ticketTypeDatasource;
  @Input() reporterDatasource;
  @Input() sourceDatasource;
  @Input() seviritysource;
  @Input() teamSoruce;
  @Input() productCategoryName1;
  @Input() productCategoryName2;

  ticketID: any;
  durationInSeconds: any = 3;

  //update-default-values
  ticketType: any;
  summary: any;
  attachement: any;
  filePath: any;
  fileName: any;
  description: any;
  teamName: any;
  reporter: any;
  source: any;
  ticketSeverity: any;
  priority: any;
  categoryName1: any;
  categoryName2: any;
  ticketList: TicketListingDTO = new TicketListingDTO();

  ngOnInit(): void {
    //update
    this.ticketID = this.share.getData();
    if (this.ticketID !== undefined) {
      this.http
        .POST('ticket/getTicket', { id: this.ticketID.toString() })
        .subscribe((res) => {
          console.log('res', res);
          this.http.GET('RequestType/getRequestType').subscribe((data) => {
            console.log('jdiuehfheuhf', this.updateStatus);
            if (this.updateStatus === undefined) {
              this.ticketTypeDatasource = data;
            } else {
              console.log('else');
              console.log('eeeeee', data);
              this.ticketTypeDatasource = data
                .filter((el1) => el1.ticketType === this.updateStatus)
                .map((el) => {
                  console.log(el);
                  return { ticketType: el.ticketType, topics: el.topics };
                });
            }
          });
          this.ticketType = res.requestType.name;
          this.summary = res.ticketName;
          this.attachement = res.attachement[0];
          this.imageurls.push({ base64String: this.attachement });

          this.filePath = this.attachement.split('/');
          this.fileName = this.filePath[4];
          this.description = res.description;
          this.teamName = res.teamName;
          this.reporter = res.submitterEmail;
          this.source = res.source;
          this.ticketSeverity = res.ticketSeverity;
          this.priority = res.priority;
          this.categoryName1 = res.productCategoryName1;
          this.categoryName2 = res.productCategoryName2;
        });

      this.share.setData(undefined);
    }

    //create
    this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: [0, [Validators.required]],
      summary: ['', [Validators.required]],
      description: [''],
      team: ['', [Validators.required]],
      reporter: [0, [Validators.required]],
      source: [0, [Validators.required]],
      sevirity: [0, [Validators.required]],
      priority: [0, [Validators.required]],
      productCategoryName1: [0],
      productCategoryName2: [0],
      saveAndOpenAnother: [false],
    });
    this.seviritysource = [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
    ];
    this.sourceDatasource = [
      { label: 'Mobile', value: 0 },
      { label: 'LapTop', value: 1 },
      { label: 'DeskTop', value: 2 },
    ];
    this.ticketTypeDatasource = [
      { label: 'Service Request', value: 0 },
      { label: 'Incident', value: 1 },
    ];

    this.http.GET('RequestType/getRequestType').subscribe((data) => {
      console.log(this.fromPage);
      if (this.fromPage === undefined) {
        this.ticketTypeDatasource = data;
      } else {
        console.log('else');
        console.log(data);
        this.ticketTypeDatasource = data
          .filter((el1) => el1.ticketType === this.fromPage)
          .map((el) => {
            console.log(el);
            return { ticketType: el.ticketType, topics: el.topics };
          });
      }
    });
    this.http.GET('User/getUser').subscribe((data) => {
      this.reporterDatasource = data.map((el) => {
        return {
          label: el.text,
          value: `${el.team},${el.email},${el.userName}`,
          initials: this.initials(el.text),
          label1: el.email,
        };
      });
    });

    this.http.GET('Team/get').subscribe((data) => {
      this.teamSoruce = data.map((el) => {
        return { label: el.text, value: el.text };
      });
    }),
      this.http.GET('Category/getCategory').subscribe((data) => {
        this.productCategoryName1 = data.map((el) => {
          return { label: el.text, value: el.id };
        });
      });
  }
  productCategoryOne(event) {
    this.http.GET('Category/getCategory').subscribe((data) => {
      this.productCategoryName2 = data
        .find((el) => {
          return el.id === event.value;
        })
        .children.map((el) => {
          return { label: el.text, value: el.id };
        });
    });

    this.showSecondCategory = true;
  }
  submiCreate() {
    console.log(this.createTicketDTOFormGroup.value);
    this.createTicketDTO.attachement =
      this.imageurls !== undefined ? this.imageurls.toString() : '';
    this.createTicketDTO.description = this.createTicketDTOFormGroup.value.description;
    this.createTicketDTO.productCategoryName1 = this.createTicketDTOFormGroup.value.productCategoryName1.toString();
    this.createTicketDTO.productCategoryName2 = this.createTicketDTOFormGroup.value.productCategoryName2.toString();
    let submitterArray = this.createTicketDTOFormGroup.value.reporter.split(
      ','
    );
    this.createTicketDTO.submitterTeam = submitterArray[0];
    this.createTicketDTO.submitterEmail = submitterArray[1];
    this.createTicketDTO.submitterName = submitterArray[2];
    this.createTicketDTO.summary = this.createTicketDTOFormGroup.value.summary;
    this.createTicketDTO.submitDate = new Date();
    this.createTicketDTO.requestTypeId = this.createTicketDTOFormGroup.value.ticketType;
    this.createTicketDTO.ticketSeverity = this.createTicketDTOFormGroup.value.sevirity;
    this.createTicketDTO.ticketStatus = 0;
    //will be from aad
    this.createTicketDTO.reportedSource = 'admin';
    this.createTicketDTO.teamName = this.createTicketDTOFormGroup.value.team;
    this.createTicketDTO.priority = this.createTicketDTOFormGroup.value.priority;
    this.createTicketDTO.source = this.createTicketDTOFormGroup.value.source;
    console.log('createDto', this.createTicketDTO);
    var requestData = JSON.stringify(this.createTicketDTO);
    this.formData.append('data', requestData);
    this.http.POST('Ticket/CreateTicket', this.formData).subscribe((data) => {
      console.log('create tickeet');
      this._snackBar.openFromComponent(ToastMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
      this.service.setValue(true);
    });
    if (this.createTicketDTOFormGroup.value.saveAndOpenAnother) {
      const dialogRef = this.dialog.open(CreateTicketPopupComponent, {
        data: { pageValue: this.fromPage },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  submitUpdate() {
    let submitterArray = this.createTicketDTOFormGroup.value.reporter.split(
      ','
    );
    console.log('a7mos', this.createTicketDTOFormGroup.value);
    this.updateTicketDto.attachement =
      this.imageurls !== undefined ? this.imageurls.toString() : '';
    this.updateTicketDto.id = this.ticketID;
    this.updateTicketDto.description = this.createTicketDTOFormGroup.value.description;
    this.updateTicketDto.productCategoryName1 = this.createTicketDTOFormGroup.value.productCategoryName1.toString();
    this.updateTicketDto.productCategoryName2 = this.createTicketDTOFormGroup.value.productCategoryName2.toString();
    this.updateTicketDto.submitterTeam = submitterArray[0];
    this.updateTicketDto.submitterEmail = submitterArray[1];
    this.updateTicketDto.submitterName = submitterArray[2];
    this.updateTicketDto.summary = this.createTicketDTOFormGroup.value.summary;
    this.updateTicketDto.submitDate = new Date();
    this.updateTicketDto.requestTypeId = this.createTicketDTOFormGroup.value.ticketType;
    this.updateTicketDto.ticketSeverity = this.createTicketDTOFormGroup.value.sevirity;
    this.updateTicketDto.ticketStatus = 0;
    //will be from aad
    this.updateTicketDto.reportedSource = 'admin';
    this.updateTicketDto.teamName = this.createTicketDTOFormGroup.value.team;
    this.updateTicketDto.priority = this.createTicketDTOFormGroup.value.priority;
    this.updateTicketDto.source = this.createTicketDTOFormGroup.value.source;

    var updated = JSON.stringify(this.updateTicketDto);
    this.updateFormData.append('data', updated);
    this.http
      .PUT('Ticket/UpdateTicket/', this.updateFormData)
      .subscribe((res) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.service.setValue(true);
      });
  }

  imageDeleteFrom: FormGroup;
  imageurls = [];
  base64String: string;
  name: string;
  imagePath: string;

  removeImageEdit(i, imagepath) {
    this.imageDeleteFrom.value.id = i;
    this.imageDeleteFrom.value.ImagePath = imagepath;
  }

  removeImage(i) {
    this.imageurls.splice(i, 1);
    console.log('iiii', this.imageurls);
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageurls.push({ base64String: event.target.result });
        };
        console.log('fileeee', this.imageurls);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
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
