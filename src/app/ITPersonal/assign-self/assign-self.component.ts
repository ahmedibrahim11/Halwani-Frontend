import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-assign-self',
  templateUrl: './assign-self.component.html',
  styleUrls: ['./assign-self.component.css'],
})
export class AssignSelfComponent implements OnInit {
  createloader: Boolean = false;
  ticketID: any;
  durationInSeconds: any = 3;

  constructor(
    public dialog: MatDialog,
    private share: SharingdataService,
    private http: HTTPMainServiceService,
    private service: TicketCreationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  assignHandler() {
    this.createloader = true;

    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/AssignTicket', {
        ticketId: this.ticketID,
        UserName: '',
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
