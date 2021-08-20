import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { FiltedredObjectService } from 'src/app/core/services/filtedred-object.service';
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
  createloader: Boolean = false;

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

  filterObject: any = {};
  filterHandler(filterKey: any, filterValue: any) {
    console.log('awaaal', filterKey, filterValue.value);
    let key = filterKey;
    let specificValue: any;
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
    this.filterObject[key] = specificValue;
    console.log('filter', this.filterObject);
  }

  sendFiltersObject() {
    this.createloader = true;

    this.http.GET('ticket/getCount').subscribe((res) => {
      this.pageLength = res;
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: this.filterObject,
          sortValue: 0,
        })
        .subscribe((res) => {
          this.createloader = false;

          this.filteredObject.sendUpdate(this.filterObject);
          console.log('wreeeeny', res);
          this.common.sendUpdate(res);
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
  ticketDate: any;
  dateChange(e) {
    this.ticketDate = this.formatDate(e.value.toDateString());
    console.log('dateee', this.ticketDate);
    this.filterObject['date'] = this.ticketDate;
  }

  clearFilters() {
    this.createloader = true;

    this.filterObject = {};
    this.locations.setValue('');
    this.sources.setValue('');
    this.states.setValue('');
    this.severities.setValue('');
    this.priorities.setValue('');
    this.ticketDate = '';

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
          this.createloader = false;

          console.log('wreeeeny', res);
          this.filteredObject.sendUpdate({});
          this.common.sendUpdate(res);
        });
    });
  }

  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private common: CommonServiceService,
    private filteredObject: FiltedredObjectService
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
      this.filteredObject.getUpdate().subscribe((data) => {
        console.log('ollddddd', data);
        this.locations.setValue(data.location);
        console.log(data.source);
        let sourceValue;
        let stateValue;
        let severityValue;
        let priorityValue;
        for (let i = 0; i < souKeys.length; i++) {
          if (souKeys[i] == data.source) sourceValue = souVal[i];
        }
        for (let i = 0; i < statKeys.length; i++) {
          if (statKeys[i] == data.state) stateValue = statVal[i];
        }
        for (let i = 0; i < sevkeys.length; i++) {
          if (sevkeys[i] == data.severity) severityValue = sevVal[i];
        }
        for (let i = 0; i < priKeys.length; i++) {
          if (priKeys[i] == data.priority) priorityValue = priVal[i];
        }
        this.sources.setValue(sourceValue);
        this.states.setValue(stateValue);
        this.severities.setValue(severityValue);
        this.priorities.setValue(priorityValue);
        this.ticketDate = data.date;
        this.filterObject = {
          location: data.location === '' ? undefined : data.location,
          source: data.source === '' ? undefined : data.source,
          state: data.state === '' ? undefined : data.state,
          severity: data.severity === '' ? undefined : data.severity,
          priority: data.priority === '' ? undefined : data.priority,
          date: data.date === '' ? undefined : data.date,
        };
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
