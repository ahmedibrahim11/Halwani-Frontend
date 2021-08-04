import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { ToastMessageComponent } from 'src/app/ITPersonal/toast-message/toast-message.component';
import { CreateProductCategoryComponent } from './create-product-category/create-product-category.component';
import { ProductCategoryListingDTO } from 'src/app/core/DTOs/productCategoryListing';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SelectionModel } from '@angular/cdk/collections';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-product-category-settings',
  templateUrl: './product-category-settings.component.html',
  styleUrls: ['./product-category-settings.component.css'],
})
export class ProductCategorySettingsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public flag: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subscriptionName: Subscription;
  dataLoaded: boolean = false;
  empty: boolean = true;
  productCategory: FormGroup = new FormGroup({ name: new FormControl() });

  constructor(
    private http: HTTPMainServiceService,
    public dialog: MatDialog,
    private service: TicketCreationService,
    private _snackBar: MatSnackBar,
    private common: CommonServiceService,
    private spinner: SpinnerFlagService,
    private formBuilder: FormBuilder
  ) {
    this.subscriptionName = this.common.getUpdate().subscribe((data) => {
      this.UserViewInfoObject = data.map((el) => {
        debugger;
        return {
          id: el['id'],
          name: el['text'],
          children: el['children'],
          isVisible: el['isVisible']
        };
      });
      console.log(this.UserViewInfoObject)
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
        .POST('Category/List', {
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
              name: el['text'],
              children: el['children'],
              isVisible: el['isVisible']
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    }
    if (event.pageIndex > this.pageIndex) {
      // Clicked on next button
      this.http
        .POST('Category/List', {
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
              name: el['text'],
              children: el['children'],
              isVisible: el['isVisible']
            };
          });
          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
        });
    } else {
      // Clicked on previous button
      this.http
        .POST('Category/List', {
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
              name: el['text'],
              children: el['children'],
              isVisible: el['isVisible']
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
      case 'children':
        sortValue = 1;
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
      .POST('Category/List', {
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
            name: el['text'],
            children: el['children'],
            isVisible: el['isVisible']
          };
        });
        console.log(this.UserViewInfoObject);
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      });
  }

  displayedColumns: string[] = ['select', 'name', 'children', 'Actions'];
  //check boxes part
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<ProductCategoryListingDTO>(
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

  UserViewInfoObject: ProductCategoryListingDTO[] =
    new Array<ProductCategoryListingDTO>();

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
        .POST('Category/List', {
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
              name: el['text'],
              children: el['children'],
              isVisible: el['isVisible']
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
      .POST('Category/List', {
        searchText: [event.option.value],
        pageSize: 5,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {},
        sortValue: 0,
      })
      .subscribe((res) => {
        console.log('search rsut', res);
        let usersData = res.pageData;
        this.UserViewInfoObject = usersData.map((el) => {
          const cerationDate = new Date(el['creationDate']);
          return {
            id: el['id'],
            name: el['text'],
            children: el['children'],
            isVisible: el['isVisible']
          };
        });
        this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
      });
  }

  displayCo(ticket?: any): string | undefined {
    return ticket ? ticket : undefined;
  }
  ngOnInit(): void {
    this.http
      .POST('Category/List', {
        searchText: [],
        pageSize: 10000,
        pageNumber: this.pageIndex,
        isPrint: true,
        filter: {},
        sortValue: 0,
      })
      .subscribe((res) => {
        res.pageData.map((d) => {
          this.ticketsNO.push(d['text']);
        });
        console.log(this.ticketsNO);
      });
    this.filteredTickets = this.productCategory
      .get('name')
      .valueChanges.pipe(
        tap((val) =>
          console.log('inside valueChanges Observable, val is: ', val)
        ),
        debounceTime(200)
      )
      .pipe(mergeMap((val) => this.filter(val)));

    this.spinner.setSpinnerValue(this.showSpinner);
    this.service.getValue().subscribe((value) => {
      this.flag = value;
      if (this.flag === true) {
        this.pageLength = this.pageLength + 1;
        this.http
          .POST('Category/List', {
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
                  name: el['text'],
                  children: el['children'],
                  isVisible: el['isVisible']
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
          .POST('Category/List', {
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
                  name: el['text'],
                  children: el['children'],
                  isVisible: el['isVisible']
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
    });
  }

  firstCharacter: any;
  search() {}
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

  searchByName($event) {
    this.pageLength = 5;
    this.pageSize = 5;
    this.pageIndex = 0;
    console.log('search', $event.target.value);
    this.http
      .POST('Category/List', {
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
              name: el['text'],
              children: el['children'],
              isVisible: el['isVisible']
            };
          });
          this.getRedMenuCharacters(this.usersName);

          this.dataSource = new MatTableDataSource(this.UserViewInfoObject);
          this.setDataSourceAttributes();
        } else {
          this.dataLoaded = false;

          this.showSpinner = false;
          this.dataSource = new MatTableDataSource();
          this.setDataSourceAttributes();
        }
      });
  }

  durationInSeconds: any = 3;
  setVisability(settingID, Value: Boolean) {
    this.http
      .GET(`Category/UpdateVisiblity?id=${settingID}&isVisible=${Value}`)
      .subscribe((data) => {
        this._snackBar.openFromComponent(ToastMessageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.service.setValue(true);
      });
  }
  OpenEdit(settingID) {
    const dialogRef = this.dialog.open(CreateProductCategoryComponent, {
      data: { updateValue: settingID },
      width: '40vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

  openAddProductCategory() {
    const dialogRef = this.dialog.open(CreateProductCategoryComponent, {
      width: '40vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
