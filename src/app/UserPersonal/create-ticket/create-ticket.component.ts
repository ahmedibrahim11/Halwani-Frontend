import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(public _router:Router,private route: ActivatedRoute,private http:UserGroupService,private formBuilder: FormBuilder,private miainHttp: HTTPMainServiceService) { }
     private typeID:Number
     private FileLinks;
     @Input() reporterDatasource;
     submitterTeam:any;
  submitterName:any;
  token:any;
  submitterInitials:any;
  reporter:any;
  getTokenPayloads() {
    this.token = localStorage.getItem('userData');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this.submitterName = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
        this.reporter = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];
     this.submitterTeam = JSON.parse(jsonPayload)[
      'Teams'
    ];
    this.submitterInitials=this.initials(this.submitterName)
  }
  ngOnInit(): void {
    this.getTokenPayloads();
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
     
     
    });
     this.miainHttp.GET('User/getUser').subscribe((data) => {
      this.reporterDatasource=data.map(el=>{
        return{
        label:el.text,
        value:`${el.team},${el.email},${el.userName}`,
        initials:this.initials(el.text),
        label1:el.email
        }
      })
      
    });
   
    
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
      
       this.createTicketDTO.submitterTeam=this.submitterTeam;
       this.createTicketDTO.submitterEmail=this.reporter;
       this.createTicketDTO.submitterName=this.submitterName;
       this.createTicketDTO.summary=this.createTicketDTOFormGroup.value.summary;
       this.createTicketDTO.submitDate=new Date();
       this.createTicketDTO.teamName=this.type.team;
       this.createTicketDTO.requestTypeId=this.createTicketDTOFormGroup.value.ticketType;
       console.log("CreateTicket Dto",this.createTicketDTO);
       this.miainHttp.POST("Ticket/Create",this.createTicketDTO).subscribe((data)=>{
       console.log(data);
       this._router.navigate(["user"]);
               
      })
}
}
