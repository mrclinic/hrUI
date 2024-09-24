import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ExperienceType } from 'src/app/demo/models/constants/experiencetype.model';
import { ExperienceTypeService } from 'src/app/demo/service/constants/experiencetype.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-experiencetype',
  templateUrl: './experiencetype.component.html',
  styleUrls: ['./experiencetype.component.css']
})
export class ExperienceTypeComponent implements OnInit {
  cols: any[] = [];
  experiencetypes: ExperienceType[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';

  constructor(private messageService: MessageService,
    private readonly experiencetypeService: ExperienceTypeService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.experiencetypeService.GetAllExperienceTypes('').subscribe(
      (res) => {
        this.experiencetypes = res
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
      this.experiencetypeService.UpdateExperienceType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.experiencetypeService.AddExperienceType(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.experiencetypeService.DeleteExperienceType(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.experiencetypeService.GetAllExperienceTypes('').subscribe(
      (res) => {
        this.experiencetypes = res;
      }
    )
  }
}
