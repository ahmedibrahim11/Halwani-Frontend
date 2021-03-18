import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { createTicketDTO } from '../../core/DTOs/createTicketDTO';
import { Editor } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { getTicketDTO } from "src/app/core/DTOs/getTicketDTO";
@Component({
  selector: 'app-ticket-details-main',
  templateUrl: './ticket-details-main.component.html',
  styleUrls: ['./ticket-details-main.component.css']
})
export class TicketDetailsMainComponent implements OnInit,OnDestroy  {
  @Output() userMessage:getTicketDTO;

  messageList:{message:any,sender:any}[]=[]


  creatorInitials:string; 
  reporterInitials:string; 
  editor: Editor;
  html: '';
ticketID:string;
  newMessag:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private actRoute:ActivatedRoute,private http:HTTPMainServiceService) { }

  ngOnInit(): void {
    this.ticketID=this.actRoute.snapshot.paramMap.get("id")
this.http.POST(`Ticket/getTicket`,{id:this.ticketID}).subscribe(data=>{
  const creationDate=new Date(data.submitDate);
  const resolvedDate=new Date( data.resolvedDate);
 
this.userMessage={
  ticketNo: data.ticketNo,
  ticketName: data.ticketName,
  submitterTeam: data.submitterTeam,
  submitterEmail: data.submitterEmail,
  submitterName: data.submitterName,
  serviceName: data.serviceName,
  reportedSource: data.reportedSource,
  priority: data.priority,
  source: data.source,
  ticketType: data.ticketType,
  ticketSeverity: data.ticketSeverity,
  ticketStatus:data.ticketStatus,
  description: data.description,

  submitDate: creationDate.toLocaleDateString(),
  resolvedDate:resolvedDate.toLocaleDateString(),
 
  id: data.id,
  attachement:data.attachement,
  productCategoryName1:data.productCategoryName1,
  productCategoryName2:data.productCategoryName2,
  lastModifiedDate:data.lastModifiedDate,
  submitterInitials:this.initials(data.submitterName).toString(),
  ReporterInitials:this.initials(data.reportedSource).toString(),
}

})
    this.http.POST(`TicketMessage/getMessages`,{id:this.ticketID}).subscribe(data=>{
   for (let index = 0; index < data.length; index++) {
     const element = data[index];
     this.messageList.push({message:element.messageText,
    sender:element.submitter})
   }
  })

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
 this.http.POST(`TicketMessage/create`,{
  ticketID:Number.parseInt(this.ticketID),
  messageText: this.newMessag.value.message,
  submitter: this.newMessag.value.submitter
}).subscribe(data=>{
   this.messageList.push({message:this.newMessag.value.message,
    sender:this.newMessag.value.submitter})
    this.newMessag.setValue({message:"",submitter:"shehab"})
  })
}
}
