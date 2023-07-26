import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class SupportService {
    private apiUrl;
    private apiVersion;
    private email;

    constructor(private httpClient: HttpClient) {
        this.apiUrl = environment['API_URL'];
        this.apiVersion = environment['API_VERSION'];
        this.email = environment['SUPPORT_EMAIL'];
    }

    getSupportAddress() {
        return this.email;
    }
}
