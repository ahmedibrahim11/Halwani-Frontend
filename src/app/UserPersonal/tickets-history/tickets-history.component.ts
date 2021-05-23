import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';

@Component({
  selector: 'app-tickets-history',
  templateUrl: './tickets-history.component.html',
  styleUrls: ['./tickets-history.component.css']
})
export class TicketsHistoryComponent implements OnInit {
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
  userName:any;
  token:any;
  withActions:any=false;
getTokenPayloads() {
    this.token = localStorage.getItem('userData');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this.userName = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
       
  }
  ngOnInit(): void {
    this.getTokenPayloads();
    this.service.getValue().subscribe((value) => {
      this.flag = value;
 
        this.http.POST('Ticket/List', { pageSize: 10, filter: {
            submitterName:this.userName,State: 7} }).subscribe((res) => {
          console.log("empty",res.totalCount === 0 ? (this.empty = true) : (this.empty = false));
          res.totalCount === 0 ? (this.empty = true) : (this.empty = false);
        });
      
    });

    this.tabs.setTabValue(undefined);
    this.spinner.getSpinnerValue().subscribe((flag) => {
      this.showSpinner = flag;
    });
  }
  

}
