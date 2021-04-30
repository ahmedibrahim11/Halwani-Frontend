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
  Phone = 0,
  Desktop,
  Laptop,
}
export enum ProductCategorizationEnum {
  Software = 0,
  Hardware,
}
