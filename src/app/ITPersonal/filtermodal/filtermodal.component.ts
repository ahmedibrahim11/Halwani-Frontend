import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketListingDTO } from '../../core/DTOs/ticketListingDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.component.html',
  styleUrls: ['./filtermodal.component.css'],
})
export class FiltermodalComponent implements OnInit {
  locations = new FormControl();
  locationList: any = [];

  sources = new FormControl();
  sourceList: any = [];

  states = new FormControl();
  stateList: any = [];

  severities = new FormControl();
  severityList: any = [];

  priorities = new FormControl();
  priorityList: any = [];

  locationChange(e) {
    this.updateTableByFilters('location', e.value);
  }
  sourceChange(e) {
    this.updateTableByFilters('source', e.value);
  }
  stateChange(e) {
    this.updateTableByFilters('state', e.value);
  }
  dateChange(e) {
    console.log(e.value);
    this.updateTableByFilters('date', e.value);
  }
  severityChange(e) {
    console.log('ssss', e.value);
    this.updateTableByFilters('severity', e.value);
    //this.dialog.closeAll();
  }
  priorityChange(e) {
    this.updateTableByFilters('priority', e.value);
  }

  clearFilters() {
    this.locationList = [];
    this.sourceList = [];
    this.stateList = [];
    this.severityList = [];
    this.priorityList = [];
  }

  updateTableByFilters(key: any, value: any) {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;
      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { filterType: key, filterValue: value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('resulttttt', res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            const cerationDate = new Date(el['creationDate']);
            this.pageLength = res.pageData.length;
            return {
              id: el['id'],
              initials: this.initials(el['rasiedBy']['name']),
              name: el['rasiedBy']['name'],
              email: el['rasiedBy']['email'],
              createdDate: cerationDate.toDateString(),
              createdTime: cerationDate.toLocaleTimeString(),
              ticketTopic: el['requestType']['name'],
              ticketCategory: el['requestType']['ticketType'],
              Sevirity: el['severity'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    });
  }
  constructor(private http: HTTPMainServiceService, public dialog: MatDialog) {}
  pageLength: any = 10;
  pageSize: any = 5;
  pageIndex: any = 0;
  dataSource: any;
  UserViewInfoObject: TicketListingDTO[] = new Array<TicketListingDTO>();

  ngOnInit(): void {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;
      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: {},
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('resulttttt modaaaaaaal', res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            this.pageLength = res.pageData.length;
            this.severityList.push(el['severity']);
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    });
  }

  initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
}
