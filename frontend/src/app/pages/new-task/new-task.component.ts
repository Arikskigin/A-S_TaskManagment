import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import{FormBuilder, FormGroup,Validators} from '@angular/forms'
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  fileContent: string | ArrayBuffer;
  newfile;
  filename;
  registerForm: FormGroup;
  submitted = false;
  namepattern="^[a-zA-Z]+ [a-zA-Z]+$"
  usernameshow: any;
  date = new Date().toISOString().slice(0,10);
  currentyear=Date.now();
  datepattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
  
  

  constructor(private authService: AuthService,private taskService: TaskService, private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder) { 
    setInterval(() => {this.currentyear = Date.now()}, 1);
  }

  listId: string;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
    this.registerForm = this.formBuilder.group({

      title: ['', [Validators.required, Validators.minLength(2)]],
      deadline :['', [Validators.required,Validators.pattern(this.datepattern)]],
      responsible: ['', [Validators.required, Validators.pattern(this.namepattern)]],
      
  }, 
    

      
  );
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
  getUsername(){
    return this.usernameshow=this.authService.getUserEmail();

   
    
  }
  createTask(title: string,creator:string,deadline:Date,responsible:string,description:string,) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
        else{
    this.taskService.createTask(title,creator,deadline,responsible,description,this.newfile,this.filename, this.listId).subscribe((newTask: Task) => {
      alert('New task has been created')
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }
  }
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   

    
}


