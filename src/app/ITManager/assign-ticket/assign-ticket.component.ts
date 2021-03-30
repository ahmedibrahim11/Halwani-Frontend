import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
})
export class AssignTicketComponent implements OnInit {
  toppings = new FormControl();
  @Input() reporterDatasource;
  selectedUser: any;

  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
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
