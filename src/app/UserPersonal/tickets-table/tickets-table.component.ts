import { SelectionModel } from '@angular/cdk/collections';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SevirityEnum, TicketCategoryEnum, TicketListingDTO } from 'src/app/core/DTOs/ticketListingDTO';
import { CommonServiceService } from 'src/app/core/services/common-service.service';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SharingdataService } from 'src/app/core/services/sharingdata.service';
import { SpinnerFlagService } from 'src/app/core/services/spinner-flag.service';
import { TicketCreationService } from 'src/app/core/services/ticket-creation.service';
import { EscalateTicketComponent } from 'src/app/ITPersonal/escalate-ticket/escalate-ticket.component';
import { FiltermodalComponent } from 'src/app/ITPersonal/filtermodal/filtermodal.component';
import { ResolveTicketComponent } from 'src/app/ITPersonal/resolve-ticket/resolve-ticket.component';
import { TicketOptionsComponent } from 'src/app/ITPersonal/ticket-options/ticket-options.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CancelTicketComponent } from 'src/app/ITManager/cancel-ticket/cancel-ticket.component';
import { CreateTicketPopupComponent } from 'src/app/ITPersonal/create-ticket-popup/create-ticket-popup.component';
import { CreatTicketPopupComponent } from '../creat-ticket-popup/creat-ticket-popup.component';
@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css']
})
export class TicketsTableComponent implements OnInit {
@ViewChild(MatSort) sort: MatSort;
  public flag: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tabData: number = undefined;
  @Input() Status: number = undefined;
  @Input() from: number = null;
  private subscriptionName: Subscription;
  dataLoaded: boolean = false;
  empty: boolean = true;
userName:any;
token:any;

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
getTokenPayloads() {
    this.token = localStorage.getItem('userData');
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    this.userName = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ];
        this.email = JSON.parse(jsonPayload)[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ];
     this.team = JSON.parse(jsonPayload)[
      'Teams'
    ];
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
          searchText: '',
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            submitterName:this.userName
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
          searchText: '',
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            submitterName:this.userName
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
          searchText: '',
          pageSize: this.pageSize,
          pageNumber: event.pageIndex,
          isPrint: false,
          filter: {
            submitterName:this.userName
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
    this.pageSize = this.paginator!==undefined?this.paginator.pageSize:5;
    this.pageIndex = this.paginator!==undefined?this.paginator.pageIndex:5;
    this.pageLength = this.paginator!==undefined?this.paginator.length:5;
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
        searchText: '',
        pageSize: this.pageSize,
        pageNumber: this.pageIndex,
        isPrint: false,
        filter: {
        submitterName:this.userName
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
  usersName: any=[] ;
email:any;
team:any;

  ngOnInit(): void {
    this.getTokenPayloads();
    console.log('Tab', this.tabData);
    this.spinner.setSpinnerValue(this.showSpinner);
    this.service.getValue().subscribe((value) => {
      this.flag == value;
      if (this.flag === true) {
        this.pageLength = this.pageLength + 1;
        this.http
          .POST('ticket/list', {
            searchText: '',
            pageSize: this.pageLength,
            pageNumber: this.pageIndex,
            isPrint: false,
            filter: {
              submitterName:this.userName
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
            searchText: '',
            pageSize: this.pageLength,
            pageNumber: this.pageIndex,
            isPrint: false,
            filter: {
             submitterName:this.userName
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

            
              let usersData = res.pageData;
              
              this.UserViewInfoObject = usersData.map((el) => {
                console.log(this.usersName)
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
   cancelTicket(id: any) {
    const dialogRef = this.dialog.open(CancelTicketComponent, {
      position: { top: '15%', left: '22%' },
    });
    this.share.setData(id);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
  editHandler(id: any) {
    let updateStatus = this.share.getData();
    const dialogRef = this.dialog.open(CreatTicketPopupComponent, {
      data: { updateValue: updateStatus },
    });
    this.share.setData(id);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}