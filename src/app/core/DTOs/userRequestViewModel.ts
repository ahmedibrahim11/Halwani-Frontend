export class userRequestViewModel {
  text: string;
  bugType: BugType;
  userFeedBack: userFeedBack;
}
export enum SupportTypes {
  askingForSubmit = 0,
  askingForEdit,
  askingForDetails,
}
export enum BugType {
  technical = 0,
  nonTechnical,
}
export enum userFeedBack {
  veryAngry = 0,
  angry,
  good,
  happy,
  veryHappy,
}
