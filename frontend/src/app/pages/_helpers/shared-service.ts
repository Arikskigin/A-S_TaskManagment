import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})

export class SharedService{
  data : Task;
  constructor(){
    this.data = new Task();
  }

  sendData(data : Task){
    this.data=data;
  }

  getData(){
    return this.data;
  }
}