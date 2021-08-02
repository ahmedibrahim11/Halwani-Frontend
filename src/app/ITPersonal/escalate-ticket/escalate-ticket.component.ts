import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-escalate-ticket',
  templateUrl: './escalate-ticket.component.html',
  styleUrls: ['./escalate-ticket.component.css'],
})
export class EscalateTicketComponent implements OnInit {
  createloader: Boolean = false;
  ticketID: any;
  escalationString: String = '';
  durationInSeconds: any = 3;

  sendFlag: Boolean = false;

  constructor(
    public dialog: MatDialog,
    private share: SharingdataService,
    private http: HTTPMainServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getEscalationText(e: any) {
    this.escalationString = e.target.value;
    console.log('esssss', this.escalationString);
    if (this.escalationString === '') {
      this.sendFlag = false;
    } else {
      this.sendFlag = true;
    }
  }

  escalateHandler() {
    this.createloader = true;

    this.ticketID = this.share.getData();
    this.http
      .POST('Ticket/EsclateTicket', {
        ticketId: this.ticketID,
        esclationReason: this.escalationString,
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
  closeModal() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.share.setData(undefined);
  }
}
