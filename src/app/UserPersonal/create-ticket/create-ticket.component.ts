import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { createTicketDTO } from 'src/app/core/DTOs/createTicketDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { UserGroupService } from '../../core/services/user-group.service';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  createTicketDTO: createTicketDTO = new createTicketDTO();
  public type;
  createTicketDTOFormGroup: FormGroup;
  durationInSeconds: any = 3;

  formData: FormData = new FormData();

  constructor(
    private _snackBar: MatSnackBar,
    public _router: Router,
    private route: ActivatedRoute,
    private http: UserGroupService,
    private formBuilder: FormBuilder,
    private miainHttp: HTTPMainServiceService
  ) {}
  private typeID: Number;
  public FileLinks: any = [];
  @Input() reporterDatasource;
  submitterTeam: any;
  submitterName: any;
  token: any;
  submitterInitials: any;
  reporter: any;
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
    this.submitterName =
      JSON.parse(jsonPayload)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    this.reporter =
      JSON.parse(jsonPayload)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    this.submitterTeam = JSON.parse(jsonPayload)['Teams'];
    this.submitterInitials = this.initials(this.submitterName);
  }
  ngOnInit(): void {
    this.getTokenPayloads();
    const routeParams = this.route.snapshot.paramMap;
    this.typeID = Number(routeParams.get('id'));
    this.http.getData().subscribe((data) => {
      debugger;
      data.map((el) =>
        el.requestTypes
          .filter((x) => x.id === this.typeID)
          .map((el) => {
            this.type = {
              id: el.id,
              name: el.text,
              icon: el.icon,
              ticketType: el.ticketType,
              description: el.description,
              team: el.defaultTeam,
            };
            console.log(this.type);
          })
      );
      console.log('Typeeeee', this.type);
    });
    this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: [this.typeID],
      summary: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.miainHttp.GET('User/getUser').subscribe((data) => {
      this.reporterDatasource = data.map((el) => {
        return {
          label: el.text,
          value: `${el.team},${el.email},${el.userName}`,
          initials: this.initials(el.text),
          label1: el.email,
        };
      });
    });
  }

  private deleteImage(url: any): void {
    console.log('fileLinks', this.FileLinks);
    debugger;
    this.FileLinks = this.FileLinks.filter((a) => a !== url);
    this.formData.delete(url);
    console.log('after deleted', this.FileLinks);
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          debugger;
          this.FileLinks.push(file.name);
          this.formData.append(file.name, file);
          //   const formData = new FormData()
          //   formData.append(file.name, file)
          //  this.miainHttp.POST("Ticket/PostFile", formData)
          //   .subscribe(data => {
          //     this.FileLinks=data;
          //     if(this.FileLinks.length!==0)
          //     {
          //       let newLink= data[0];
          //       this.FileLinks.push(newLink);
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
  submiCreate() {
    this.createTicketDTO.attachement =
      this.FileLinks !== undefined ? this.FileLinks.toString() : '';
    this.createTicketDTO.description =
      this.createTicketDTOFormGroup.value.description;
    this.createTicketDTO.submitterTeam = this.submitterTeam;
    this.createTicketDTO.submitterEmail = this.reporter;
    this.createTicketDTO.submitterName = this.submitterName;
    this.createTicketDTO.summary = this.createTicketDTOFormGroup.value.summary;
    this.createTicketDTO.submitDate = new Date();
    this.createTicketDTO.teamName = this.type.team;
    this.createTicketDTO.requestTypeId =
      this.createTicketDTOFormGroup.value.ticketType;
    console.log('CreateTicket Dto', this.createTicketDTO);
    var requestData = JSON.stringify(this.createTicketDTO);
    this.formData.append('data', requestData);
    this.miainHttp
      .POST('Ticket/CreateTicket', this.formData)
      .subscribe((data) => {
        console.log(data);
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });

        this._router.navigate(['user']);
      });
  }
}
