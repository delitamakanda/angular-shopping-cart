import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import {map, Observable} from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';


interface DialogData {
  message: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(Dialog);

  alertConfirm(data: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message, title },
      disableClose: true,
      width: '400px',
    });

    return dialogRef.closed.pipe(
      map((result) => !!result),
    );

  }

}
