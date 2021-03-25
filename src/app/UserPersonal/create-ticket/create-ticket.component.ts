import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { createTicketDTO } from 'src/app/core/DTOs/createTicketDTO';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { UserGroupService } from "../../core/services/user-group.service";
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
createTicketDTO: createTicketDTO = new createTicketDTO();
public type;
createTicketDTOFormGroup: FormGroup;

  constructor(private route: ActivatedRoute,private http:UserGroupService,private formBuilder: FormBuilder,private miainHttp: HTTPMainServiceService) { }
     private typeID:Number
     private FileLinks;
     @Input() reporterDatasource;
  ngOnInit(): void {
   const routeParams = this.route.snapshot.paramMap;
    this.typeID = Number(routeParams.get('id'));
    this.http.getData().subscribe(data=>{
      debugger;
      data.map(el=> el.requestTypes.filter(x=>x.id===this.typeID).map((el)=>{
        this.type= {id:el.id,name:el.text,icon:el.icon,ticketType:el.ticketType,description:el.description,team:el.defaultTeam}
  console.log(this.type);
          }))
      console.log("Typeeeee",this.type)
    })
     this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: [this.typeID],
      summary: ['', [Validators.required]],
      description:[''],
     
      reportTo:['',[Validators.required]]
    });
       this.reporterDatasource=[{label:"Shehab Mohamed",value:"xxx,shehabharhash@gmail.com,shehab",initials:this.initials("Shehab Mohamed"),label1:"shehabharhash@gmail.com"},
    {label:"Mostafa AbdelAziz",value:"xx,MostafaAbdelAziz96@gmail.com,zozzz",initials:this.initials("Mostafa AbdelAziz"),label1:"MostafaAbdelAziz96@gmail.com"}]
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
         this.miainHttp.POST("Ticket/PostFile", formData)
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
submiCreate(){
   this.createTicketDTO.attachement=this.FileLinks!==undefined? this.FileLinks.toString():"";
       this.createTicketDTO.description=this.createTicketDTOFormGroup.value.description;
       let submitterArray=this.createTicketDTOFormGroup.value.reportTo.split(",");
       this.createTicketDTO.submitterTeam=submitterArray[0];
       this.createTicketDTO.submitterEmail=submitterArray[1];
       this.createTicketDTO.submitterName=submitterArray[2];
       this.createTicketDTO.summary=this.createTicketDTOFormGroup.value.summary;
       this.createTicketDTO.submitDate=new Date();
       this.createTicketDTO.ServiceName=this.type.team;
       this.createTicketDTO.requestTypeId=this.createTicketDTOFormGroup.value.ticketType;
       console.log("CreateTicket Dto",this.createTicketDTO);
       this.miainHttp.POST("Ticket/Create",this.createTicketDTO).subscribe((data)=>{
       console.log(data);
       
      })
}
}
