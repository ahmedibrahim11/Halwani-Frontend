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

  locationChange(e) {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { location: e.value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
    this.dialog.closeAll();
  }
  sourceChange(e) {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { source: e.value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
    this.dialog.closeAll();
  }
  stateChange(e) {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { state: e.value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
    this.dialog.closeAll();
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
          searchText: '',
          pageSize: this.pageLength,
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
    this.dialog.closeAll();
  }
  severityChange(e) {
    console.log('ssss', e.value);
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { severity: e.value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res.pageData);
        });
    });
    this.dialog.closeAll();
  }
  priorityChange(e) {
    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;

      this.http
        .POST('ticket/list', {
          searchText: '',
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: { priority: e.value },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('wreeeeny', res);
          this.common.sendUpdate(res);
        });
    });
    this.dialog.closeAll();
  }

  clearFilters() {
    this.locationList = [];
    this.sourceList = [];
    this.stateList = [];
    this.severityList = [];
    this.priorityList = [];
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
    const statKeys = Object.keys(StatusEnum).filter(
      (k) => typeof StatusEnum[k as any] === 'number'
    );
    statKeys.map((k) => this.stateList.push(StatusEnum[k as any]));
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
