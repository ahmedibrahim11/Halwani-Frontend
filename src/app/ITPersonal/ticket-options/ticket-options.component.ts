import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ticket-options',
  templateUrl: './ticket-options.component.html',
  styleUrls: ['./ticket-options.component.css'],
})
export class TicketOptionsComponent implements OnInit {
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
}
