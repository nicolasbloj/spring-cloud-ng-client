import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../../../_model/message.model';

@Injectable()
export class MessagesService {

  messages: Message[] = [];
  url = 'http://localhost:4444/messages/v0/messages';

  constructor(private zone: NgZone) {
  }

  getMessagesStream(): Observable<Array<Message>> {

    return new Observable(observer => {
      const eventSource = this.newEventSource(this.url);
      eventSource.onmessage = event => {
        observer.next(event.data);
        const message = JSON.parse(event.data);
        this.messages.push(new Message(message.id, message.text));

        this.zone.run(() => observer.next(this.messages));
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error('An error occurred.');
        }
        eventSource.close();
        observer.complete();
      };
      return () => { eventSource.close(); };
    });

  }

  newEventSource(path: string): EventSource {
    return new EventSource(path);
  }

}
