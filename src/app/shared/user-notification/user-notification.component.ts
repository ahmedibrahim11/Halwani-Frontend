import { Component, OnInit } from '@angular/core';
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
  badgeContent: number;

  openFlag: boolean = false;
  showSpinner: boolean = true;

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
        context.badgeContent = data.unSeenNotificationsCount;

        data.pageData.map((item) => {
          context.notifications.push({
            text: item['text'],
            date: new Date(item['date']).toDateString(),
            id: item['objectId'],
          });
        });
        context.showSpinner = false;
      });
  }

  getNotifications() {
    if (this.openFlag) {
      return null;
    }
    this.openFlag = true;
    this.http
      .POST('Notification/List', {
        searchText: [''],
        pageSize: 10,
        pageNumber: 0,
        sortDirection: 0,
        isPrint: true,
      })
      .subscribe((data) => {
        console.log('notify', data);
        this.badgeContent = data.unSeenNotificationsCount;

        data.pageData.map((item) => {
          this.notifications.push({
            text: item['text'],
            date: new Date(item['date']).toDateString(),
            id: item['objectId'],
          });
        });
        this.showSpinner = false;
      });
  }

  openTicketDetails(ticketID: any) {
    this.router.navigate(['/itmanager/details/' + ticketID]);
  }
  ngOnInit(): void {}
}
