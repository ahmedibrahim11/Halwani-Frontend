import { Component, OnInit, Output } from '@angular/core';
import { createTicketDTO } from '../DTOs/createTicketDTO';

@Component({
  selector: 'app-ticket-details-main',
  templateUrl: './ticket-details-main.component.html',
  styleUrls: ['./ticket-details-main.component.css']
})
export class TicketDetailsMainComponent implements OnInit {
  @Output() userMessage:createTicketDTO={
       summary: "assasasasasa",
  submitterTeam:"xxx",
  submitterEmail: "shehabHarhash@gmail.com",
  submitterName: "shehab",
  serviceName: "shehab",
  reportedSource: "shehab",
  type: 0,
  ticketSeverity: 0,
  ticketStatus: 0,
  description: "I am unable to login to my email account, please change my password and send me reset link.",
  submitDate: new Date(),
  productCategoryName1: "xai",
  productCategoryName2: "xai",
  attachement: "assasasasa",
  priority:0,
  };

  creatorInitials:string; 
  
  constructor() { }

  ngOnInit(): void {
    this.creatorInitials=this.initials(this.userMessage.submitterName).toString();
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
