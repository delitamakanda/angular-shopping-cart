import {Component, inject, signal} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MatButton} from "@angular/material/button";

interface DialogData {
  message: string;
  title: string;
}

@Component({
  selector: 'app-dialog',
  imports: [
    MatButton
  ],
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private readonly dialogRef = inject(DialogRef);
  readonly data = signal(inject(DIALOG_DATA) as DialogData);


  confirm(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
