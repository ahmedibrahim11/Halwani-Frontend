import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticketoptions',
  templateUrl: './ticketoptions.component.html',
  styleUrls: ['./ticketoptions.component.css'],
})
export class TicketoptionsComponent implements OnInit {
  constructor(private http: HTTPMainServiceService, public dialog: MatDialog) {}
  @Input() ticketID;
  ngOnInit(): void {}
  editHandler() {
    this.dialog.closeAll();
  }
  cancelHandler() {
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 8,
      })
      .subscribe((res) => {
        console.log(res);
        this.dialog.closeAll();
      });
  }
}
