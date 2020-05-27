import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import{FormBuilder, FormGroup,Validators} from '@angular/forms'
import { MustMatch } from 'src/app/pages/_helpers/must-match.validator';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  namepattern="^[a-zA-Z]+ [a-zA-Z]+$"
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
      name: ['', [Validators.required,Validators.pattern(this.namepattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
}
      
  );
  }

  onSignupButtonClicked(email: string, password: string, name:string) {
    this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
          
        } 
        else{
        this.authService.signup(email,name, password).subscribe((res: HttpResponse<any>) => {
          this.router.navigate(['/login']);
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
        });   
      
      
        setTimeout(() => this.registerForm.reset(), 2000);
      }
  
}
  get f() { return this.registerForm.controls; }

  
}
