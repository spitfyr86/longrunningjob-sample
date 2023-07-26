import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Configuration } from '../models/configuration.model';

import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigurationService {
    serverSettings: Configuration;
    constructor() {
        this.serverSettings = {
            apiUrl: (<any>environment).API_URL,
            identityUrl: (<any>environment).IDENTITY_URL,
            apiVersion: (<any>environment).API_VERSION,
        };
        
        this.serverSettings.identityUrl = environment.API_URL;
    }
}
