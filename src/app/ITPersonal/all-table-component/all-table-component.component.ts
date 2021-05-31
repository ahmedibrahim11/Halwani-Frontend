import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Input,
} from '@angular/core';

import {
  TicketListingDTO,
  TicketCategoryEnum,
  SevirityEnum,
} from '../../core/DTOs/ticketListingDTO';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FiltermodalComponent } from '../filtermodal/filtermodal.component';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { ResolveTicketComponent } from '../resolve-ticket/resolve-ticket.component';
import { EscalateTicketComponent } from '../escalate-ticket/escalate-ticket.component';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { TicketOptionsComponent } from 'src/app/ITPersonal/ticket-options/ticket-options.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { FormControl } from '@angular/forms';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-all-table-component',
  templateUrl: './all-table-component.component.html',
  styleUrls: ['./all-table-component.component.css'],
})
export class AllTableComponentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public flag: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tabData: number = undefined;
  @Input() Status: number = undefined;
  @Input() from: number = null;
  private subscriptionName: Subscription;
  dataLoaded: boolean = false;
  empty: boolean = true;

  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private service: TicketCreationService,
    private share: SharingdataService,
    private router: Router,
    private common: CommonServiceService,
    private spinner: SpinnerFlagService
  ) {
    this.subscriptionName = this.common.getUpdate().subscribe((data) => {
      this.UserViewInfoObject = data.map((el) => {
        const cerationDate = new Date(el['creationDate']);
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
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  pageLength: any = 5;
  pageSize: any = 5;
  pageIndex: any = 0;
  //handle pagination server side
  pageEvents(event: any) {
    console.log('wreeeny', event, this.pageSize);
    if (this.pageSize !== event.pageSize) {
      console.log('iiiii', event.pageSize);
      this.pageSize = event.pageSize;
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            ticketTabs: this.tabData,
            state: this.Status,
            ticketType: this.from,
          },
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            const cerationDate = new Date(el['creationDate']);
            return {
              id: el['id'],
              initials: this.initials(el['rasiedBy']['name']),
              name: el['rasiedBy']['name'],
              email: el['rasiedBy']['email'],
              createdDate: cerationDate.toDateString(),
              createdTime: cerationDate.toLocaleTimeString(),
              ticketTopic: el['requestType']['name'],
              ticketNumber: el['ticketNumber'],

              ticketCategory: el['requestType']['ticketType'],
              Sevirity: el['severity'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    }
    if (event.pageIndex > this.pageIndex) {
      // Clicked on next button
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            ticketTabs: this.tabData,
            state: this.Status,
            ticketType: this.from,
          },
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            const cerationDate = new Date(el['creationDate']);
            return {
              id: el['id'],
              initials: this.initials(el['rasiedBy']['name']),
              name: el['rasiedBy']['name'],
              email: el['rasiedBy']['email'],
              createdDate: cerationDate.toDateString(),
              createdTime: cerationDate.toLocaleTimeString(),
              ticketTopic: el['requestType']['name'],
              ticketNumber: el['ticketNumber'],

              ticketCategory: el['requestType']['ticketType'],
              Sevirity: el['severity'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    } else {
      // Clicked on previous button
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            ticketTabs: this.tabData,
            state: this.Status,
            ticketType: this.from,
          },
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            const cerationDate = new Date(el['creationDate']);
            return {
              id: el['id'],
              initials: this.initials(el['rasiedBy']['name']),
              name: el['rasiedBy']['name'],
              email: el['rasiedBy']['email'],
              ticketNumber: el['ticketNumber'],

              createdDate: cerationDate.toDateString(),
              createdTime: cerationDate.toLocaleTimeString(),
              ticketTopic: el['requestType']['name'],
              ticketCategory: el['requestType']['ticketType'],
              Sevirity: el['severity'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    }
    // The code that you want to execute on clicking on next and previous buttons will be written here.
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.pageSize = this.paginator.pageSize;
    this.pageIndex = this.paginator.pageIndex;
    this.pageLength = this.paginator.length;
    console.log('daaaaaat');
    console.log('size', this.pageSize);
    console.log('len', this.pageLength);
    console.log('ind', this.pageIndex);
    console.log(this.sort);
    this.dataSource.sort = this.sort;
  }

  //sort server-side
  @HostListener('matSortChange', ['$event'])
  sortChange(sort) {
    debugger;
    // save cookie with table sort data here
    console.log(sort);
    let sortValue = 0;
    let sortDirec = 0;
    switch (sort.active) {
      case 'name':
        sortValue = 1;
        break;
      case 'createdDate':
        sortValue = 0;
        break;
      case 'ticketCategory':
        sortValue = 2;
        break;
      case 'Sevirity':
        sortValue = 3;
        break;
    }
    switch (sort.direction) {
      case 'asc':
        sortDirec = 0;
        break;
      case 'desc':
        sortDirec = 1;
        break;
      default:
        sortDirec = 0;
    }
    this.http
      .POST('ticket/list', {
        searchText: [],
        pageSize: this.pageSize,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {
          ticketTabs: this.tabData,
          state: this.Status,
          ticketType: this.from,
        },
        sortvalue: sortValue,
        sortDirection: sortDirec,
      })
      .subscribe((res) => {
        console.log(res.pageData);
        let usersData = res.pageData;
        this.UserViewInfoObject = usersData.map((el) => {
          const cerationDate = new Date(el['creationDate']);
          return {
            id: el['id'],
            initials: this.initials(el['rasiedBy']['name']),
            name: el['rasiedBy']['name'],
            email: el['rasiedBy']['email'],
            ticketNumber: el['ticketNumber'],

            createdDate: cerationDate.toDateString(),
            createdTime: cerationDate.toLocaleTimeString(),
            ticketTopic: el['requestType']['name'],
            ticketCategory: el['requestType']['ticketType'],
            Sevirity: el['severity'],
          };
        });
        console.log(this.UserViewInfoObject);
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      });
  }

  displayedColumns: string[] = [
    'select',
    'ticketNumber',
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

  //search by chips part
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsItems: any = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.chipsItems.push({ name: value });
    }

    // Clear the input value
    //event.input!.remove();
  }

  remove(item: any): void {
    const index = this.chipsItems.indexOf(item);

    if (index >= 0) {
      this.chipsItems.splice(index, 1);
    }
  }
  applyFilter(event: Event) {
    console.log('wreeny', event);
    if (event['key'] === 'Enter') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      return null;
    }
  }

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

  UserViewInfoObject: TicketListingDTO[] = new Array<TicketListingDTO>();
  public TicketCategory = TicketCategoryEnum;
  public sevirity = SevirityEnum;

  dataSource: any;
  showSpinner: Boolean = true;
  usersName: any = [];

  ticketsNO: any = [];

  ticketForm: FormGroup = new FormGroup({ ticket: new FormControl() });
  filteredTickets: Observable<any[]>;
  @Output() optionSelected = new EventEmitter();
  private filter(value: string | any): Observable<any[]> {
    const val = typeof value === 'string' ? value : value.ticketName;
    console.log('inside filter, value is: ', value);
    if (value === '') {
      this.http
        .POST('ticket/list', {
          searchText: [],
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: {
            ticketTabs: this.tabData,
            state: this.Status,
            ticketType: this.from,
          },
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('search rsut', res);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            const cerationDate = new Date(el['creationDate']);
            return {
              id: el['id'],
              initials: this.initials(el['rasiedBy']['name']),
              name: el['rasiedBy']['name'],
              email: el['rasiedBy']['email'],
              createdDate: cerationDate.toDateString(),
              createdTime: cerationDate.toLocaleTimeString(),
              tticketTopic: el['requestType']['name'],
              ticketNumber: el['ticketNumber'],

              ticketCategory: el['requestType']['ticketType'],
              Sevirity: el['severity'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    }
    return of(
      this.ticketsNO.filter((ticket) =>
        ticket.toLowerCase().includes(val.toLowerCase())
      )
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ticketName) {
      console.log(changes.ticketName.currentValue);
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log('event: option selected is ', event.option.value);
    this.optionSelected.emit(event);
    this.http
      .POST('ticket/list', {
        searchText: [event.option.value],
        pageSize: 5,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {
          ticketTabs: this.tabData,
          state: this.Status,
          ticketType: this.from,
        },
        sortValue: 0,
      })
      .subscribe((res) => {
        console.log('search rsut', res);
        let usersData = res.pageData;
        this.UserViewInfoObject = usersData.map((el) => {
          const cerationDate = new Date(el['creationDate']);
          return {
            id: el['id'],
            initials: this.initials(el['rasiedBy']['name']),
            name: el['rasiedBy']['name'],
            email: el['rasiedBy']['email'],
            ticketNumber: el['ticketNumber'],

            createdDate: cerationDate.toDateString(),
            createdTime: cerationDate.toLocaleTimeString(),
            tticketTopic: el['requestType']['name'],
            ticketCategory: el['requestType']['ticketType'],
            Sevirity: el['severity'],
          };
        });
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      });
  }

  displayCo(ticket?: any): string | undefined {
    return ticket ? ticket : undefined;
  }
  ngOnInit(): void {
    this.http.GET('ticket/getTicketNumbers').subscribe((res) => {
      res.map((d) => {
        this.ticketsNO.push(d);
      });
    });
    this.filteredTickets = this.ticketForm
      .get('ticket')
      .valueChanges.pipe(
        tap((val) =>
          console.log('inside valueChanges Observable, val is: ', val)
        ),
        debounceTime(200)
      )
      .pipe(mergeMap((val) => this.filter(val)));
    console.log('Tab', this.tabData);
    this.spinner.setSpinnerValue(this.showSpinner);
    this.service.getValue().subscribe((value) => {
      this.flag = value;
      if (this.flag === true) {
        this.pageLength = this.pageLength + 1;
        this.http
          .POST('ticket/list', {
            searchText: [],
            pageSize: this.pageLength,
            pageNumber: this.pageIndex,
            isPrint: false,
            filter: {
              ticketTabs: this.tabData,
              state: this.Status,
              ticketType: this.from,
            },
            sortValue: 0,
          })
          .subscribe((res) => {
            if (res.totalCount !== 0) {
              this.showSpinner = false;
              this.spinner.setSpinnerValue(this.showSpinner);
              this.dataLoaded = true;
              this.pageLength = res.totalCount;
              this.empty = false;

              console.log('resulttttt', res.pageData);
              let usersData = res.pageData;
              this.UserViewInfoObject = usersData.map((el) => {
                this.usersName.push(el['rasiedBy']['name']);

                const cerationDate = new Date(el['creationDate']);
                return {
                  id: el['id'],
                  initials: this.initials(el['rasiedBy']['name']),
                  name: el['rasiedBy']['name'],
                  email: el['rasiedBy']['email'],
                  createdDate: cerationDate.toDateString(),
                  createdTime: cerationDate.toLocaleTimeString(),
                  ticketTopic: el['requestType']['name'],
                  ticketCategory: el['requestType']['ticketType'],
                  ticketNumber: el['ticketNumber'],

                  Sevirity: el['severity'],
                };
              });
              this.getRedMenuCharacters(this.usersName);

              this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
              this.setDataSourceAttributes();
            } else {
              this.dataLoaded = false;
              this.empty = true;
              this.showSpinner = false;
            }
          });
      } else {
        this.http
          .POST('ticket/list', {
            searchText: [],
            pageSize: this.pageLength,
            pageNumber: this.pageIndex,
            isPrint: false,
            filter: {
              ticketTabs: this.tabData,
              state: this.Status,
              ticketType: this.from,
            },
            sortValue: 0,
          })
          .subscribe((res) => {
            if (res.totalCount !== 0) {
              this.showSpinner = false;
              this.spinner.setSpinnerValue(this.showSpinner);
              this.dataLoaded = true;
              this.pageLength = res.totalCount;
              this.empty = false;

              console.log('resulttttt', res.pageData);
              let usersData = res.pageData;
              this.UserViewInfoObject = usersData.map((el) => {
                this.usersName.push(el['rasiedBy']['name']);

                const cerationDate = new Date(el['creationDate']);
                return {
                  id: el['id'],
                  initials: this.initials(el['rasiedBy']['name']),
                  name: el['rasiedBy']['name'],
                  email: el['rasiedBy']['email'],
                  createdDate: cerationDate.toDateString(),
                  createdTime: cerationDate.toLocaleTimeString(),
                  ticketTopic: el['requestType']['name'],
                  ticketCategory: el['requestType']['ticketType'],
                  ticketNumber: el['ticketNumber'],

                  Sevirity: el['severity'],
                };
              });
              this.getRedMenuCharacters(this.usersName);

              this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
              this.setDataSourceAttributes();
            } else {
              this.dataLoaded = false;
              this.empty = true;
              this.showSpinner = false;
            }
          });
      }
    });
  }

  firstCharacter: any;
  getRedMenuCharacters(names: any = []) {
    let allNames: any = [];
    for (let i = 0; i < names.length; i++) {
      allNames.push(names[i].split('@'));
      this.firstCharacter = allNames[i][0].charAt(0).toUpperCase();
    }
  }

  initials(name) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }

  openFilterModal() {
    const dialogRef = this.dialog.open(FiltermodalComponent, {
      position: { top: '21%', left: '17%' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  resolveTicket(id: any) {
    const dialogRef = this.dialog.open(ResolveTicketComponent, {
      position: { top: '15%', left: '22%' },
    });
    this.share.setData(id);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  escalateTicket(id: any) {
    const dialogRef = this.dialog.open(EscalateTicketComponent, {
      position: { top: '15%', left: '22%' },
    });
    this.share.setData(id);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openTicket(ticketID: any) {
    this.router.navigate(['/itpersonal/details/' + ticketID]);
  }
  openOptions(id: any) {
    const dialogRef = this.dialog.open(TicketOptionsComponent, {
      position: { top: '25%', right: '15%' },
    });
    this.share.setData(id);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
