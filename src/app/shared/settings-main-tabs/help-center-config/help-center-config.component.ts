import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { RequestTypeListingDTO } from 'src/app/core/DTOs/requestTypeListingDTO';
import { TicketCategoryEnum } from 'src/app/core/DTOs/ticketListingDTO';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { HelpCenterFilterService } from 'src/app/core/services/help-center-filter.service';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { SetInvisibleConfirmationComponent } from '../product-category-settings/set-invisible-confirmation/set-invisible-confirmation.component';
import { SetVisibleConfirmationComponent } from '../product-category-settings/set-visible-confirmation/set-visible-confirmation.component';
import { AddSettingsComponent } from './add-settings/add-settings.component';
import { FiltersPopupComponent } from './filters-popup/filters-popup.component';
@Component({
  selector: 'app-help-center-config',
  templateUrl: './help-center-config.component.html',
  styleUrls: ['./help-center-config.component.css'],
})
export class HelpCenterConfigComponent implements OnInit {
  public TicketCategory = TicketCategoryEnum;
  @ViewChild(MatSort) sort: MatSort;
  public flag: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptionName: Subscription;
  dataLoaded: boolean = false;
  empty: boolean = true;

  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private service: HelpCenterFilterService,
    private _snackBar: MatSnackBar,
    private common: CommonServiceService,
    private spinner: SpinnerFlagService
  ) 
  {
    this.subscriptionName = this.common.getUpdate().subscribe((data) => {
      this.UserViewInfoObject = data.pageData.map((el) => {
        return {
          id: el['id'],
          name: el['title'],
          description: el['description'],
          group: el['group'],
          ticketType: el['ticketType'],
          initials: this.initials(el['team']),
          team: el['team'],
          isVisable: el['isVisable'],
        };
      });
      this.dataSource = new MatTableDataSource(this.UserViewInfoObject);

      this.paginator.length = data.totalCount;
      this.setDataSourceAttributes();
    });
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
        .POST('RequestType​/List', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {},
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            return {
              id: el['id'],
              name: el['title'],
              description: el['description'],
              group: el['group'],
              ticketType: el['ticketType'],
              initials: this.initials(el['team']),
              team: el['team'],

              isVisable: el['isVisable'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    }
    if (event.pageIndex > this.pageIndex) {
      // Clicked on next button
      this.http
        .POST('RequestType/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {},
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            return {
              id: el['id'],
              name: el['title'],
              description: el['description'],
              group: el['group'],
              ticketType: el['ticketType'],
              initials: this.initials(el['team']),
              team: el['team'],
              isVisable: el['isVisable'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    } else {
      // Clicked on previous button
      this.http
        .POST('RequestType/list', {
          searchText: [],
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {},
          sortvalue: 0,
        })
        .subscribe((res) => {
          console.log(res.pageData);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            return {
              id: el['id'],
              name: el['title'],
              description: el['description'],
              group: el['group'],
              ticketType: el['ticketType'],
              initials: this.initials(el['team']),
              team: el['team'],
              isVisable: el['isVisable'],
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
        sortValue = 0;
        break;
      case 'group':
        sortValue = 1;
        break;
      case 'ticketType':
        sortValue = 2;
        break;
      case 'team':
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
      .POST('RequestType/list', {
        searchText: [],
        pageSize: this.pageSize,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {},
        sortvalue: sortValue,
        sortDirection: sortDirec,
      })
      .subscribe((res) => {
        console.log(res.pageData);
        let usersData = res.pageData;
        this.UserViewInfoObject = usersData.map((el) => {
          return {
            id: el['id'],
            name: el['title'],
            description: el['description'],
            group: el['group'],
            ticketType: el['ticketType'],
            initials: this.initials(el['team']),
            team: el['team'],
            isVisable: el['isVisable'],
          };
        });
        console.log(this.UserViewInfoObject);
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      });
  }

  displayedColumns: string[] = [
    'select',
    'name',
    'group',
    'ticketType',
    'team',
    'Actions',
  ];
  //check boxes part
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<RequestTypeListingDTO>(
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

  UserViewInfoObject: RequestTypeListingDTO[] =
    new Array<RequestTypeListingDTO>();

  dataSource: any;
  showSpinner: Boolean = true;
  usersName: any = [];

  ticketsNO: any = [];

  ticketForm: FormGroup = new FormGroup({ ticket: new FormControl() });
  filteredTickets: Observable<any[]>;
  @Output() optionSelected = new EventEmitter();
  private filter(value: string | any): Observable<any[]> {
    const val = typeof value === 'string' ? value : value.ticketName;
    console.log('inside filter, value is: ', val);
    console.log(this.ticketsNO);
    if (value === '') {
      this.http
        .POST('RequestType/list', {
          searchText: [],
          pageSize: this.pageLength,
          pageNumber: this.pageIndex,
          isPrint: false,
          filter: {},
          sortValue: 0,
        })
        .subscribe((res) => {
          console.log('search rsut', res);
          let usersData = res.pageData;
          this.UserViewInfoObject = usersData.map((el) => {
            return {
              id: el['id'],
              name: el['title'],
              description: el['description'],
              group: el['group'],
              ticketType: el['ticketType'],
              initials: this.initials(el['team']),
              team: el['team'],
              isVisable: el['isVisable'],
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
          this.paginator.length = this.UserViewInfoObject.length;
          this.setDataSourceAttributes();
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
      .POST('RequestType/list', {
        searchText: [],
        pageSize: 5,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: { SearchText: event.option.value },
        sortValue: 0,
      })
      .subscribe((res) => {
        console.log('search rsut', res);
        let usersData = res.pageData;
        this.UserViewInfoObject = usersData.map((el) => {
          const cerationDate = new Date(el['creationDate']);
          return {
            id: el['id'],
            name: el['title'],
            description: el['description'],
            group: el['group'],
            ticketType: el['ticketType'],
            initials: this.initials(el['team']),
            team: el['team'],
            isVisable: el['isVisable'],
          };
        });
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        this.setDataSourceAttributes();
      });
  }

  displayCo(ticket?: any): string | undefined {
    return ticket ? ticket : undefined;
  }
  helpcenter: FormGroup = new FormGroup({ name: new FormControl() });
  ngOnInit(): void {
    this.http
      .POST('RequestType/list', {
        searchText: [],
        pageSize: 10000,
        pageNumber: this.pageIndex,
        isPrint: true,
        filter: {},
        sortValue: 0,
      })
      .subscribe((res) => {
        res.pageData.map((d) => {
          this.ticketsNO.push(d['title']);
        });
        console.log(this.ticketsNO);
      });
    this.filteredTickets = this.helpcenter
      .get('name')
      .valueChanges.pipe(
        tap((val) =>
          console.log('inside valueChanges Observable, val is: ', val)
        ),
        debounceTime(200)
      )
      .pipe(mergeMap((val) => this.filter(val)));
    console.log(this.filteredTickets);
    this.spinner.setSpinnerValue(this.showSpinner);
    this.service.getValue().subscribe((value) => {
      debugger;
      this.flag = value;
      if (this.flag === true) {
        this.pageLength = this.pageLength + 1;
        if (this.filterPreservingData != null) {
          this.http
            .POST('RequestType/list', {
              searchText: [],
              pageSize: this.pageLength,
              pageNumber: this.pageIndex,
              isPrint: false,
              filter: {
                team: this.filterPreservingData.team.value,
                groupID: this.filterPreservingData.group.value,
                severity: this.filterPreservingData.severity.value,
                ticketType: this.filterPreservingData.ticketType.value,
                priority: this.filterPreservingData.priority.value,
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
                  return {
                    id: el['id'],
                    name: el['title'],
                    description: el['description'],
                    group: el['group'],
                    ticketType: el['ticketType'],
                    initials: this.initials(el['team']),
                    team: el['team'],
                    isVisable: el['isVisable'],
                  };
                });
                this.getRedMenuCharacters(this.usersName);

                this.dataSource = new MatTableDataSource(
                  this.UserViewInfoObject
                );
                this.setDataSourceAttributes();
              } else {
                this.dataLoaded = false;
                this.empty = true;
                this.showSpinner = false;
              }
            });
        } else {
          this.http
            .POST('RequestType/list', {
              searchText: [],
              pageSize: this.pageLength,
              pageNumber: this.pageIndex,
              isPrint: false,
              filter: {},
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
                  return {
                    id: el['id'],
                    name: el['title'],
                    description: el['description'],
                    group: el['group'],
                    ticketType: el['ticketType'],
                    initials: this.initials(el['team']),
                    team: el['team'],
                    isVisable: el['isVisable'],
                  };
                });
                this.getRedMenuCharacters(this.usersName);

                this.dataSource = new MatTableDataSource(
                  this.UserViewInfoObject
                );
                this.setDataSourceAttributes();
              } else {
                this.dataLoaded = false;

                this.showSpinner = false;
              }
            });
        }
      } else {
        if (this.filterPreservingData != null) {
          this.http
            .POST('RequestType/list', {
              searchText: [],
              pageSize: this.pageLength,
              pageNumber: this.pageIndex,
              isPrint: false,
              filter: {
                team: this.filterPreservingData.team.value,
                groupID: this.filterPreservingData.group.value,
                severity: this.filterPreservingData.severity.value,
                ticketType: this.filterPreservingData.ticketType.value,
                priority: this.filterPreservingData.priority.value,
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
                  return {
                    id: el['id'],
                    name: el['title'],
                    description: el['description'],
                    group: el['group'],
                    ticketType: el['ticketType'],
                    initials: this.initials(el['team']),
                    team: el['team'],
                    isVisable: el['isVisable'],
                  };
                });
                this.getRedMenuCharacters(this.usersName);

                this.dataSource = new MatTableDataSource(
                  this.UserViewInfoObject
                );
                this.setDataSourceAttributes();
              } else {
                this.dataLoaded = false;
                this.empty = true;
                this.showSpinner = false;
              }
            });
        } else {
          this.http
            .POST('RequestType/list', {
              searchText: [],
              pageSize: this.pageLength,
              pageNumber: this.pageIndex,
              isPrint: false,
              filter: {},
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
                  return {
                    id: el['id'],
                    name: el['title'],
                    description: el['description'],
                    group: el['group'],
                    ticketType: el['ticketType'],
                    initials: this.initials(el['team']),
                    team: el['team'],
                    isVisable: el['isVisable'],
                  };
                });
                this.getRedMenuCharacters(this.usersName);

                this.dataSource = new MatTableDataSource(
                  this.UserViewInfoObject
                );
                this.setDataSourceAttributes();
              } else {
                this.dataLoaded = false;

                this.showSpinner = false;
              }
            });
        }
      }
    });
  }


  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
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

    let initials =
      name != undefined ? [...name.matchAll(rgx)] || [] : ['NOT Available'];

    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }
  filterPreservingData: any = null;
  openFilterModal() {
    const dialogRef = this.dialog.open(FiltersPopupComponent, {
      position: { top: '15%', left: '17%' },
      data: { filterData: this.filterPreservingData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.filterPreservingData = result;
    });
  }
  searchByName($event) {
    this.pageLength = 5;
    this.pageSize = 5;
    this.pageIndex = 0;
    this.http
      .POST('RequestType/list', {
        searchText: [$event.target.value],
        pageSize: this.pageLength,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {
          searchText: $event.target.value,
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
            return {
              id: el['id'],
              name: el['title'],
              description: el['description'],
              group: el['group'],
              ticketType: el['ticketType'],
              initials: this.initials(el['team']),
              team: el['team'],
              isVisable: el['isVisable'],
            };
          });
          this.getRedMenuCharacters(this.usersName);

          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
          this.setDataSourceAttributes();
        } else {
          this.dataLoaded = false;

          this.showSpinner = false;
        }
      });
  }

  durationInSeconds: any = 3;
  setVisability(settingID, Value: Boolean) {
    if (Value == true) {
      const dialogRef = this.dialog.open(SetVisibleConfirmationComponent, {
        data: { value: Value, id: settingID, from: 0 },
        width: '50vw',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      const dialogRef = this.dialog.open(SetInvisibleConfirmationComponent, {
        data: { value: Value, id: settingID, from: 0 },
        width: '50vw',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  OpenEdit(settingID) {
    const dialogRef = this.dialog.open(AddSettingsComponent, {
      data: { updateValue: settingID },
      width: '35%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddSettings() {
    const dialogRef = this.dialog.open(AddSettingsComponent, {
      width: '35%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
