import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpWorkPlace } from 'src/app/demo/models/employee/empworkplace.model';
import { EmpWorkPlaceService } from 'src/app/demo/service/employee/empworkplace.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empworkplace',
  templateUrl: './empworkplace.component.html',
  styleUrls: ['./empworkplace.component.css']
})
export class EmpWorkPlaceComponent implements OnInit {
  cols: any[] = [];
  empworkplaces: EmpWorkPlace[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empworkplaceService: EmpWorkPlaceService) { }

  ngOnInit(): void {
    this.empworkplaceService.GetAllEmpWorkPlaces('').subscribe(
      (res) => {
        this.empworkplaces = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
{
        type: 'Date',
        label: APP_CONSTANTS.DATEOFSTART,
        name: 'dateOfStart',
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
        label: APP_CONSTANTS.DATEOFRELINQUISHMENT,
        name: 'dateOfRelinquishment',
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
        label: APP_CONSTANTS.DATEOFCONTRACT,
        name: 'dateOfContract',
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
{ dataKey: 'dateOfStart', header: APP_CONSTANTS.DATEOFSTART},
{ dataKey: 'dateOfRelinquishment', header: APP_CONSTANTS.DATEOFRELINQUISHMENT},
{ dataKey: 'dateOfContract', header: APP_CONSTANTS.DATEOFCONTRACT},
{ dataKey: 'contractTypeId', header: APP_CONSTANTS.CONTRACTTYPEID},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
{ dataKey: 'contractTypeName', header: APP_CONSTANTS.CONTRACTTYPENAME},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empworkplaceService.UpdateEmpWorkPlace(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empworkplaceService.AddEmpWorkPlace(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empworkplaceService.DeleteEmpWorkPlace(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empworkplaceService.GetAllEmpWorkPlaces('').subscribe(
      (res) => {
        this.empworkplaces = res;
      }
    )
  }
}
