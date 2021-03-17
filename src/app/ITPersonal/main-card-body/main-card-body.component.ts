import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';
import { HTTPMainServiceService } from '../../core/services/httpmain-service.service';
import { ExportexcelService } from '../../core/services/exportexcel.service';

@Component({
  selector: 'app-main-card-body',
  templateUrl: './main-card-body.component.html',
  styleUrls: ['./main-card-body.component.css'],
})
export class MainCardBodyComponent implements OnInit {
  public SelectedTabIndex = 0;
  empty: boolean = false;

  constructor(
    private exportService: ExportexcelService,
    private http: HTTPMainServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
   this.http.GET('Ticket/getCount').subscribe(res=>{
    console.log(res)
    res===0?this.empty=true:this.empty=false;
    })

  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTicketPopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.http.GET('Ticket/getCount').subscribe(res=>{
    console.log(res)
    res===0?this.empty=true:this.empty=false;
    })
        
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
