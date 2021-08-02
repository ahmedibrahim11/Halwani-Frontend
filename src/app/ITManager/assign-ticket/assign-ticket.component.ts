import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { P } from '@angular/cdk/keycodes';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
})
export class AssignTicketComponent implements OnInit {
  @Input() reporterDatasource;
  selectedReporter = new FormControl();

  selectedUser: any;

  ticketIds = [];

  createloader: Boolean = false;
  sendFlag: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('usssss', this.selectedUser);
    console.log('ticketIDs', this.ticketIds);
    var x = this.data;
    var teamName = typeof this.data;
    if (teamName == 'string') {
      this.http.GET(`User/getItPersonal/${this.data}`).subscribe((data) => {
        this.reporterDatasource = data.map((el) => {
          return {
            label: el.text,
            value: el.userName,
            initials: this.initials(el.text),
            label1: el.email,
          };
        });
        console.log('reporterDatasource', this.reporterDatasource);
      });
    } else {
      this.http
        .GET(`User/getItPersonal/${this.data[0].teamName}`)
        .subscribe((data) => {
          this.reporterDatasource = data.map((el) => {
            return {
              label: el.text,
              value: el.userName,
              initials: this.initials(el.text),
              label1: el.email,
            };
          });
          console.log('reporterDatasource', this.reporterDatasource);
        });
    }
  }

  usersHandler(e) {
    console.log('event', e);
    this.selectedUser = e.value;
    if (this.selectedUser === undefined) {
      this.sendFlag = false;
    } else {
      this.sendFlag = true;
    }
  }
  ticketID: any;
  durationInSeconds: any = 3;

  assignHandler() {
    this.createloader = true;

    var dataType = typeof this.data;
    debugger;
    console.log('dataaaa', this.data);
    if (dataType === 'string') {
      debugger;
      this.ticketID = this.share.getData();
      this.http
        .POST('ticket/AssignTicket', {
          ticketId: this.ticketID,
          UserName: this.selectedUser,
        })
        .subscribe((res) => {
          this.createloader = false;

          console.log(res);
          this._snackBar.openFromComponent(ToastMessageComponent, {
            duration: this.durationInSeconds * 1000,
          });
          this.dialog.closeAll();
        });
    } else {
      this.data.forEach((element) => {
        this.ticketIds.push(element['id']);
      });
      this.http
        .POST('ticket/AssignTickets', {
          ticketIds: this.ticketIds,
          UserName: this.selectedUser,
        })
        .subscribe((res) => {
          this.createloader = false;

          console.log(res);
          this._snackBar.openFromComponent(ToastMessageComponent, {
            duration: this.durationInSeconds * 1000,
          });
          this.dialog.closeAll();
        });
    }
  }

  backBtn() {
    this.dialog.closeAll();
  }

  initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }

  ngOnDestroy() {
    this.share.setData(undefined);
  }
}
