import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';

@Component({
  selector: 'app-main-card-body',
  templateUrl: './main-card-body.component.html',
  styleUrls: ['./main-card-body.component.css'],
})
export class MainCardBodyComponent implements OnInit {
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
    const dialogRef = this.dialog.open(CreateTicketPopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.http.GET('Ticket/getCount').subscribe((res) => {
        console.log(res);
        res === 0 ? (this.empty = true) : (this.empty = false);
      });
    });
  }

  exportTable() {
    this.http
      .POST('ticket/list', {
        searchText: '',
        isPrint: true,
        filter: {},
      })
      .subscribe((res) => {
        let ticketsData = res.pageData.map((ticket) => {
          return {
            name: ticket['rasiedBy']['name'],
            email: ticket['rasiedBy']['email'],
            createdDate: ticket['creationDate'],
            createdTime: ticket['creationDate'],
            ticketTopic: ticket['ticketTopic'],
            ticketCategory: ticket['ticketType'],
            Sevirity: ticket['severity'],
          };
        });
        this.exportService.exportAsExcelFile(ticketsData, 'tickets_data');
      });
  }
}
