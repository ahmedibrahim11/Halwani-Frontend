import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ticket-options',
  templateUrl: './ticket-options.component.html',
  styleUrls: ['./ticket-options.component.css'],
})
export class TicketOptionsComponent implements OnInit {
  constructor(private http: HTTPMainServiceService, public dialog: MatDialog) {}
  @Input() ticketID;
  ngOnInit(): void {}
  editHandler() {
    this.dialog.closeAll();
  }
}
