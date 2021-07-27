import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AskForSupportComponent } from '../ask-for-support/ask-for-support.component';
import { ReportABugComponent } from '../report-abug/report-abug.component';
@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.css']
})
export class UserSideBarComponent implements OnInit {
 constructor(private router: Router, public dialog: MatDialog,) {}

  ngOnInit(): void {}

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
  fromManager() {
    return window.location.href.includes('/itmanager');
  }

  userLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  reportABug()
  {
    const dialogRef = this.dialog.open(ReportABugComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  askForSupport()
  {  const dialogRef = this.dialog.open(AskForSupportComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });}
}
