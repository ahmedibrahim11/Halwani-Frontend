import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { IHttpConnectionOptions } from '@aspnet/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {}

  public startConnection = () => {
    const options: IHttpConnectionOptions = {
      accessTokenFactory() {
        return `${JSON.parse(localStorage.getItem('userData')).token}`;
      },
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR, {
        transport:
          signalR.HttpTransportType.WebSockets ||
          signalR.HttpTransportType.LongPolling,
        accessTokenFactory: () =>
          `${JSON.parse(localStorage.getItem('userData')).token}`,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        debugger;
        console.log('Connection started ...');
      })
      .catch((err) =>
        console.log('Error while starting connection ... ' + err)
      );
  };

  changeNotificationCount = (context, handleFunc) => {
    this.hubConnection.on('changeNotificationCount', () => {
      debugger;
      handleFunc(context);
    });
  };
}
