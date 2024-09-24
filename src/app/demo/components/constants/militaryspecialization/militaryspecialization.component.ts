import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { MilitarySpecialization } from 'src/app/demo/models/constants/militaryspecialization.model';
import { MilitarySpecializationService } from 'src/app/demo/service/constants/militaryspecialization.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-militaryspecialization',
  templateUrl: './militaryspecialization.component.html',
  styleUrls: ['./militaryspecialization.component.css']
})
export class MilitarySpecializationComponent implements OnInit {
  cols: any[] = [];
  militaryspecializations: MilitarySpecialization[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';

  constructor(private messageService: MessageService,
    private readonly militaryspecializationService: MilitarySpecializationService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.militaryspecializationService.GetAllMilitarySpecializations('').subscribe(
      (res) => {
        this.militaryspecializations = res
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.NAME,
        name: 'name',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      }
    ];
  }

  initColumns() {
    this.cols = [
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.militaryspecializationService.UpdateMilitarySpecialization(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.militaryspecializationService.AddMilitarySpecialization(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.militaryspecializationService.DeleteMilitarySpecialization(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.militaryspecializationService.GetAllMilitarySpecializations('').subscribe(
      (res) => {
        this.militaryspecializations = res;
      }
    )
  }
}
