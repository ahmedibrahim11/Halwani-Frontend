export class TicketListingDTO {
    
    name:string;
    email:string;
    createdDate:Date;
    ticketTopic:string;
    ticketCategory:TicketCategoryEnum;
    Sevirity:SevirityEnum;
    
}
export enum TicketCategoryEnum {
  Servicerequest = 0,
  Problem,
  Change,
  Incident,
}
export enum SevirityEnum {
  Low = 0,
  Medium,
  High
 
}