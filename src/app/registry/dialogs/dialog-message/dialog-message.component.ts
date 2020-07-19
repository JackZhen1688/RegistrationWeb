import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogMegs {
  message: string;
}

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMessageComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: DialogMegs) { }

  ngOnInit() {
  }
  
  onOk(): void {
    this.dialogRef.close();
  }
}
