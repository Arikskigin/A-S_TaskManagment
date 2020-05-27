import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{FormBuilder, FormGroup,Validators} from '@angular/forms'



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  
  
})
export class LoginPageComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  message: string;
  flag=false;
  
  
 
  constructor(private authService: AuthService, private router: Router,private formBuilder:FormBuilder) {
    
  
   }

  ngOnInit() {
    
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
    
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
          el.addEventListener('click', () => {
    
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
    
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
    
          });
        });
      }
    
    });
    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      
  }, 
    

      
  );
  }

  onLoginButtonClicked(email: string, password: string) {
    
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
          
            return;
        }
      
   this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      
    })
    
  
    setTimeout(() => this.registerForm.reset(), 2000);
   
    
      
    
    
}

  
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
} 
    
