import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { createTicketDTO } from "../DTOs/createTicketDTO";
import { HTTPMainServiceService } from '../services/httpmain-service.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  selector: 'app-create-ticket-popup',
  templateUrl: './create-ticket-popup.component.html',
  styleUrls: ['./create-ticket-popup.component.css']
})
export class CreateTicketPopupComponent implements OnInit {
  createTicketDTO: createTicketDTO = new createTicketDTO();
  createTicketDTOFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HTTPMainServiceService) { }
private FileLinks;
  ngOnInit(): void {
     this.createTicketDTOFormGroup = this.formBuilder.group({
      ticketType: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      description:[''],
      reporter:['', [Validators.required]],
      source:['', [Validators.required]],
      sevirity:['',[Validators.required]],
      priority:['',[Validators.required]],
      productCategoryName1:[''],
      productCategoryName2:[''],
    });
  }
  submiCreate(){
console.log(this.createTicketDTOFormGroup.value );
  }

   public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

         
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


}
