import { Component, Input, OnInit } from '@angular/core';
import { IFormStructure } from '../from-structure-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrl: './dynamic-filter.component.scss'
})
export class DynamicFilterComponent implements OnInit {

  @Input() formStructure: IFormStructure[];

  dynamicForm: FormGroup = this.fb.group({});
  @Input() hasCustomCssClass: boolean = false;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.generateFormGroup();
    console.log(this.dynamicForm)
  }

  generateFormGroup() {
    let formGroup: Record<string, any> = {};
    this.formStructure.forEach((control) => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        control.validations.forEach(
          (validation: {
            name: string;
            validator: string;
            message: string;
            value?: number;
          }) => {
            //console.log(validation);
            if (validation.validator === 'required')
              controlValidators.push(Validators.required);
            if (validation.validator === 'email')
              controlValidators.push(Validators.email);
            if (validation.validator === 'maxlength')
              controlValidators.push(Validators.maxLength(validation?.value));
            if (validation.validator === 'minlength')
              controlValidators.push(Validators.minLength(validation?.value));
            // Add more built-in validators as needed
          }
        );
      }

      formGroup[control.name] = [control.value || '', controlValidators];
    });

    this.dynamicForm = this.fb.group(formGroup);
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);
    if (!formControl) {
      return '';
    }
    for (let validation of control.validations) {
      if (formControl.hasError(validation.name)) {
        return validation.message + (validation?.value ? validation?.value : '');
      }
    }
    return '';
  }
}
