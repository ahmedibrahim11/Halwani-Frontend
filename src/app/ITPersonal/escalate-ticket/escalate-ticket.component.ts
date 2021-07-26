import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';

@Component({
  selector: 'app-escalate-ticket',
  templateUrl: './escalate-ticket.component.html',
  styleUrls: ['./escalate-ticket.component.css'],
})
export class EscalateTicketComponent implements OnInit {
  constructor(public dialog: MatDialog, private share: SharingdataService) {}
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
  closeModal() {
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.share.setData(undefined);
  }
}
