import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateTicketPopupComponent } from "../create-ticket-popup/create-ticket-popup.component";
@Component({
  selector: 'app-main-card-body',
  templateUrl: './main-card-body.component.html',
  styleUrls: ['./main-card-body.component.css']
})
export class MainCardBodyComponent implements OnInit {
public SelectedTabIndex = 0;
 empty:boolean=false;
 
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
    openDialog() {
    const dialogRef = this.dialog.open(CreateTicketPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
        window.location.reload()
    });
  }

}
