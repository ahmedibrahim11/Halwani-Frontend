import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Validators } from 'ngx-editor';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-ask-for-support',
  templateUrl: './ask-for-support.component.html',
  styleUrls: ['./ask-for-support.component.css']
})
export class AskForSupportComponent implements OnInit {

  
createReport:FormGroup;
editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '10',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: '',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
   
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    [],
     ['customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'removeFormat',
    'toggleEditorMode']
    ]
};
  constructor(public dialogRef: MatDialogRef<AskForSupportComponent>,  private formBuilder: FormBuilder, private http: HTTPMainServiceService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.createReport=this.formBuilder.group({text:['',[Validators.required]]});
  }
    durationInSeconds: any = 3;
reportaBug()
{
  console.log(this.createReport.value)
  this.dialogRef.close();
   this.http.PUT('UserRequest/AskForSupport',{text:this.createReport.value.text}).subscribe((res) => {
       
        this._snackBar.openFromComponent(ToastMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
    
    });

}
closeModal() {
    this.dialogRef.close();
  }
}
