import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import {
  PriorityEnum,
  SevirityEnum,
  SourceEnum,
  TicketListingDTO,
} from '../../core/DTOs/ticketListingDTO';
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
    this.dialog.closeAll();
  }
  sourceChange(e) {
    this.updateTableByFilters('source', e.value);
    this.dialog.closeAll();
  }
  stateChange(e) {
    this.updateTableByFilters('state', e.value);
    this.dialog.closeAll();
  }
  dateChange(e) {
    console.log(e.value);
    this.updateTableByFilters('date', e.value);
    this.dialog.closeAll();
  }
  severityChange(e) {
    console.log('ssss', e.value);
    this.updateTableByFilters('severity', e.value);
    this.dialog.closeAll();
  }
  priorityChange(e) {
    this.updateTableByFilters('priority', e.value);
    this.dialog.closeAll();
  }

  clearFilters() {
    this.locationList = [];
    this.sourceList = [];
    this.stateList = [];
    this.severityList = [];
    this.priorityList = [];
  }

  updateTableByFilters(key: any, value: any) {
    console.log('fi', key, value);
    let filter = {};
    filter[key] = value;
    console.log('fillll', filter);
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: filter,
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
          console.log('filter result', this.dataSource);
        });
    });
  }
  constructor(private http: HTTPMainServiceService, public dialog: MatDialog) {}
  pageLength: any = 5;
  pageSize: any = 5;
  pageIndex: any = 0;
  dataSource: any;
  UserViewInfoObject: TicketListingDTO[] = new Array<TicketListingDTO>();

  ngOnInit(): void {
    const sevKeys = Object.keys(SevirityEnum).filter(
      (k) => typeof SevirityEnum[k as any] === 'number'
    );
    sevKeys.map((k) => this.severityList.push(SevirityEnum[k as any]));
    const priKeys = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'number'
    );
    priKeys.map((k) => this.priorityList.push(PriorityEnum[k as any]));
    const souKeys = Object.keys(SourceEnum).filter(
      (k) => typeof SourceEnum[k as any] === 'number'
    );
    souKeys.map((k) => this.sourceList.push(SourceEnum[k as any]));
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
