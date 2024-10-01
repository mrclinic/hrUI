import { Component, Input, OnInit } from '@angular/core';
import { IFormStructure } from '../from-structure-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {

  @Input() formStructure: IFormStructure[];

  dynamicForm: FormGroup = this.fb.group({});
  @Input() hasCustomCssClass: boolean = false;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.generateFormGroup();
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
