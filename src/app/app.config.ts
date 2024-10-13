import { ApplicationConfig, LOCALE_ID } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter } from '@angular/router';
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        {
            provide: LOCALE_ID, useValue: 'fr'
        }
    ],
}