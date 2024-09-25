import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpExperience } from 'src/app/demo/models/employee/empexperience.model';
import { EmpExperienceService } from 'src/app/demo/service/employee/empexperience.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empexperience',
  templateUrl: './empexperience.component.html',
  styleUrls: ['./empexperience.component.css']
})
export class EmpExperienceComponent implements OnInit {
  cols: any[] = [];
  empexperiences: EmpExperience[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empexperienceService: EmpExperienceService) { }

  ngOnInit(): void {
    this.empexperienceService.GetAllEmpExperiences('').subscribe(
      (res) => {
        this.empexperiences = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'select',
        label: APP_CONSTANTS.EXPERIENCETYPE_NAME,
        name: 'experienceTypeId',
        value: '',
        options: [...this.experienceTypes],
        placeHolder: APP_CONSTANTS.EXPERIENCETYPE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'text',
        label: APP_CONSTANTS.SOURCE,
        name: 'source',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
{
        type: 'text',
        label: APP_CONSTANTS.DURATION,
        name: 'duration',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'experienceTypeId', header: APP_CONSTANTS.EXPERIENCETYPEID},
{ dataKey: 'experienceTypeName', header: APP_CONSTANTS.EXPERIENCETYPENAME},
{ dataKey: 'source', header: APP_CONSTANTS.SOURCE},
{ dataKey: 'duration', header: APP_CONSTANTS.DURATION},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empexperienceService.UpdateEmpExperience(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empexperienceService.AddEmpExperience(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empexperienceService.DeleteEmpExperience(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empexperienceService.GetAllEmpExperiences('').subscribe(
      (res) => {
        this.empexperiences = res;
      }
    )
  }
}
