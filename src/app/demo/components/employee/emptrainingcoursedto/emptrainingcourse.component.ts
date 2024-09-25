import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpTrainingCourse } from 'src/app/demo/models/employee/emptrainingcourse.model';
import { EmpTrainingCourseService } from 'src/app/demo/service/employee/emptrainingcourse.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-emptrainingcourse',
  templateUrl: './emptrainingcourse.component.html',
  styleUrls: ['./emptrainingcourse.component.css']
})
export class EmpTrainingCourseComponent implements OnInit {
  cols: any[] = [];
  emptrainingcourses: EmpTrainingCourse[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly emptrainingcourseService: EmpTrainingCourseService) { }

  ngOnInit(): void {
    this.emptrainingcourseService.GetAllEmpTrainingCourses('').subscribe(
      (res) => {
        this.emptrainingcourses = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
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
        ],
      },
    ];
  }

  initColumns() {
    this.cols = [
{ dataKey: 'startDate', header: APP_CONSTANTS.STARTDATE},
{ dataKey: 'endDate', header: APP_CONSTANTS.ENDDATE},
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'displayOnRecordCard', header: APP_CONSTANTS.DISPLAYONRECORDCARD},
{ dataKey: 'courseName', header: APP_CONSTANTS.COURSENAME},
{ dataKey: 'courseSource', header: APP_CONSTANTS.COURSESOURCE},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
    ]
  }

  submitEventHandler(eventData) {
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
    this.emptrainingcourseService.GetAllEmpTrainingCourses('').subscribe(
      (res) => {
        this.emptrainingcourses = res;
      }
    )
  }
}
