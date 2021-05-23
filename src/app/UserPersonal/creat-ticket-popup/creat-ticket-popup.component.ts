import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { createTicketDTO } from 'src/app/core/DTOs/createTicketDTO';
import { getTicketDTO } from 'src/app/core/DTOs/getTicketDTO';
import { TicketListingDTO } from 'src/app/core/DTOs/ticketListingDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { UserGroupService } from 'src/app/core/services/user-group.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-creat-ticket-popup',
  templateUrl: './creat-ticket-popup.component.html',
  styleUrls: ['./creat-ticket-popup.component.css']
})
export class CreatTicketPopupComponent implements OnInit {
  createTicketDTO: createTicketDTO = new createTicketDTO();
  updateTicketDto: createTicketDTO = new createTicketDTO();
  getTicketDTO: getTicketDTO = new getTicketDTO();
  createTicketDTOFormGroup: FormGroup;
  updateTicketDTOFormGroup: FormGroup;

  formData: FormData = new FormData();
  updateFormData: FormData = new FormData();
  fromPage: any;
  updateStatus: any;

  private FileLinks = [];
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

  //update-controls-values
  ticketType: any;
  summary: any;
  attachement: any = [];
  description: any;
  team: any;
  reporter: any;
  source: any;
  sevirity: any;
  priority: any;
  categoryName1: any;
  categoryName2: any;
  ticketList: TicketListingDTO = new TicketListingDTO();
  type: any;
  filePath: any;
  fileName: any = [];
  submitterTeam: any;
  submitterName: any;
  token: any;
  submitterInitials: any;
  getTokenPayloads() {
    this.token = localStorage.getItem('userData');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this.submitterName = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
    this.reporter = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];
    this.submitterTeam = JSON.parse(jsonPayload)[
      'Teams'
    ];
    this.submitterInitials = this.initials(this.submitterName)
  }
  constructor(private http: HTTPMainServiceService
    , private formBuilder: FormBuilder, public service: TicketCreationService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreatTicketPopupComponent>,
    public dialog: MatDialog,
    private groupService: UserGroupService, private share: SharingdataService,
  ) { }

  ngOnInit(): void {
    this.getTokenPayloads();
    this.ticketID = this.share.getData();
    console.log('ticketId', this.ticketID);
    if (this.ticketID !== undefined) {
      this.http
        .POST('ticket/getTicket', { id: this.ticketID.toString() })
        .subscribe((res) => {
          console.log('res', res);
          this.http.GET('RequestType/getRequestType').subscribe((data) => {


            this.ticketTypeDatasource = data;

          });
          this.ticketType = res.requestType.id;
          this.summary = res.ticketName;
          this.FileLinks = res.attachement;
          console.log('ttt', res.attachement);
          this.description = res.description;
          this.team = res.teamName;

          this.source = res.source;
          this.sevirity = res.ticketSeverity;
          this.priority = res.priority;
          this.categoryName1 = res.productCategoryName1;
          this.categoryName2 = res.productCategoryName2;
          this.submitterTeam = res.submitterTeam;
          this.submitterName = res.submitterName;
          this.updateTicketDTOFormGroup = this.formBuilder.group({
            ticketType: [this.ticketType],
            summary: [this.summary],
            description: [this.description],
            team: [this.team],

            source: [this.source],
            sevirity: [this.sevirity],
            priority: [this.priority],
            categoryName1: [this.categoryName1],
            categoryName2: [this.categoryName2],
            reportTo: [this.submitterTeam + ',' + this.reporter + ',' + this.submitterName]
          });
          console.log("xsd", this.updateTicketDTOFormGroup.value.reportTo)
        });
      console.log("res", this.submitterName)

      console.log(this.submitterTeam + ',' + this.reporter + ',' + this.submitterName)
      this.share.setData(undefined);
    }

    this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      description: [''],
      saveAndOpenAnother: [false, [Validators.required]],

    });
    this.http.GET('User/getUser').subscribe((data) => {
      this.reporterDatasource = data.map(el => {
        return {
          label: el.text,
          value: `${el.team},${el.email},${el.userName}`,
          initials: this.initials(el.text),
          label1: el.email
        }
      })

    });
    console.log("ds", this.reporterDatasource)
    this.http.GET('RequestType/getRequestType').subscribe((data) => {


      this.ticketTypeDatasource = data;
    })
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[],value) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          debugger;
          if(value===0){
            this.formData.append(file.name, file);
          }
          else{
            this.updateFormData.append(file.name, file);
          }
          this.FileLinks.push(file.name);
          //  this.http.POST("Ticket/PostFile", formData)
          //   .subscribe(data => {
          //     this.FileLinks=data;
          //     if(this.FileLinks.length!==0)
          //     {
          //       let newLink= data[0];
          //     //  this.FileLinks.push(newLink);
          //     }
          //    console.log(this.FileLinks);
          //   })
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
  private deleteImage(url: any): void {
    this.FileLinks = this.FileLinks.filter((a) => a !== url);
    this.formData.delete(url);

    console.log('formdata', this.formData);
    console.log('after deleted', this.FileLinks);
  }
  submiCreate() {
    this.groupService.getData().subscribe(data => {
      debugger;
      data.map(el => el.requestTypes.filter(x => x.id === this.createTicketDTOFormGroup.value.ticketType).map((el) => {
        this.type = { id: el.id, name: el.text, icon: el.icon, ticketType: el.ticketType, description: el.description, team: el.defaultTeam }

      }))
      this.createTicketDTO.attachement = this.FileLinks !== undefined ? this.FileLinks.toString() : "";
      this.createTicketDTO.description = this.createTicketDTOFormGroup.value.description;

      this.createTicketDTO.submitterTeam = this.submitterTeam;
      this.createTicketDTO.submitterEmail = this.reporter;
      this.createTicketDTO.submitterName = this.submitterName;
      this.createTicketDTO.summary = this.createTicketDTOFormGroup.value.summary;
      this.createTicketDTO.submitDate = new Date();
      this.createTicketDTO.teamName = this.type.team;
      this.createTicketDTO.requestTypeId = this.createTicketDTOFormGroup.value.ticketType;
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
        const dialogRef = this.dialog.open(CreatTicketPopupComponent, {

        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      }
    })

  }
  submitUpdate() {
    debugger;
    this.groupService.getData().subscribe(data => {
      debugger;
      data.map(el => el.requestTypes.filter(x => x.id === this.updateTicketDTOFormGroup.value.ticketType).map((el) => {
        this.type = { id: el.id, name: el.text, icon: el.icon, ticketType: el.ticketType, description: el.description, team: el.defaultTeam }

      }))
      this.updateTicketDto.attachement = this.FileLinks !== undefined ? this.FileLinks.toString() : "";
      this.updateTicketDto.description = this.updateTicketDTOFormGroup.value.description;
      this.updateTicketDto.submitterTeam = this.submitterTeam;
      this.updateTicketDto.submitterEmail = this.reporter;
      this.updateTicketDto.submitterName = this.submitterName;

      this.updateTicketDto.summary = this.updateTicketDTOFormGroup.value.summary;
      this.updateTicketDto.teamName = this.type.team;
      this.updateTicketDto.requestTypeId = this.updateTicketDTOFormGroup.value.ticketType;

      var updated = JSON.stringify(this.updateTicketDto);
      this.updateFormData.append('data', updated);
      this.http.PUT('Ticket/UpdateTic/', this.updateFormData).subscribe((res) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.service.setValue(true);
      });
    })

  }

}
