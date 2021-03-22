import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-escalate-ticket',
  templateUrl: './escalate-ticket.component.html',
  styleUrls: ['./escalate-ticket.component.css'],
})
export class EscalateTicketComponent implements OnInit {
  constructor() {}
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
}
