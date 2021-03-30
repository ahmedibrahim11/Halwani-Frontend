export class getTicketDTO{
    
  ticketNo: Number;
  ticketName: String;
  submitterTeam: String;
  submitterEmail: String;
  submitterName: String;
  attachement: String;
  serviceName: String;
  reportedSource: String;
  priority: Number;
  source: Number;
  ticketType: Number;
  ticketTypeName: String;
  ticketTypeIcon: String;
  ticketSeverity: Number;
  ticketStatus:Number;
  description: String;
  productCategoryName1: String;
  productCategoryName2: String;
  submitDate: string;
  resolvedDate:string|null;
  lastModifiedDate: Date;
  id: Number;
  submitterInitials:string;
  ReporterInitials:string;
 currentUserInitials:string;
  assignedTo:string
}