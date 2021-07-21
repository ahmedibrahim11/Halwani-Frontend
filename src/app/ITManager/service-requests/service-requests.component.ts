import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css'],
})
export class ServiceRequestsComponent implements OnInit {
  empty: boolean = false;
  showSpinner: boolean = true;

  constructor(
    private exportService: ExportexcelService,
    private http: HTTPMainServiceService,
    private tabs: TabscreationService,
    public dialog: MatDialog,
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
      width: '40vw',

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
        filter: { ticketType: 0 },
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
            ticketNumber: ticket['ticketNumber'],

            Sevirity: ticket['severity'],
          };
        });
        this.exportService.exportAsExcelFile(
          ticketsData,
          'Service_Requests_data'
        );
      });
  }
}
