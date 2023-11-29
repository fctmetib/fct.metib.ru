import { Component, Input, OnInit } from '@angular/core';
import {Message} from 'primeng/api';

@Component({
  selector: 'metib-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.components.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: string;

  errorMessages: Message[];

  ngOnInit(): void {
    this.errorMessages = [
      { severity: 'error', detail: this.backendErrorsProps },
    ];
  }
}
