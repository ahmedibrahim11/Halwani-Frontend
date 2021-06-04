import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import {
  PriorityEnum,
  SevirityEnum,
  SourceEnum,
  StatusEnum,
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

  filterHandler(filterKey: any, filterValue: any) {
    let key = filterKey;
    let specificValue: any;
    let filterObject = {};
    switch (key) {
      case 'source':
        specificValue = Number(
          Object.keys(SourceEnum).find(
            (s) => SourceEnum[s] === filterValue.value
          )
        );
        break;
      case 'state':
        specificValue = Number(
          Object.keys(StatusEnum).find(
            (s) => StatusEnum[s] === filterValue.value
          )
        );
        break;
      case 'severity':
        specificValue = Number(
          Object.keys(SevirityEnum).find(
            (s) => SevirityEnum[s] === filterValue.value
          )
        );
        break;
      case 'priority':
        specificValue = Number(
          Object.keys(PriorityEnum).find(
            (s) => PriorityEnum[s] === filterValue.value
          )
        );
        break;
      case 'location':
        specificValue = filterValue.value;
        break;
    }
    console.log('eeeee', specificValue);
    filterObject[key] = specificValue;
    console.log('filter', filterObject);
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: filterObject,
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  dateChange(e) {
    let ticketDate = this.formatDate(e.value.toDateString());
    console.log('dateee', ticketDate);
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { date: ticketDate },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
  }

  clearFilters() {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: {},
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
  }

  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private common: CommonServiceService
  ) {}
  pageLength: any = 5;
  pageSize: any = 5;
  pageIndex: any = 0;

  ngOnInit(): void {
    const sevVal = Object.keys(SevirityEnum).filter(
      (k) => typeof SevirityEnum[k as any] === 'number'
    );
    const sevkeys = Object.keys(SevirityEnum).filter(
      (k) => typeof SevirityEnum[k as any] === 'string'
    );
    for (let i = 0; i < sevVal.length; i++) {
      this.severityList.push({ text: sevVal[i], value: Number(sevkeys[i]) });
    }

    const priVal = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'number'
    );
    const priKeys = Object.keys(PriorityEnum).filter(
      (k) => typeof PriorityEnum[k as any] === 'string'
    );
    for (let i = 0; i < priVal.length; i++) {
      this.priorityList.push({ text: priVal[i], value: Number(priKeys[i]) });
    }

    const souVal = Object.keys(SourceEnum).filter(
      (k) => typeof SourceEnum[k as any] === 'number'
    );
    const souKeys = Object.keys(SourceEnum).filter(
      (k) => typeof SourceEnum[k as any] === 'string'
    );
    for (let i = 0; i < souVal.length; i++) {
      this.sourceList.push({ text: souVal[i], value: Number(souKeys[i]) });
    }

    const statVal = Object.keys(StatusEnum).filter(
      (k) => typeof StatusEnum[k as any] === 'number'
    );
    const statKeys = Object.keys(StatusEnum).filter(
      (k) => typeof StatusEnum[k as any] === 'string'
    );
    for (let i = 0; i < statVal.length; i++) {
      this.stateList.push({ text: statVal[i], value: Number(statKeys[i]) });
    }
    this.http.GET('api/Location/getLocations').subscribe((data) => {
      console.log('locations', data);
      data.map((location) => {
        this.locationList.push({
          label: location['text'],
          value: location['id'],
        });
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
