import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-resolve-ticket',
  templateUrl: './resolve-ticket.component.html',
  styleUrls: ['./resolve-ticket.component.css'],
})
export class ResolveTicketComponent implements OnInit {
  createloader: Boolean = false;

  ngOnInit(): void {}
  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ticketID: any;
  resolvedStr: String = '';
  durationInSeconds: any = 3;
  sendFlag: Boolean = false;

  resolveText(e) {
    this.resolvedStr = e.target.value;
    console.log('ressoooo', this.resolvedStr);
    if (this.resolvedStr === '') {
      this.sendFlag = false;
    } else {
      this.sendFlag = true;
    }
  }
  resolveHandler() {
    this.createloader = true;

    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 7,
        resolveText: this.resolvedStr,
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
  openHandler() {
    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 4,
        resolveText: this.resolvedStr,
      })
      .subscribe((res) => {
        console.log(res);
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.dialog.closeAll();
      });
  }

  ngOnDestroy() {
    this.share.setData(undefined);
  }
}
