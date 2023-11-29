import { Component, Input, OnInit } from '@angular/core';
import {Message} from 'primeng/api';

@Component({
  selector: 'metib-success-messages',
  templateUrl: './successMessages.component.html',
  styleUrls: ['./successMessages.components.scss'],
})
export class SuccessMessagesComponent implements OnInit {
  @Input('message') props: string;

  messages: Message[];

  ngOnInit(): void {
    this.messages = [
      { severity: 'success', detail: this.props },
    ];
  }
}
