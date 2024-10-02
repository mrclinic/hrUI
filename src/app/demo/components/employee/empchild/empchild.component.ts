import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpChild } from 'src/app/demo/models/employee/empchild.model';
import { ChildStatusService } from 'src/app/demo/service/constants/childstatus.service';
import { GenderService } from 'src/app/demo/service/constants/gender.service';
import { EmpChildService } from 'src/app/demo/service/employee/empchild.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empchild',
  templateUrl: './empchild.component.html',
  styleUrls: ['./empchild.component.css']
})
export class EmpChildComponent implements OnInit {
  cols: any[] = [];
  empchilds: EmpChild[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  @Input() personId: string;
  filter: string = '';
  fetched: boolean = false;
  genders: any[] = [];
  statuss: any[] = [];
  constructor(private messageService: MessageService,
    private readonly empchildService: EmpChildService, private datePipe: DatePipe,
    private readonly childStatusService: ChildStatusService,
    private readonly genderService: GenderService) {
    this.initColumns();
  }

  transformDate(date: string | number | Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    forkJoin([this.empchildService.GetEmpChildsInfo(this.filter),
    this.childStatusService.GetAllChildStatuss(''),
    this.genderService.GetAllGenders('')
    ])
      .subscribe(([empchilds, statuss, genders
      ]) => {
        this.empchilds = this.mapItemList(empchilds);

        this.statuss = statuss.map((item) => {
          return Object.assign(item, {
            label: item?.name,
            value: item?.id
          });
        });

        this.genders = genders.map((item) => {
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
        genderName: item?.gender?.name,
        childStatusName: item?.childStatus?.name,
        birthDate: this.transformDate(item?.birthDate),
        occurrenceDate: this.transformDate(item?.occurrenceDate)
      });
    })
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'Date',
        label: APP_CONSTANTS.BIRTHDATE,
        name: 'birthDate',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
        format: 'yy-mm-dd',
        maxValue: new Date()
      },
      {
        type: 'Date',
        label: APP_CONSTANTS.OCCURRENCEDATE,
        name: 'occurrenceDate',
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
        type: 'number',
        label: APP_CONSTANTS.CHILDORDER,
        name: 'childOrder',
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
        label: APP_CONSTANTS.GENDER_NAME,
        name: 'genderId',
        value: '',
        options: [...this.genders],
        placeHolder: APP_CONSTANTS.GENDER_PLACE_HOLDER,
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
        label: APP_CONSTANTS.STATUS_NAME,
        name: 'statusId',
        value: '',
        options: [...this.statuss],
        placeHolder: APP_CONSTANTS.STATUS_PLACE_HOLDER,
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
        label: APP_CONSTANTS.NAME,
        name: 'name',
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
            value: 50
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.MOTHERNAME,
        name: 'motherName',
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
            value: 50
          },
        ],
      },
      {
        type: 'text',
        label: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER,
        name: 'occurrenceContractNumber',
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
      { dataKey: 'birthDate', header: APP_CONSTANTS.BIRTHDATE },
      { dataKey: 'occurrenceDate', header: APP_CONSTANTS.OCCURRENCEDATE },
      { dataKey: 'childOrder', header: APP_CONSTANTS.CHILDORDER },
      { dataKey: 'genderName', header: APP_CONSTANTS.GENDER_NAME },
      { dataKey: 'childStatusName', header: APP_CONSTANTS.CHILDSTATUSNAME },
      { dataKey: 'name', header: APP_CONSTANTS.NAME },
      { dataKey: 'motherName', header: APP_CONSTANTS.MOTHERNAME },
      { dataKey: 'occurrenceContractNumber', header: APP_CONSTANTS.OCCURRENCECONTRACTNUMBER },
      { dataKey: 'note', header: APP_CONSTANTS.NOTE }
    ]
  }

  submitEventHandler(eventData) {
    eventData = { ...eventData, employeeId: this.personId };
    if (eventData.id) {
      this.empchildService.UpdateEmpChild(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empchildService.AddEmpChild(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empchildService.DeleteEmpChild(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.filter = `Filters=EmployeeId==${this.personId}`;
    this.empchildService.GetEmpChildsInfo(this.filter).subscribe(
      (res) => {
        this.empchilds = this.mapItemList(res);
      }
    )
  }
}
