import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogMegs {
  message: string;
}

@Component({
  selector: 'app-dialog-message-yesno',
  templateUrl: './dialog-message-yesno.component.html',
  styleUrls: ['./dialog-message-yesno.component.css']
})
export class DialogMessageYesnoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMessageYesnoComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: DialogMegs) { }

  ngOnInit() {
  }
  onOk(): void {
    this.dialogRef.close(); 
  }
}
