

import {
  FormControl,
  Validators,
  FormGroup,
  FormGroupDirective,
  NgForm
} from '@angular/forms';


export class MyErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
