import { Data } from '@angular/router';

export class Task {
    _id: string;
    _listId: string;
    title: string;
    date:Date;
    completed: boolean;
    deadline:Date;
    creator:string;
    responsible:string;
    description:string;
    file:File;
  filename: string;
}