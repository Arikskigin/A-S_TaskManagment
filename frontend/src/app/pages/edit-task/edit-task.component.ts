import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.model';
import{FormBuilder, FormGroup,Validators} from '@angular/forms'
import { AuthService } from 'src/app/auth.service';
import { SharedService } from '../_helpers/shared-service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  fileContent: string | ArrayBuffer;
  newfile;
  filename;
  namepattern="^[a-zA-Z]+ [a-zA-Z]+$"
 
  submitted = false;
  datenow=Date.now();
  usernameshow: string;
  date = new Date().toISOString().slice(0,10);
  currentyear=Date.now();
  datepattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
  task:Task;
  description : string;
  newdeadline: Date;
  editForm: FormGroup;
  selectedListId: any;

  constructor(private sharedService: SharedService, private authService: AuthService,private route: ActivatedRoute, private taskService: TaskService, private router: Router,private formBuilder:FormBuilder) { 
    this.task=this.sharedService.getData();
    if(this.task.deadline!=undefined){
      this.newdeadline=this.task.deadline
    }
    
  }


  
  ngOnInit() {  
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
        }}) 
    if(this.task.title== undefined)
    this.router.navigate(['/lists', this.selectedListId])
  }

  
  getUsernameStatus(){
    this.usernameshow=this.authService.getUserEmail();
    if(this.usernameshow ==="arik30000@gmail.com")
    {
    return true;
    
    }
    else 
    return false;
    
  }
  onChange(fileList: FileList): void {
    let file = fileList[0];
    this.filename =file.name
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.newfile=fileReader.result;
    }
    fileReader.readAsText(file);

  }
  // convenience getter for easy access to form fields
 
  
  updateTask() {
     
    this.taskService.updateTask(this.task._listId, this.task._id,this.task.title,this.task.deadline,this.task.responsible,this.task.description,this.newfile,this.filename).subscribe(() => {
      alert('Task Has been updated')
      this.router.navigate(['/lists', this.task._listId]);
    })
  }

}
