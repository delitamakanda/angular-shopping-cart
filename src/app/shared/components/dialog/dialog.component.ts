import {Component, inject, signal} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

interface DialogData {
  message: string;
  title: string;
}

@Component({
  selector: 'app-dialog',
  imports: [],
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private dialogRef = inject(DialogRef<boolean>);
  data = signal(inject(DIALOG_DATA) as DialogData);


  confirm(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
