import { Component, OnInit } from '@angular/core';
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
  constructor(
    private http: HTTPMainServiceService,
    private share: SharingdataService,
    public dialog: MatDialog,
    private router: Router
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
  editHandler() {
    this.ticketID = this.share.getData();

    this.dialog.closeAll();
  }
  cancelHandler() {
    this.ticketID = this.share.getData();
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
