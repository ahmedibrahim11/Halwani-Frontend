import { Component, Input, OnInit } from '@angular/core';
import { getTicketDTO } from 'src/app/core/DTOs/getTicketDTO';

@Component({
  selector: 'app-ticket-details-manager',
  templateUrl: './ticket-details-manager.component.html',
  styleUrls: ['./ticket-details-manager.component.css'],
})
export class TicketDetailsManagerComponent implements OnInit {
  @Input() userMessage: getTicketDTO;
  creatorInitials: string;
  constructor() {}

  ngOnInit(): void {}
}
