import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";

interface DialogData {
  message: string;
  title: string;
}

@Component({
  selector: 'app-dialog',
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogActions
  ],
  standalone: true,
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
