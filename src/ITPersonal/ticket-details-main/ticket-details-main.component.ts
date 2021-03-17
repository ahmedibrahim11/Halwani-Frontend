import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { createTicketDTO } from '../DTOs/createTicketDTO';
import { Editor } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-ticket-details-main',
  templateUrl: './ticket-details-main.component.html',
  styleUrls: ['./ticket-details-main.component.css']
})
export class TicketDetailsMainComponent implements OnInit,OnDestroy  {
  @Output() userMessage:createTicketDTO={
       summary: "assasasasasa",
  submitterTeam:"xxx",
  submitterEmail: "shehabHarhash@gmail.com",
  submitterName: "shehab Mohamed",
  serviceName: "shehab",
  reportedSource: "Mostafa Abdelaziz",
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

  messageList:{message:any,sender:any}[]=[]


  creatorInitials:string; 
  reporterInitials:string; 
  editor: Editor;
  html: '';

  newMessag:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.creatorInitials=this.initials(this.userMessage.submitterName).toString();
    this.reporterInitials=this.initials(this.userMessage.reportedSource).toString();
    this.editor = new Editor();
    this.newMessag= this.formBuilder.group({
        message:['',[Validators.required]],
        submitter:['shehab',[Validators.required]]
    });
  }
   ngOnDestroy(): void {
    this.editor.destroy();
  }
   initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
 
submit(){
  console.log(this.newMessag.value)
  this.messageList.push({message:this.newMessag.value.message,
    sender:this.newMessag.value.submitter})
    this.newMessag.setValue({message:"",submitter:"shehab"})
}
}
