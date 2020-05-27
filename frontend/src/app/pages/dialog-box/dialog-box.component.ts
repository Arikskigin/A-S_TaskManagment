import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})

export class DialogBoxComponent {
  lists: List[];
  tasks: Task;
  fileContent: string | ArrayBuffer;

  constructor(private dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
      this.tasks=data;
      
  }
  downloadFile(data: string | ArrayBuffer) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  downloadFileFromDb() {
    if(this.tasks.file==null || this.tasks.file==undefined )
    {
      alert('File Not Available')
    }
    else{
    const blob = new Blob([this.tasks.file], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = this.tasks.filename;
    anchor.href = url;
    anchor.click(); 
    }
  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);
  }
 
  doAction(){
   
    }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 
  

}