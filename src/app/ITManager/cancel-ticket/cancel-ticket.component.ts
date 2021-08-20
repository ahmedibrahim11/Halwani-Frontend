import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';

@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.css'],
})
export class CancelTicketComponent implements OnInit {
  createloader: Boolean = false;

  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog,
    private service: TicketCreationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  ticketID: any;
  durationInSeconds: any = 3;

  cancelHandler() {
    this.createloader = true;

    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 8,
      })
      .subscribe((res) => {
        this.createloader = false;
        this.service.setValue(true);
        console.log(res);
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.dialog.closeAll();
      });
  }
  closeModal() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.share.setData(undefined);
  }
}
