import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';

@Component({
  selector: 'app-personal-service-request',
  templateUrl: './personal-service-request.component.html',
  styleUrls: ['./personal-service-request.component.css'],
})
export class PersonalServiceRequestComponent implements OnInit {
  public SelectedTabIndex = 0;
  empty: boolean = false;
  showSpinner: boolean = true;

  constructor(
    private exportService: ExportexcelService,
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private tabs: TabscreationService,
    private spinner: SpinnerFlagService
  ) {}

  ngOnInit(): void {
    this.tabs.setTabValue('ServiceRequest');
    this.spinner.getSpinnerValue().subscribe((flag) => {
      this.showSpinner = flag;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTicketPopupComponent, {
      data: { pageValue: 'ServiceRequest' },
    });

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
        searchText: [],
        isPrint: true,
        filter: { ticketType: 0, ticketTabs: this.SelectedTabIndex },
      })
      .subscribe((res) => {
        let ticketsData = res.pageData.map((ticket) => {
          return {
            name: ticket['rasiedBy']['name'],
            email: ticket['rasiedBy']['email'],
            createdDate: ticket['creationDate'],
            createdTime: ticket['creationDate'],
            ticketTopic: ticket['ticketTopic'],
            ticketNumber: ticket['ticketNumber'],

            ticketCategory: ticket['ticketType'],
            Sevirity: ticket['severity'],
          };
        });
        this.exportService.exportAsExcelFile(
          ticketsData,
          'ServiceRequests_data'
        );
      });
  }
}
