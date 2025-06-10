// todo extends this helper class in your component to unsubscribe from subscriptions automatically

import {Injectable, OnDestroy} from "@angular/core";
import {MonoTypeOperatorFunction, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonObservableDestruction implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil<T>(this.destroy$);
  }

  ngOnDestroy() : void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
