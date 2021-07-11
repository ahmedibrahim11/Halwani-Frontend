import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { createTicketDTO } from '../../core/DTOs/createTicketDTO';
import { Editor } from 'ngx-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HTTPMainServiceService } from 'src/app/core/services/httpmain-service.service';
import { getTicketDTO } from 'src/app/core/DTOs/getTicketDTO';

import { StatusEnum } from 'src/app/core/DTOs/ticketListingDTO';

enum tikcetStatus {
  Created,
  Assigned,
  WaitingResponse,
  WaitingSupport,
  InProgress,
  Esclated,
  Reopened,
  Resolved,
  OverDue,
}

@Component({
  selector: 'app-ticket-details-main',
  templateUrl: './ticket-details-main.component.html',
  styleUrls: ['./ticket-details-main.component.css'],
})
export class TicketDetailsMainComponent implements OnInit, OnDestroy {
  @Input() returnTo;
  @Output() userMessage: getTicketDTO;
  isDataLoaded = false;
  messageList: { message: any; sender: any }[] = [];
  currentUser;
  creatorInitials: string;
  reporterInitials: string;
  editor: Editor;
  html: '';
  ticketID: string;
  newMessag: FormGroup;
  fragment: string;
  status: any;
  ticketStatusList: any;
  selectedColor: string = '';
  currentStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private http: HTTPMainServiceService
  ) {}

  enumSelector(definition) {
    return Object.keys(definition)
      .filter((k) => typeof StatusEnum[k as any] === 'number')
      .map((key) => ({ value: definition[key], title: key }));
  }

  async checkTicketStatusColor(status) {
    switch (status) {
      case 0:
        this.selectedColor = 'darkgreen';
        break;
      case 1:
        this.selectedColor = 'green';
        break;
      case 2:
        this.selectedColor = '#ffd23e';

        break;
      case 3:
        this.selectedColor = 'green';

        break;
      case 4:
        this.selectedColor = '#7b61ff';
        break;
      case 5:
        this.selectedColor = '#ed1c24';
        break;
      case 6:
        this.selectedColor = '#1793e8';
        break;
      case 7:
        this.selectedColor = '#00b668';
        break;
      case 8:
        this.selectedColor = 'darkred';

        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.status = this.enumSelector(StatusEnum);
    this.actRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment;
    });
    if (localStorage.getItem('userData') !== null) {
      this.currentUser = JSON.parse(
        localStorage.getItem('userData')
      ).userProfile.userName;
    }

    this.ticketID = this.actRoute.snapshot.paramMap.get('id');
    this.http
      .POST(`Ticket/getTicket`, { id: this.ticketID })
      .subscribe((data) => {
        const creationDate = new Date(data.submitDate);
        const resolvedDate = new Date(data.resolvedDate);
        console.log(data);
        this.userMessage = {
          ticketNumber: data.ticketNumber,
          ticketName: data.ticketName,
          submitterTeam: data.submitterTeam,
          submitterEmail: data.submitterEmail,
          submitterName: data.submitterName,
          serviceName: data.serviceName,
          reportedSource: data.reportedSource,
          priority: data.priority,
          source: data.source,
          ticketType: data.requestType.id,
          ticketTypeName: data.requestType.name,
          ticketTypeIcon: data.requestType.icon,
          ticketSeverity: data.ticketSeverity,
          ticketStatus: data.ticketStatus,
          description: data.description,
          submitDate: creationDate.toLocaleDateString(),
          resolvedDate: resolvedDate.toLocaleDateString(),
          id: data.id,
          attachement: data.attachement,
          productCategoryName1: data.productCategoryName1,
          productCategoryName2: data.productCategoryName2,
          lastModifiedDate: data.lastModifiedDate,
          submitterInitials: this.initials(data.submitterName).toString(),
          ReporterInitials: data.submitterName.toString(),
          currentUserInitials: this.initials(this.currentUser).toString(),
          assignedTo:
            data.assignedUser !== null ? data.assignedUser.toString() : 'N A',
        };
        this.isDataLoaded = true;

        this.checkTicketStatusColor(this.userMessage.ticketStatus);
        this.currentStatus = this.status.find(
          (s) => s.value === this.userMessage.ticketStatus
        ).title;
        debugger;
      });
    this.http
      .POST(`TicketMessage/getMessages`, { id: this.ticketID })
      .subscribe((data) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.messageList.push({
            message: element.messageText,
            sender: element.submitter,
          });
        }
      });

    this.editor = new Editor();
    this.newMessag = this.formBuilder.group({
      message: ['', [Validators.required]],
      submitter: [this.currentUser, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  async changeStatus(status: any) {
    await this.http
      .POST(`Ticket/UpdateStatus`, {
        ticketId: parseInt(this.ticketID),
        status: status,
        resolveText: '',
      })
      .subscribe((data) => {
        this.currentStatus = this.status.find((s) => s.value === status).title;
        this.checkTicketStatusColor(status);
      });
  }
  initials(name) {
    console.log(name);
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...name.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials;
  }

  submit() {
    this.http
      .POST(`TicketMessage/create`, {
        ticketID: Number.parseInt(this.ticketID),
        messageText: this.newMessag.value.message,
        submitter: this.newMessag.value.submitter,
      })
      .subscribe((data) => {
        this.messageList.push({
          message: this.newMessag.value.message,
          sender: this.newMessag.value.submitter,
        });
        this.newMessag.setValue({ message: '', submitter: this.currentUser });
      });
  }
  fromManager() {
    return window.location.href.includes('/itmanager');
  }
}
