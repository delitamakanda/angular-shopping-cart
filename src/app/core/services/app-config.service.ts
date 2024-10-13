import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor(@Inject('env') private env: string) {
    // Load configuration based on provided environment
    if (this.env === 'prod') {
      this.loadProdConfig();
    } else {
      this.loadDevConfig();
    }
  }

  private loadProdConfig() {
    // Load production configuration
  }

  private loadDevConfig() {
    // Load development configuration
  }
}
