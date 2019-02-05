import { Directive } from '@angular/core';
import { Validator, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[fsOneChecked]',
  providers: [{provide: NG_VALIDATORS, useExisting: OneCheckedDirective, multi:
    true}]
})
export class OneCheckedDirective implements Validator {

  constructor() { }

  validate(group: AbstractControl): { [key: string]: any} {
    if (group instanceof FormGroup) {
      if (Object.values(group.value).every(v => v === false)) { // No checked
        return { 'oneChecked': true };
      }
    }

    return null;
  }

}
