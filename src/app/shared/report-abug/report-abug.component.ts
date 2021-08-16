import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { BugType } from 'src/app/core/DTOs/userRequestViewModel';

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
      supportType: ['', [Validators.required]],
      text: [''],
    });

    const priVal = Object.keys(BugType).filter(
      (k) => typeof BugType[k as any] === 'number'
    );
    const priKeys = Object.keys(BugType).filter(
      (k) => typeof BugType[k as any] === 'string'
    );
    for (let i = 0; i < priVal.length; i++) {
      this.types.push({ text: priVal[i], value: Number(priKeys[i]) });
    }
  }
  choosenImg: any = -1;
  firstStatusImg: Boolean = false;
  secondStatusImg: Boolean = false;
  thirdStatusImg: Boolean = false;
  fourthStatusImg: Boolean = false;
  fifthStatusImg: Boolean = false;

  imageStatusHandler(value) {
    this.choosenImg = value;
    switch (this.choosenImg) {
      case 0:
        this.firstStatusImg = true;
        this.secondStatusImg = false;
        this.thirdStatusImg = false;
        this.fourthStatusImg = false;
        this.fifthStatusImg = false;
        break;
      case 1:
        this.firstStatusImg = false;
        this.secondStatusImg = true;
        this.thirdStatusImg = false;
        this.fourthStatusImg = false;
        this.fifthStatusImg = false;
        break;
      case 2:
        this.firstStatusImg = false;
        this.secondStatusImg = false;
        this.thirdStatusImg = true;
        this.fourthStatusImg = false;
        this.fifthStatusImg = false;
        break;
      case 3:
        this.firstStatusImg = false;
        this.secondStatusImg = false;
        this.thirdStatusImg = false;
        this.fourthStatusImg = true;
        this.fifthStatusImg = false;
        break;
      case 4:
        this.firstStatusImg = false;
        this.secondStatusImg = false;
        this.thirdStatusImg = false;
        this.fourthStatusImg = false;
        this.fifthStatusImg = true;
        break;

      default:
        break;
    }
    console.log('imaage', this.choosenImg);
  }

  filterHandler(value: any) {
    let type = Number(
      Object.keys(BugType).find((s) => BugType[s] === value.value)
    );
    console.log('men dh', type);
  }

  types = [];
  durationInSeconds: any = 3;
  reportaBug() {
    this.createloader = true;

    console.log('bugData', this.createReport.value);
    console.log('img', this.choosenImg);

    this.http
      .PUT('UserRequest/ReportBug', {
        text: this.createReport.value.text,
        bugType: this.createReport.value.supportType,
        userFeedBack: this.choosenImg,
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
