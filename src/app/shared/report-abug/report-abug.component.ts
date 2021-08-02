import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-report-abug',
  templateUrl: './report-abug.component.html',
  styleUrls: ['./report-abug.component.css'],
})
export class ReportABugComponent implements OnInit {
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
    public dialogRef: MatDialogRef<ReportABugComponent>,
    private formBuilder: FormBuilder,
    private http: HTTPMainServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createReport = this.formBuilder.group({
      text: ['', [Validators.required]],
    });
  }
  durationInSeconds: any = 3;
  reportaBug() {
    this.createloader = true;

    console.log(this.createReport.value);
    this.http
      .PUT('UserRequest/ReportBug', { text: this.createReport.value.text })
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
