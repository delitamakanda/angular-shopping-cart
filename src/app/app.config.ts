import {
  ApplicationConfig,
  inject,
  LOCALE_ID,
  isDevMode,
  importProvidersFrom,
  provideAppInitializer
} from "@angular/core";
import { routes } from "./app.routes";
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy, TitleStrategy,
  withInMemoryScrolling,
  withPreloading
} from '@angular/router';
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { AppConfigService } from "./core/services/app-config.service";
import { LoggerService, RemoteLoggerService } from "./core/services/logger.service";
import { API_URL, APP_ENVIRONMENT } from "./constants";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {CustomRouteReuseStrategy} from "./custom-route-reuse-strategy";
import { provideServiceWorker } from '@angular/service-worker';
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {CustomTitleStrategy} from "./title.strategy";
import { OverlayModule } from '@angular/cdk/overlay';
import {LoaderService} from "./core/services/loader.service";

registerLocaleData(localeFr);


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
          routes,
          withPreloading(PreloadAllModules),
          withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),),
      importProvidersFrom(OverlayModule),
      provideAppInitializer(() => {
        const loaderService = inject(LoaderService);
        loaderService.initializeLoader();
      }),
      { provide: TitleStrategy, useClass: CustomTitleStrategy },
      {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: LoggerService, useClass: RemoteLoggerService  },
        { provide: API_URL, useValue: 'https://merchstoreapi.applikuapp.com/api' },
        { provide: APP_ENVIRONMENT, useValue: 'development' }, // Assuming 'development' as the default environment
        { provide: AppConfigService, useFactory: ()=> {
            const env = inject(APP_ENVIRONMENT);
            return env === 'production'? new AppConfigService('prodConfig') : new AppConfigService('devConfig');
        }},
        provideHttpClient(
          withInterceptors([authInterceptor])
        ), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    ],
}
