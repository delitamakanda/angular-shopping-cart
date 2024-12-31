import { ApplicationConfig, inject, LOCALE_ID } from "@angular/core";
import { routes } from "./app.routes";
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { AppConfigService } from "./core/services/app-config.service";
import { LoggerService, RemoteLoggerService } from "./core/services/logger.service";
import { API_URL, APP_ENVIRONMENT } from "./constants";
import { provideHttpClient } from "@angular/common/http";
import {CustomRouteReuseStrategy} from "./custom-route-reuse-strategy";

registerLocaleData(localeFr);


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withPreloading(PreloadAllModules), withInMemoryScrolling({ scrollPositionRestoration: 'top'  }  )),
      {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: LoggerService, useClass: RemoteLoggerService  },
        { provide: API_URL, useValue: 'https://merchstoreapi.applikuapp.com/api' },
        { provide: APP_ENVIRONMENT, useValue: 'development' }, // Assuming 'development' as the default environment
        { provide: AppConfigService, useFactory: ()=> {
            const env = inject(APP_ENVIRONMENT);
            return env === 'production'? new AppConfigService('prodConfig') : new AppConfigService('devConfig');
        }},
        provideHttpClient(),
    ],
}
