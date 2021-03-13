import { Component, OnInit, ViewChild } from '@angular/core';
import { HTTPMainServiceService } from '../services/httpmain-service.service';
import {
  TicketListingDTO,
  TicketCategoryEnum,
  SevirityEnum,
} from '../DTOs/ticketListingDTO';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-table-component',
  templateUrl: './all-table-component.component.html',
  styleUrls: ['./all-table-component.component.css'],
})
export class AllTableComponentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'createdDate',
    'ticketCategory',
    'Sevirity',
    'Actions',
  ];
  //check boxes part
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<TicketListingDTO>(
    this.allowMultiSelect,
    this.initialSelection
  );

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.UserViewInfoObject.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.UserViewInfoObject.forEach((row) => this.selection.select(row));
  }

  constructor(private http: HTTPMainServiceService) {}
  UserViewInfoObject: TicketListingDTO[] = new Array<TicketListingDTO>();
  public TicketCategory = TicketCategoryEnum;
  public sevirity = SevirityEnum;

  dataSource: any;
  ngOnInit(): void {
    this.http.GET('tickets').subscribe((res) => {
      console.log(res);
      this.UserViewInfoObject = res.map((el) => {
        let creationDate = new Date();
        return {
          initials: this.initials(el.name),
          name: el.name,
          email: el.email,
          createdDate: creationDate.toDateString(),
          createdTime: creationDate.toLocaleTimeString(),
          ticketTopic: el.ticketTopic,
          ticketCategory: el.ticketCategory,
          Sevirity: el.sevirity,
        };
      });
      this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      console.log(this.dataSource);
      this.setDataSourceAttributes();
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
