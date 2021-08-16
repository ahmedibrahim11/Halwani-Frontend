import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Validators } from 'ngx-editor';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SupportTypes } from 'src/app/core/DTOs/userRequestViewModel';

import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-for-support',
  templateUrl: './ask-for-support.component.html',
  styleUrls: ['./ask-for-support.component.css'],
})
export class AskForSupportComponent implements OnInit {
  createloader: Boolean = false;

  createReport: FormGroup;
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
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
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };
  constructor(
    public dialogRef: MatDialogRef<AskForSupportComponent>,
    private formBuilder: FormBuilder,
    private http: HTTPMainServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  filterHandler(value: any) {
    let type = Number(
      Object.keys(SupportTypes).find((s) => SupportTypes[s] === value.value)
    );
    console.log('men dh', type);
  }

  types = [];
  ngOnInit(): void {
    this.createReport = this.formBuilder.group({
      supportType: ['', [Validators.required]],
      text: [''],
    });
    console.log('supppp', this.createReport.value.supportType);

    const priVal = Object.keys(SupportTypes).filter(
      (k) => typeof SupportTypes[k as any] === 'number'
    );
    const priKeys = Object.keys(SupportTypes).filter(
      (k) => typeof SupportTypes[k as any] === 'string'
    );
    for (let i = 0; i < priVal.length; i++) {
      this.types.push({ text: priVal[i], value: Number(priKeys[i]) });
    }
  }
  durationInSeconds: any = 3;
  reportaBug() {
    this.createloader = true;

    console.log('form valuees', this.createReport.value);
    this.http
      .PUT('UserRequest/AskForSupport', {
        text: this.createReport.value.text,
        userRequestType: this.createReport.value.supportType,
      })
      .subscribe((res) => {
        this.createloader = false;

        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.dialog.closeAll();
      });
  }
  closeModal() {
    this.dialogRef.close();
  }
}
