import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class RemoteLoggerService extends LoggerService {
  log(message: string): void {
    // Send log message to remote server
  }
}