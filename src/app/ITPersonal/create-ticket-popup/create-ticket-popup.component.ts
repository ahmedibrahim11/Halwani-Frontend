import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { createTicketDTO } from "../../core/DTOs/createTicketDTO";
import { HTTPMainServiceService } from '../../core/services/httpmain-service.service';
import {TicketCreationService} from "../../core/services/ticket-creation.service"
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-create-ticket-popup',
  templateUrl: './create-ticket-popup.component.html',
  styleUrls: ['./create-ticket-popup.component.css']
})
export class CreateTicketPopupComponent implements OnInit {
  createTicketDTO: createTicketDTO = new createTicketDTO();
  createTicketDTOFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HTTPMainServiceService,public dialog: MatDialog,public service:TicketCreationService) { }
private FileLinks;

showSecondCategory:boolean=false;
saveAndOpenAnother:boolean=false;
@Input() ticketTypeDatasource;
@Input() reporterDatasource;
@Input() sourceDatasource;
@Input() seviritysource;
@Input() teamSoruce;
@Input() productCategoryName1;
@Input() productCategoryName2;
  ngOnInit(): void {
     this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: [0, [Validators.required]],
      summary: ['', [Validators.required]],
      description:[''],
      team:['',[Validators.required]],
      reporter:[0, [Validators.required]],
      source:[0, [Validators.required]],
      sevirity:[0,[Validators.required]],
      priority:[0,[Validators.required]],
      productCategoryName1:[0],
      productCategoryName2:[0],
      saveAndOpenAnother:[false]
    });
    this.seviritysource=[{label:"Low",value:0},{label:"Medium",value:1},{label:"High",value:2}]
    this.sourceDatasource=[{label:"Mobile",value:0},{label:"LapTop",value:1},{label:"DeskTop",value:2}]
    this.ticketTypeDatasource=[{label:"Service Request",value:0},{label:"Incident",value:1}]

    this.http.GET("RequestType/getRequestType").subscribe((data)=>{
      debugger;
      this.ticketTypeDatasource=data;
    })
    this.reporterDatasource=[{label:"Shehab Mohamed",value:"xxx,shehabharhash@gmail.com,shehab",initials:this.initials("Shehab Mohamed"),label1:"shehabharhash@gmail.com"},
    {label:"Mostafa AbdelAziz",value:"xx,MostafaAbdelAziz96@gmail.com,zozzz",initials:this.initials("Mostafa AbdelAziz"),label1:"MostafaAbdelAziz96@gmail.com"}]
    this.teamSoruce=[{label:"Team1",value:"Team1"},{label:"Team2",value:"Team2"}],
  this.http.GET("Category/getCategory").subscribe(data=>{
      this.productCategoryName1=data.map(el=>{
        return {label:el.text,value:el.id}
      })
  })
  }
  productCategoryOne(event)
  {
    this.http.GET("Category/getCategory").subscribe(data=>{
      this.productCategoryName2=data.find(el=>{return el.id===event.value}).children.map(el=>{
         
        return {label:el.text,value:el.id}
      })
    })

    this.showSecondCategory=true;
  }
  submiCreate(){
console.log(this.createTicketDTOFormGroup.value );
       this.createTicketDTO.attachement=this.FileLinks!==undefined? this.FileLinks.toString():"";
       this.createTicketDTO.description=this.createTicketDTOFormGroup.value.description;
       this.createTicketDTO.productCategoryName1=this.createTicketDTOFormGroup.value.productCategoryName1.toString();
       this.createTicketDTO.productCategoryName2=this.createTicketDTOFormGroup.value.productCategoryName2.toString();
       let submitterArray=this.createTicketDTOFormGroup.value.reporter.split(",");
       this.createTicketDTO.submitterTeam=submitterArray[0];
       this.createTicketDTO.submitterEmail=submitterArray[1];
       this.createTicketDTO.submitterName=submitterArray[2];
       this.createTicketDTO.summary=this.createTicketDTOFormGroup.value.summary;
       this.createTicketDTO.submitDate=new Date();
       this.createTicketDTO.requestTypeId=this.createTicketDTOFormGroup.value.ticketType;
       this.createTicketDTO.ticketSeverity=this.createTicketDTOFormGroup.value.sevirity;
       this.createTicketDTO.ticketStatus=0;
       //will be from aad
       this.createTicketDTO.reportedSource="admin";
       this.createTicketDTO.ServiceName=this.createTicketDTOFormGroup.value.team;
       this.createTicketDTO.priority=this.createTicketDTOFormGroup.value.priority;
       this.createTicketDTO.source=this.createTicketDTOFormGroup.value.source;
      console.log("createDto",this.createTicketDTO);
      this.http.POST("Ticket/Create",this.createTicketDTO).subscribe((data)=>{
        console.log("create tickeet");
        this.service.setValue(true);
      }
      )
       if(this.createTicketDTOFormGroup.value.saveAndOpenAnother)
       {
         const dialogRef = this.dialog.open(CreateTicketPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      console.log(`Dialog result: ${result}`);
    });
       }
       
  }

   public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const formData = new FormData()
          formData.append(file.name, file)
         this.http.POST("Ticket/PostFile", formData)
          .subscribe(data => {
            this.FileLinks=data;
            if(this.FileLinks.length!==0)
            {
              let newLink= data[0];
              this.FileLinks.push(newLink);
            }
           console.log(this.FileLinks);
          })
         

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
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
