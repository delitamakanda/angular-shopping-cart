import { ApplicationConfig, inject, LOCALE_ID, InjectionToken } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter } from '@angular/router';
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { AppConfigService } from "./core/services/app-config.service";
import { LoggerService, RemoteLoggerService } from "./core/services/logger.service";
import { API_URL, APP_ENVIRONMENT } from "./constants";
import { provideHttpClient } from "@angular/common/http";

registerLocaleData(localeFr);


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: LoggerService, useClass: RemoteLoggerService  },
        { provide: API_URL, useValue: 'https://merchstoreapi.applikuapp.com/api' },
        { provide: APP_ENVIRONMENT, useValue: 'development' }, // Assuming 'development' as the default environment
        { provide: AppConfigService, useFactory: ()=> {
            const env = inject(APP_ENVIRONMENT);
            return env === 'production'? new AppConfigService('prodConfig') : new AppConfigService('devConfig');
        }},
        provideHttpClient()
    ],
}