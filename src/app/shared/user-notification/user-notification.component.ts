import { Component, OnInit, HostListener } from '@angular/core';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { SignalRService } from 'src/app/core/services/signal-r.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.css'],
})
export class UserNotificationComponent implements OnInit {
  constructor(
    private http: HTTPMainServiceService,
    private router: Router,
    private signalRService: SignalRService
  ) {
    this.signalRService.startConnection();
    this.signalRService.changeNotificationCount(this, this.updateNotification);
  }
  notifications: any = [];
  //unSeenNotifications: any = [];
  badgeContent: number;

  openFlag: boolean = false;
  showSpinner: boolean = true;

  //signalR
  updateNotification(context) {
    context.http
      .POST('Notification/List', {
        searchText: [''],
        pageSize: 10,
        pageNumber: 0,
        sortDirection: 0,
        isPrint: true,
      })
      .subscribe((data) => {
        console.log('notify', data);
        //context.badgeContent = data.unSeenNotificationsCount;

        data.pageData.map((item) => {
          context.notifications.push({
            text: item['text'],
            date: new Date(item['date']).toDateString(),
            id: item['objectId'],
            seen: item['isSeen'],
          });
        });
        context.showSpinner = false;
      });
  }

  menuOpened() {
    this.notifications = this.notifications.slice(0, 5);
  }
  pageNumber: number = 0;
  getNotifications() {
    if (this.openFlag) {
      return null;
    }
    this.openFlag = true;
    let diffTime: any;
    let diffDays: any;
    this.http
      .POST('Notification/List', {
        searchText: [''],
        pageSize: 5,
        pageNumber: this.pageNumber,
        sortDirection: 0,
        isPrint: true,
      })
      .subscribe((data) => {
        console.log('notify', data);
        //this.badgeContent = data.unSeenNotificationsCount;
        data.pageData.map((item) => {
          diffTime = Math.abs(
            new Date().getTime() - new Date(item['date']).getTime()
          );
          console.log('erre', diffTime);
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          this.notifications.push({
            text: item['text'],
            date: new Date(item['date']).toDateString(),
            dateDiff: diffDays - 1,
            id: item['objectId'],
            seen: item['isSeen'],
          });
        });
        // this.unSeenNotifications = this.notifications.slice(
        //   0,
        //   this.badgeContent
        // );
        this.notifications = this.notifications.slice(this.badgeContent);
        this.showSpinner = false;
      });
  }

  openTicketDetails(ticketID: any) {
    this.router.navigate(['/itmanager/details/' + ticketID]);
  }

  //showMoreNotificationsOnIconClick
  loadMoreNotifications(e: any) {
    e.stopPropagation();
    let diffTime: any;
    let diffDays: any;
    this.http
      .POST('Notification/List', {
        searchText: [''],
        pageSize: 5,
        pageNumber: this.pageNumber + 1,
        sortDirection: 0,
        isPrint: true,
      })
      .subscribe((data) => {
        console.log('notify', data);
        //this.badgeContent = data.unSeenNotificationsCount;
        this.pageNumber = this.pageNumber + 1;
        data.pageData.map((item) => {
          diffTime = Math.abs(
            new Date().getTime() - new Date(item['date']).getTime()
          );
          console.log('erre', diffTime);
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          this.notifications.push({
            text: item['text'],
            date: new Date(item['date']).toDateString(),
            dateDiff: diffDays - 1,
            id: item['objectId'],
            seen: item['isSeen'],
          });
        });
      });
  }

  ngOnInit(): void {
    //window.addEventListener('scroll', this.scroll, true); //third parameter
    this.getNotifications();
  }
  // oldScrollTopNumber: number = 0;
  // scroll = (event: any): void => {
  //   let scrollTopNumber = event.srcElement.scrollTop;
  //   if (scrollTopNumber > this.oldScrollTopNumber) {
  //     console.log('t7t');
  //     this.http
  //       .POST('Notification/List', {
  //         searchText: [''],
  //         pageSize: 5,
  //         pageNumber: this.pageNumber + 1,
  //         sortDirection: 0,
  //         isPrint: true,
  //       })
  //       .subscribe((data) => {
  //         console.log('notify', data);
  //         this.badgeContent = data.unSeenNotificationsCount;
  //         data.pageData.map((item) => {
  //           this.notifications.push({
  //             text: item['text'],
  //             date: new Date(item['date']).toDateString(),
  //             id: item['objectId'],
  //           });
  //         });
  //       });
  //     this.oldScrollTopNumber = scrollTopNumber;
  //   } else {
  //     console.log('fo2');
  //     this.oldScrollTopNumber = scrollTopNumber;
  //   }

  // console.log(event);
  // console.log('I am scrolling ' + scrollTopNumber);
  //  };
}
