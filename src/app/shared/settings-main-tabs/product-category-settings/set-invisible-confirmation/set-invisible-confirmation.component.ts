import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';

@Component({
  selector: 'app-set-invisible-confirmation',
  templateUrl: './set-invisible-confirmation.component.html',
  styleUrls: ['./set-invisible-confirmation.component.css']
})
export class SetInvisibleConfirmationComponent implements OnInit {

 id:any=0;
value:any=false;
from:any=null;
createloader:any=false;
  durationInSeconds: any = 3;
  constructor(private http: HTTPMainServiceService,
    public dialogRef: MatDialogRef<SetInvisibleConfirmationComponent>,
    public service: TicketCreationService,
    public dialog: MatDialog,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { 
      this.value = data ? data.value : undefined;
      this.id=data?data.id:0;
      this.from=data?data.from:0;

    }

  ngOnInit(): void {
  }
submitYes()
{
  this.createloader=true
  if(this.from==1)
  {
this.http
      .GET(`Category/UpdateVisiblity?id=${this.id}&isVisible=${this.value}`)
      .subscribe((data) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.service.setValue(true);
        this.dialogRef.close();
      });
}
else
{
  this.http
      .GET(`RequestType/UpdateVisiblity?id=${this.id}&isVisible=${this.value}`)
      .subscribe((data) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.service.setValue(true);
        this.dialogRef.close();
      });
  
}

}
}
