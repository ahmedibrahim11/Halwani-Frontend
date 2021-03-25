import { Component, Input, OnInit } from '@angular/core';
import { toHTML } from 'ngx-editor';
@Component({
  selector: 'app-added-message',
  templateUrl: './added-message.component.html',
  styleUrls: ['./added-message.component.css'],
})
export class AddedMessageComponent implements OnInit {
  @Input() userMessage: { message: any; sender: any };
  creatorInitials: string;
  constructor() {}

  ngOnInit(): void {
    this.creatorInitials = this.initials(this.userMessage.sender).toString();
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
