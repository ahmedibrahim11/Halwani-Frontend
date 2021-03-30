import { Component, OnInit } from '@angular/core';
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

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ticketID: any;
  assignHandler() {
    this.ticketID = this.share.getData();
    this.http
      .POST('ticket/AssignTicket', {
        ticketId: this.ticketID,
        UserName: 'zooooz',
      })
      .subscribe((res) => {
        console.log(res);
        this.dialog.closeAll();
      });
  }

  backBtn() {
    this.dialog.closeAll();
  }
}
