import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { EmpWorkInjury } from 'src/app/demo/models/employee/empworkinjury.model';
import { EmpWorkInjuryService } from 'src/app/demo/service/employee/empworkinjury.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-empworkinjury',
  templateUrl: './empworkinjury.component.html',
  styleUrls: ['./empworkinjury.component.css']
})
export class EmpWorkInjuryComponent implements OnInit {
  cols: any[] = [];
  empworkinjurys: EmpWorkInjury[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly empworkinjuryService: EmpWorkInjuryService) { }

  ngOnInit(): void {
    this.empworkinjuryService.GetAllEmpWorkInjurys('').subscribe(
      (res) => {
        this.empworkinjurys = res;
        this.initColumns();
        this.initFormStructure();
      }
    );
  }

  initFormStructure() {
    this.formStructure = [
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
        type: 'number',
        label: APP_CONSTANTS.DISABILITYRATIO,
        name: 'disabilityRatio',
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
        type: 'number',
        label: APP_CONSTANTS.LUMPSUMAMOUNT,
        name: 'lumpSumAmount',
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
        type: 'number',
        label: APP_CONSTANTS.MONTHLYAMOUNT,
        name: 'monthlyAmount',
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
        label: APP_CONSTANTS.INJURYTYPE,
        name: 'injuryType',
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
{ dataKey: 'contractDate', header: APP_CONSTANTS.CONTRACTDATE},
{ dataKey: 'disabilityRatio', header: APP_CONSTANTS.DISABILITYRATIO},
{ dataKey: 'lumpSumAmount', header: APP_CONSTANTS.LUMPSUMAMOUNT},
{ dataKey: 'monthlyAmount', header: APP_CONSTANTS.MONTHLYAMOUNT},
{ dataKey: 'injuryType', header: APP_CONSTANTS.INJURYTYPE},
{ dataKey: 'contractNumber', header: APP_CONSTANTS.CONTRACTNUMBER},
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.empworkinjuryService.UpdateEmpWorkInjury(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.empworkinjuryService.AddEmpWorkInjury(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.empworkinjuryService.DeleteEmpWorkInjury(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.empworkinjuryService.GetAllEmpWorkInjurys('').subscribe(
      (res) => {
        this.empworkinjurys = res;
      }
    )
  }
}
