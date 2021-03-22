import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
