import { Component, Input, OnInit } from '@angular/core';
import { createTicketDTO } from 'src/ITPersonal/DTOs/createTicketDTO';

@Component({
  selector: 'app-message-format',
  templateUrl: './message-format.component.html',
  styleUrls: ['./message-format.component.css']
})
export class MessageFormatComponent implements OnInit {
  @Input() userMessage:createTicketDTO;
  creatorInitials:string;
  constructor() { 
    
  }

  ngOnInit(): void {
    console.log(this.userMessage)
    this.creatorInitials=this.initials(this.userMessage.submitterName).toString()
  }
 initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
}
