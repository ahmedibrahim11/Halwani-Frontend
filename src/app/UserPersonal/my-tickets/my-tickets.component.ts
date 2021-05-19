import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { CreatTicketPopupComponent } from '../creat-ticket-popup/creat-ticket-popup.component';




@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
public SelectedTabIndex = 0;
  empty: boolean = false;
  showSpinner: boolean = true;

  constructor(
    private exportService: ExportexcelService,
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private tabs: TabscreationService,
    private spinner: SpinnerFlagService,
    private service: TicketCreationService
  ) {}

  flag: any;

  ngOnInit(): void {
    this.service.getValue().subscribe((value) => {
      this.flag = value;
      if (this.flag === true) {
        this.http.POST('Ticket/List', { pageSize: 10 }).subscribe((res) => {
          console.log(res);
          res.totalCount === 0 ? (this.empty = true) : (this.empty = false);
        });
      }
    });

    this.tabs.setTabValue(undefined);
    this.spinner.getSpinnerValue().subscribe((flag) => {
      this.showSpinner = flag;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreatTicketPopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.http.GET('Ticket/getCount').subscribe((res) => {
        console.log(res);
        res === 0 ? (this.empty = true) : (this.empty = false);
      });
    });
  }
  

 

}
