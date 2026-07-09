import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>('API_URL');
export const APP_ENVIRONMENT = new InjectionToken<string>('APP_ENVIRONMENT');

export const SUPPORTED_LOCALES = ['fr', 'en', 'ko'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'fr';
