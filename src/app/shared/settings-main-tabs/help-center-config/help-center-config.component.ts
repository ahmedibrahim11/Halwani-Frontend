import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSettingsComponent } from './add-settings/add-settings.component';
@Component({
  selector: 'app-help-center-config',
  templateUrl: './help-center-config.component.html',
  styleUrls: ['./help-center-config.component.css']
})
export class HelpCenterConfigComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
openAddSettings() {
    const dialogRef = this.dialog.open(AddSettingsComponent, {
     
      width:"35%",
      height:"90%"
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
