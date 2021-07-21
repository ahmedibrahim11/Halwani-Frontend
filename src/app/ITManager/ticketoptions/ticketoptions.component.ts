import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';
import { CancelTicketComponent } from '../cancel-ticket/cancel-ticket.component';

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
  ngOnInit(): void {
    console.log(this.ticketID);
  }
  editHandler() {
    let updateStatus = this.share.getData();
    const dialogRef = this.dialog.open(CreateTicketPopupComponent, {
      width: '40vw',

      data: { updateValue: updateStatus },
    });
    this.share.setData(this.ticketID);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  cancelHandler() {
    const dialogRef = this.dialog.open(CancelTicketComponent);
    this.share.setData(this.ticketID);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
