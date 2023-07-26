import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../_shared/models/message.model';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = environment.API_URL + '/api/messages/';
  
  constructor(private http: HttpClient) { }

  getMessageList(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url);
  }

  getMessageDetailsById(id: string): Observable<Message> {
    return this.http.get<Message>(this.url + '?id=' + id);
  }
  
  encodeText(messageData: Message): Observable<Message> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Message>(this.url, messageData, httpHeaders);
  }

  cancel(): Observable<Message> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Message>(this.url + 'cancel', httpHeaders);
  }

  getHubConnection(): HubConnection {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    return new HubConnectionBuilder()
      .withUrl(environment.API_URL + '/encodeText')
      .configureLogging(LogLevel.Information)
      .build();
  }
}