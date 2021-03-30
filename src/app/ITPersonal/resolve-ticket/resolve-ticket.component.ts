import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resolve-ticket',
  templateUrl: './resolve-ticket.component.html',
  styleUrls: ['./resolve-ticket.component.css'],
})
export class ResolveTicketComponent implements OnInit {
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
  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog
  ) {}

  ticketID: any;
  resolvedStr: any;
  resolveText(e) {
    this.resolvedStr = e.target.value;
  }
  resolveHandler() {
    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/UpdateStatus', {
        ticketId: this.ticketID,
        status: 7,
        resolveText: this.resolvedStr,
      })
      .subscribe((res) => {
        console.log(res);
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
        this.dialog.closeAll();
      });
  }
}
