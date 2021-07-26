import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-cancel-ticket',
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.css'],
})
export class CancelTicketComponent implements OnInit {
  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  toppings = new FormControl();

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  ngOnInit(): void {}
  ticketID: any;
  durationInSeconds: any = 3;

  cancelHandler() {
    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 8,
      })
      .subscribe((res) => {
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
