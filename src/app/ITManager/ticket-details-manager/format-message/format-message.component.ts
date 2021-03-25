import { Component, Input, OnInit } from '@angular/core';
import { getTicketDTO } from 'src/app/core/DTOs/getTicketDTO';
@Component({
  selector: 'app-format-message',
  templateUrl: './format-message.component.html',
  styleUrls: ['./format-message.component.css'],
})
export class FormatMessageComponent implements OnInit {
  @Input() userMessage: getTicketDTO;
  creatorInitials: string;
  constructor() {}

  ngOnInit(): void {}
}
