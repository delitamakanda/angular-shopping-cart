import { Injectable, inject } from '@angular/core';
import { Overlay, OverlayRef} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Event, NavigationEnd, Router, NavigationCancel, NavigationError, NavigationStart } from "@angular/router";
import { filter } from "rxjs";
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private router = inject(Router);
  private overlayRef: OverlayRef | null = null;
  private overlay = inject(Overlay);

  initializeLoader(): void {
    const endNavigation = (event: Event): boolean => {
      return (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    }
    this.router.events.pipe(
      filter((event) => {
        return event instanceof NavigationStart || endNavigation(event);
      })
    ).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.createOverlay();
        return;
      }
      this.removeOverlay();
    })
  }

  private createOverlay() {
    if (this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position()
        .global()
       .centerHorizontally()
        .centerHorizontally()
    })
    this.overlayRef.attach(new ComponentPortal(LoaderComponent));
  }

  private removeOverlay() {
    if (!this.overlayRef) {
      return;
    }
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;
  }
}
