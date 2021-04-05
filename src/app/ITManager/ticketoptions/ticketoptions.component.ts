import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';

@Component({
  selector: 'app-ticketoptions',
  templateUrl: './ticketoptions.component.html',
  styleUrls: ['./ticketoptions.component.css'],
})
export class TicketoptionsComponent implements OnInit {
  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private share: SharingdataService
  ) {}
  @Input() ticketID;
  ngOnInit(): void {}
  editHandler() {
    const dialogRef = this.dialog.open(CreateTicketPopupComponent);
    this.share.setData(this.ticketID);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  cancelHandler() {
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 8,
      })
      .subscribe((res) => {
        alert('Ticket ' + this.ticketID + ' cancelled Successfully');

        console.log(res);
        this.dialog.closeAll();
      });
  }
}
