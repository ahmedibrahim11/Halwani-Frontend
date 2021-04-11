import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { ExportexcelService } from 'src/app/core/services/exportexcel.service';
import { CreateTicketPopupComponent } from '../create-ticket-popup/create-ticket-popup.component';
@Component({
  selector: 'app-main-card-body-manager',
  templateUrl: './main-card-body-manager.component.html',
  styleUrls: ['./main-card-body-manager.component.css'],
})
export class MainCardBodyManagerComponent implements OnInit {
  public SelectedTabIndex = 0;
  empty: boolean = false;

  constructor(
    private exportService: ExportexcelService,
    private http: HTTPMainServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.http.POST('Ticket/List',{pageSize:10}).subscribe(res=>{
    console.log(res)
    res.totalCount===0?this.empty=true:this.empty=false;
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateTicketPopupComponent,{data: { pageValue: undefined }});

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
