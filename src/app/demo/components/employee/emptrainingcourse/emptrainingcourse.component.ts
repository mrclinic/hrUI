import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { GeneralService } from 'src/app/demo/service/common/general-service.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';
import { EmpTrainingCourseService } from 'src/app/demo/service/employee/emptrainingcourse.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emptrainingcourse',
  templateUrl: './emptrainingcourse.component.html',
  styleUrls: ['./emptrainingcourse.component.css']
})
export class EmpTrainingCourseComponent implements OnInit {
  cols: any[] = [];
  emptrainingcourses: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  filter: string;
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  contractTypes: any[] = [];
  constructor(private messageService: MessageService, private datePipe: DatePipe,
    private readonly emptrainingcourseService: EmpTrainingCourseService,
    private readonly modificationContractTypeService: ModificationContractTypeService, private readonly generalService: GeneralService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.emptrainingcourseService.GetEmpTrainingCoursesInfo(this.filter),
    this.modificationContractTypeService.GetAllModificationContractTypes('')
    ])
      .subscribe(([emptrainingcourses, contractTypes
      ]) => {
        this.emptrainingcourses = this.mapItemList(emptrainingcourses);

        this.contractTypes = contractTypes.map((item) => {
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
        contractTypeName: item?.contractType?.name,
        startDate: this.transformDate(item?.startDate),
        endDate: this.transformDate(item?.endDate),
        contractDate: this.transformDate(item?.contractDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.STARTDATE,
        name: 'startDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.ENDDATE,
        name: 'endDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.CONTRACTDATE,
        name: 'contractDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd'
      },
      {
        type: 'select',
        label: APP_CONSTANTS.CONTRACTTYPE_NAME,
        name: 'contractTypeId',
        value: '',
        options: [...this.contractTypes],
        placeHolder: APP_CONSTANTS.CONTRACTTYPE_PLACE_HOLDER,
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      },
      {
        type: 'radio',
        label: APP_CONSTANTS.DISPLAYONRECORDCARD,
        name: 'displayOnRecordCard',
        value: '',
        options: [...this.generalService.getRadioOptions()],
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
        label: APP_CONSTANTS.COURSENAME,
        name: 'courseName',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.COURSESOURCE,
        name: 'courseSource',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.CONTRACTNUMBER,
        name: 'contractNumber',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
          {
            name: 'maxlength',
            validator: 'maxlength',
            message: APP_CONSTANTS.FIELD_MAX_LENGTH,
            value: 255
          }
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
      { dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE },
      { dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE },
      { dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE },
      { dataKey: 'displayOnRecordCard', header: APP_CONSTANTS.DISPLAYONRECORDCARD },
      { dataKey: 'courseName', header: APP_CONSTANTS.COURSENAME },
      { dataKey: 'courseSource', header: APP_CONSTANTS.COURSESOURCE },
      { dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER },
      { dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPE_NAME },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.emptrainingcourseService.UpdateEmpTrainingCourse(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.emptrainingcourseService.AddEmpTrainingCourse(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.emptrainingcourseService.DeleteEmpTrainingCourse(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.emptrainingcourseService.GetEmpTrainingCoursesInfo(this.filter).subscribe(
      (res) => {
        this.emptrainingcourses = this.mapItemList(res);
      }
    )
  }
}
