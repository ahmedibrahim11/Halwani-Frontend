import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { P } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
})
export class AssignTicketComponent implements OnInit {
  @Input() reporterDatasource;
  selectedUser: any;

  ticketIds = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    console.log("ticketIDs",this.ticketIds);
    this.http.GET('User/getUser').subscribe((data) => {
      this.reporterDatasource = data.map((el) => {
        return {
          label: el.text,
          value: el.userName,
          initials: this.initials(el.text),
          label1: el.email,
        };
      });
    });
  }

  usersHandler(e) {
    this.selectedUser = e.value;
  }
  ticketID: any;
  assignHandler() {
    if (this.data === null) {
      debugger;
      this.ticketID = this.share.getData();
      this.http
        .POST('ticket/AssignTicket', {
          ticketId: this.ticketID,
          UserName: this.selectedUser,
        })
        .subscribe((res) => {
          console.log(res);
          this.dialog.closeAll();
        });
    }
    else {
      this.data.forEach(element => {
        this.ticketIds.push(element['id'])
      });
      this.http
        .POST('ticket/AssignTickets', {
          ticketIds: this.ticketIds,
          UserName: this.selectedUser,
        })
        .subscribe((res) => {
          console.log(res);
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
}
