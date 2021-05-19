export class TicketListingDTO {
  name: string;
  email: string;
  createdDate: Date;
  ticketTopic: string;
  ticketCategory: TicketCategoryEnum;
  Sevirity: SevirityEnum;
}
export enum TicketCategoryEnum {
  Servicerequest = 0,
  Incident,
  Problem,
  Change,
}
export enum SevirityEnum {
  Low = 0,
  Medium,
  High,
}

export enum PriorityEnum {
  Low = 0,
  Medium,
  High,
}
export enum SourceEnum {
  Mobile = 0,
  Laptop,
  Desktop,
}
export enum ProductCategorizationEnum {
  Software = 0,
  Hardware,
}
export enum StatusEnum {
  Created = 0,
  Assigned = 1,
  WaitingResponse = 2,
  WaitingSupport = 3,
  InProgress = 4,
  Esclated = 5,
  Reopened = 6,
  Resolved = 7,
  OverDue = 8,
}
