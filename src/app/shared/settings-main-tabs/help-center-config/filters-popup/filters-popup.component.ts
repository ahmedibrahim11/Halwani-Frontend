import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PriorityEnum, SevirityEnum, TicketCategoryEnum } from 'src/app/core/DTOs/ticketListingDTO';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';

@Component({
  selector: 'app-filters-popup',
  templateUrl: './filters-popup.component.html',
  styleUrls: ['./filters-popup.component.css']
})
export class FiltersPopupComponent implements OnInit {
  Group = new FormControl();
  GroupList: any = [];
   TicketType = new FormControl();
  ticketTypeList: any = [];
  team=new FormControl();
  teamSoruce:any=[];
severities = new FormControl();
  severityList: any = [];

  priorities = new FormControl();
  priorityList: any = [];

  filterHandler(filterKey: any, filterValue: any) {
    let key = filterKey;
    let filterObject = {};
    filterObject[key] = filterValue.value;
   
      this.http
        .POST('RequestType/list', {
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
console.log(this.team)
  }

 
 

  clearFilters() {
 
      this.http
        .POST('RequestType/list', {
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
const typeVal = Object.keys(TicketCategoryEnum).filter(
      (k) => typeof TicketCategoryEnum[k as any] === 'number'
    );
    const typeKeys = Object.keys(TicketCategoryEnum).filter(
      (k) => typeof TicketCategoryEnum[k as any] === 'string'
    );
    for (let i = 0; i < typeVal.length; i++) {
      this.ticketTypeList.push({ text: typeVal[i], value: Number(typeKeys[i]) });
    }
   

   
    this.http.GET('Team/get').subscribe((data) => {
      this.teamSoruce = data.map((el) => {
        return { text: el.text, value: el.text };
      });
      console.log(this.teamSoruce)
    })
    this.http.GET('Group/getGroup').subscribe((data) => {
      this.GroupList = data.map((el) => {
        return { text: el.text, value: el.id };
      });
      console.log(this.teamSoruce)
    })
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
