import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';

@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.css']
})
export class AddSettingsComponent implements OnInit {
  groups:any=[];
settingID:any;
createSettingsFormGroup:FormGroup;
UpdateSettingsFormGroup:FormGroup;
FileLinks:any=[];

  formData: FormData = new FormData();
  updateFormData: FormData = new FormData();
  constructor( private formBuilder: FormBuilder,
    private http: HTTPMainServiceService) { }

  ngOnInit(): void {
    //create
    this.createSettingsFormGroup=this.formBuilder.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      type:[0,[Validators.required]],
      groups:[[]]
    })
    
  }
  private deleteImage(url: any): void {
    this.FileLinks = this.FileLinks.filter((a) => a !== url);
    this.formData.delete(url);
    this.updateFormData.delete(url);
    console.log('formdata', this.formData);
    console.log('after deleted', this.FileLinks);
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], value: any) {
    console.log('valueee', value, files);
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log('eeee', file);
          if (value === 0) {
            this.formData.append(file.name, file);
            console.log('insert', this.formData);
            this.FileLinks.push(file.name);
            console.log('fillllll', this.FileLinks);
          } else {
            this.updateFormData.append(file.name, file);
            this.FileLinks.push(file.name);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    console.log('files uploaded', files);
  }

  public fileOver(event) {
    alert('ovvver');
    console.log(event);
  }

  public fileLeave(event) {
    alert('leaaave');
    console.log(event);
  }
public getGroups(){
  console.log(this.createSettingsFormGroup.value)
  let type=this.createSettingsFormGroup.value.Type!=''?this.createSettingsFormGroup.value.Type:this.UpdateSettingsFormGroup.value.Type;
  this.http.GET(`Group/getGroup`).subscribe((data)=>{
    console.log(data);
  })
}
}
