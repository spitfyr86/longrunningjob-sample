import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from '../../_shared/services/security/security.service';
import { MessageService } from './message.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { concatMap, mapTo, scan, take } from 'rxjs/operators';


@Component({
  selector: 'app-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {

  authenticated = false;
  messageForm: any;
  message = "";
  messageId = 0;
  isProcessing = false;

  encodedMsg: string = "";
  encodedMessage$: Observable<string>;
  private textUpdateSubject: Subject<string> = new Subject<string>();
  private encodedMsgSubscription: Subscription;

  private hubConnection!: HubConnection;

  constructor(private formbulider: FormBuilder,
    private ngZone: NgZone,
    private messageService: MessageService,
    private router: Router,
    private securityService: SecurityService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this.encodedMsgSubscription) {
      this.encodedMsgSubscription.unsubscribe();
    }
    this.hubConnection.stop();
  }

  ngOnInit() {
    this.isProcessing = false;
    this.encodedMsg = "";
    this.authenticated = this.securityService.isAuthenticated();

    this.messageForm = this.formbulider.group({
      messageText: ['', [Validators.required]]
    });

    this.hubConnection = this.messageService.getHubConnection();

    this.hubConnection.on('SendEncodedMessageAsync', (msg: any) => {
      this.textUpdateSubject.next(msg);
    });

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error connecting to server: ' + JSON.stringify(err)));

    this.encodedMsgSubscription = this.getTextUpdates()
      .pipe(
        concatMap((msg: string) =>
          interval(500).pipe(
            take(msg.length),
            mapTo(msg),
            scan((acc, curr) => acc + curr),
          )))
      .subscribe((result: string) => {
        this.encodedMsg += result;
        this.watchChanges();
      });
  }

  private getTextUpdates(): Observable<string> {
    return this.textUpdateSubject.asObservable();
  }

  private watchChanges() {
    this.cdr.detectChanges();
  }

  ConvertMessage() {
    const message_Master = this.messageForm.value;
    this.isProcessing = true;
    this.encodedMsg = "";

    this.messageService.encodeText(message_Master)
      .subscribe(() => {}
        ,err => console.log('Error canceling process: ' + JSON.stringify(err))
        ,() => {
          this.messageForm.reset();
          this.isProcessing = false;
        });
  }

  Clear() {
    this.messageForm.reset();
    this.isProcessing = false;
    this.encodedMsg = "";

    this.watchChanges();
  }
  
  Cancel() {
    this.messageService.cancel()
      .subscribe(() => {
        this.Clear();
      }, err => {
        if (err.status && err.status == 200) {
          this.Clear();
        } else {
          console.log('Error canceling process: ' + JSON.stringify(err))
        }
      }, () => {
        this.Clear();
      });
  }

  LogOut = () => {
    this.ngZone.run(() => this.router.navigateByUrl('/logout'));
  }

}