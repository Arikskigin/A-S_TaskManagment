import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { OrderPipe } from 'ngx-order-pipe';
import { AuthService } from 'src/app/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DialogBoxFileComponent } from '../dialog-box-file/dialog-box-file.component';
import { SharedService } from '../_helpers/shared-service';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  usernameshow;
  username;
  order: string = 'list.title';
  reverse: boolean = false;
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
  message: string;
  deletedflag: boolean;
  premetion: any;
  usernameshowforupdate: string;
  indexoftasks=0;
  numoftasks=0;
  usernameshowfordelete: string;
  

  constructor(public dialog: MatDialog,private taskService: TaskService,private authService: AuthService, private route: ActivatedRoute, private router: Router ,private orderPipe: OrderPipe,private sharedService:SharedService) {
     
    setInterval(() => {this.Mydate = Date.now()}, 1);
    this.tasks= orderPipe.transform(this.tasks, 'title');
    this.tasks= orderPipe.transform(this.tasks, 'date');
    this.tasks= orderPipe.transform(this.tasks, 'deadline');
    this.lists= orderPipe.transform(this.lists, 'title');
  }

 
  //object is task
  openDialog(object) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:object,
    });
 
    dialogRef.afterClosed().subscribe(result => {
      
      }
    );
  }
  openDialogfile(object) {
    const dialogRef = this.dialog.open(DialogBoxFileComponent, {
      width: '250px',
      data:object,
    });
 
    dialogRef.afterClosed().subscribe(result => {
      
      }
    );
  }
  
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
      this.order = value;
    

  }
 
  onPageChanged(event){
    this.config.currentPage = event;
    
  }
  onPageChanged2(event){
    this.configname.currentPage = event;
    
  }
  canUpdateTask(data:any)
  {
    
    this.usernameshowforupdate=this.authService.getUserEmail();
    
    
      
      if(data.creator == (this.usernameshowforupdate )|| (this.usernameshowforupdate == "arik30000@gmail.com") )
      {
        return true; 
      }
      
      return false;
     
    }
   
    canDelete(data:any) 
    {
      this.usernameshowfordelete=this.authService.getUserEmail();
    if(this.usernameshowfordelete === "arik30000@gmail.com" )
      {
        return true; 
      }
      
      return false;
    
    } 
  getUser(data:Task){
   
    return false;
   
  }
    
   canEdit(task:Task,selectedListId:string){

     this.sharedService.sendData(task);
     this.router.navigate(['/lists', selectedListId, 'edit-task', task._id]);
   }
  
  
  getUsername(){
    this.usernameshow=this.authService.getUserEmail();
    this.username= this.usernameshow.substring(0, this.usernameshow.indexOf("@"));
    this.username= this.username.charAt(0).toUpperCase() + this.usernameshow.substring(1, this.usernameshow.indexOf("@"));
    return this.username
    
  }
  getUserNamePremetion(){
    this.premetion=this.usernameshow=this.authService.getUserEmail();
    if(this.premetion == "arik30000@gmail.com" )
      {
        return this.getUsername() +":Admin"
      }
    else{
      return this.getUsername() +":Employee"
    }  
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          
            this.tasks=tasks
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


  

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      alert("Admin approved:Task has been deleted");
     this.deletedflag = true;
    })
    
  }
  onlogoutclick(){
    this.authService.logout()
    alert("You have logged out");
    
  }
 

}
