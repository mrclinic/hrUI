import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { ExperienceTypeService } from 'src/app/demo/service/constants/experiencetype.service';
import { EmpExperienceService } from 'src/app/demo/service/employee/empexperience.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empexperience',
  templateUrl: './empexperience.component.html',
  styleUrls: ['./empexperience.component.css']
})
export class EmpExperienceComponent implements OnInit {
  cols: any[] = [];
  empexperiences: any[] = [];
  formStructure: IFormStructure[] = [];
  experienceTypes: any[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = 'HR_EmpExperience_CreateEmpExperience';
  canEdit: string = 'HR_EmpExperience_UpdateEmpExperience';
  canSingleDelete: string = 'HR_EmpExperience_DeleteEmpExperience';
  @Input() personId: string;

  constructor(private messageService: MessageService,
    private readonly empexperienceService: EmpExperienceService, private readonly experienceTypeService: ExperienceTypeService) {
    this.initColumns();
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empexperienceService.GetEmpExperiencesInfo(this.filter),
    this.experienceTypeService.GetAllExperienceTypes('')
    ])
      .subscribe(([empexperiences, experienceTypes
      ]) => {
        this.empexperiences = this.mapItemList(empexperiences);

        this.experienceTypes = experienceTypes.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });
        this.initFormStructure();
        this.fetched = true;
      });
  }
  mapItemList(items: any[]): any[] {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        experienceTypeName: item?.experienceType?.name
      });
    })
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
      {
        type: 'text',
        label: APP_CONSTANTS.NOTE,
        name: 'note',
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
      { dataKey: 'experienceTypeName', header: APP_CONSTANTS.EXPERIENCETYPE_NAME },
      { dataKey: 'source', header: APP_CONSTANTS.SOURCE },
      { dataKey: 'duration', header: APP_CONSTANTS.DURATION },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
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
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empexperienceService.GetEmpExperiencesInfo(this.filter).subscribe(
      (res) => {
        this.empexperiences = this.mapItemList(res);
      }
    )
  }
}
