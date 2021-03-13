import { Component, OnInit } from '@angular/core';
import {HTTPMainServiceService  } from "../services/httpmain-service.service";
import { TicketListingDTO,TicketCategoryEnum,SevirityEnum } from "../DTOs/ticketListingDTO";
@Component({
  selector: 'app-all-table-component',
  templateUrl: './all-table-component.component.html',
  styleUrls: ['./all-table-component.component.css']
})
export class AllTableComponentComponent implements OnInit {
displayedColumns: string[] = ['Raised BY','Created ON','Ticket Topic','SevERITY','Actions'];
  constructor(private http:HTTPMainServiceService) { }
  UserViewInfoObject: TicketListingDTO[] = new Array<TicketListingDTO>();
  public TicketCategory=TicketCategoryEnum ;
  public sevirity=SevirityEnum ;
  ngOnInit(): void {
    this.http.GET("tickets").subscribe(res=>{
      console.log(res)
      this.UserViewInfoObject=res.map((el)=>{let creationDate=new Date();
        return {
        initials:this.initials(el.name),
        name:el.name,
        email:el.email,
        createdDate:creationDate.toDateString(),
        createdTime:creationDate.toLocaleTimeString(),
        ticketTopic:el.ticketTopic,
        ticketCategory:el.ticketCategory,
        Sevirity:el.sevirity

      }})
    });
  }
initials(name)
{
let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

let initials = [...name.matchAll(rgx)] || [];

initials = (
  (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
).toUpperCase();
return initials;
}
}
