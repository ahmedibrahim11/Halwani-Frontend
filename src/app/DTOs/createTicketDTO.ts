import { TicketCategoryEnum,SevirityEnum,SourceEnum,PriorityEnum,ProductCategorizationEnum } from "./ticketListingDTO";
export class createTicketDTO{
    ticketType:TicketCategoryEnum;
    summary:string;
    attachments:any;
    description:string;
    reporter:string;
    reporterEmail:string;
    source:SourceEnum;
      sevirity:SevirityEnum;
      priority:PriorityEnum;
    createdDate:Date;
    productCategorization:ProductCategorizationEnum
    
  
}