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
  
  constructor(private authService: AuthService, private router: Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
}
      
  );
  }

  onSignupButtonClicked(email: string, password: string) {
    this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else{
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      this.router.navigate(['/login']);
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    });
  }}
  get f() { return this.registerForm.controls; }

  onSubmit() {
      

      
  }
}
