import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  formData: FormData = new FormData();
  durationInSeconds: any = 3;
  createloader: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private http: HTTPMainServiceService
  ) {}

  ngOnInit(): void {}

  submitFile() {
    this.createloader = true;

    this.http.POST('user/ReadUsersExcel', this.formData).subscribe(
      (data) => {
        this.createloader = false;

        console.log('create setting');
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        // this.dialogRef.afterClosed().subscribe((result) => {
        //   console.log(`Dialog result: ${result}`);
        // });
      }
    );
  }

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
            // this.FileLinks.push(file.name);
          } else {
            // this.updateFormData.append(file.name, file);
            // this.FileLinks.push(file.name);
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
}
