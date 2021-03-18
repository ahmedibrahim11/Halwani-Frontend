import { Component, Input, OnInit } from '@angular/core';
import { getTicketDTO } from 'src/app/core/DTOs/getTicketDTO';


@Component({
  selector: 'app-message-format',
  templateUrl: './message-format.component.html',
  styleUrls: ['./message-format.component.css']
})
export class MessageFormatComponent implements OnInit {
  @Input() userMessage:getTicketDTO;
  creatorInitials:string;
  constructor() { 
    
  }

  ngOnInit(): void {
   
  }
 
}
