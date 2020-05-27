import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'dialog-box-file',
  templateUrl: './dialog-box-file.component.html',
  styleUrls: ['./dialog-box-file.component.scss']
})

export class DialogBoxFileComponent {
    lists: List[];
    tasks: Task;
    fileContent: string | ArrayBuffer;
  
    constructor(private dialogRef: MatDialogRef<DialogBoxFileComponent>,
      //@Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
        this.tasks=data;
        
        
    }
    closeDialog(){
        this.dialogRef.close({event:'Cancel'});
      }
}