import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  order3: string = 'task.date';
  order2: string = 'task.title';
  order: string = 'list.title';
  reverse: boolean = false;
  reverse2: boolean = false;
  flag: boolean=false;
  Mydate=Date.now();
  
  lists: List[];
  tasks: Task[];
  selectedListId: string;
  configname = {
    id: 'customname',
    itemsPerPage: 5,
    currentPage: 1,
  };
  config = {
    id: 'customtask',
    itemsPerPage: 5,
    currentPage: 1,
  };
 
  public maxSize: number = 4;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  sortedCollection: any[];
  sortedCollection1: any[];
  sortedCollection2: any[];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router ,private orderPipe: OrderPipe) { 
    setInterval(() => {this.Mydate = Date.now()}, 1);
    this.tasks= orderPipe.transform(this.tasks, 'title');
    this.tasks= orderPipe.transform(this.tasks, 'date');
    this.lists= orderPipe.transform(this.lists, 'title');
   
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
      this.order = value;
    

  }
  setOrder2(value: string)
  {
    if(this.order2===value){
      this.reverse2 = !this.reverse2;
    }
    this.order2 = value;
  }
  setOrder3(value: string)
  {
    if(this.order3===value){
      this.reverse2 = !this.reverse2;
    }
    this.order3 = value;
  }
 
  onPageChanged(event){
    this.config.currentPage = event;
    
  }
  onPageChanged2(event){
    this.configname.currentPage = event;
    
  }
 

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )
    this.config = {
      id: 'custom',
      itemsPerPage: 5,
      currentPage: 1
     
    };
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
    
  }

  
  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
