import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class DateValidator extends Validators{

   static fromDateValidator(fdValue: FormControl) {
    const date = fdValue.value;
    console.log('x');
    if (date ===null || date==='') return { requiredFromDate: true };
  
  }

   static ToDateValidator(todValue: FormControl) {
    const date = todValue.value;
   
    if (date ===null || date==='') return { requiredToDate: true };
  
  }
}
