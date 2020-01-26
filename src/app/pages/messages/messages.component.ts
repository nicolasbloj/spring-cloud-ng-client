import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../../_model/message.model';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-component-messages',
  providers: [MessagesService],
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  messages: Observable<Message[]>;

  constructor(private messagesService: MessagesService) {
    this.messages = this.messagesService.getMessagesStream();
  }

}
