import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.css']
})
export class TicketHistoryComponent implements OnInit {
ticketID:any=undefined;
  constructor( private http: HTTPMainServiceService,
      public dialogRef: MatDialogRef<TicketHistoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ticketID = data ? data.ticketID : undefined;
     }
dataSource:any;
displayedColumns: string[] 
  ngOnInit(): void {
    this.http
        .POST('Ticket/getTicketHistory/', {id:this.ticketID.toString()})
        .subscribe((res) => {
          this.displayedColumns = ['position', 'name', 'weight', 'symbol','symbol2'];
         this.dataSource = res;
          console.log(res)
        });
  }

}
