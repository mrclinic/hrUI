import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { MilitaryRank } from 'src/app/demo/models/constants/militaryrank.model';
import { MilitaryRankService } from 'src/app/demo/service/constants/militaryrank.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-militaryrank',
  templateUrl: './militaryrank.component.html',
  styleUrls: ['./militaryrank.component.css']
})
export class MilitaryRankComponent implements OnInit {
  cols: any[] = [];
  militaryranks: MilitaryRank[] = [];
  formStructure: IFormStructure[] = [];

  constructor(private messageService: MessageService,
    private readonly militaryrankService: MilitaryRankService) { }

  ngOnInit(): void {
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res;
        this.initColumns();
        this.initFormStructure();
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
      this.militaryrankService.UpdateMilitaryRank(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.militaryrankService.AddMilitaryRank(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.militaryrankService.DeleteMilitaryRank(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.militaryrankService.GetAllMilitaryRanks('').subscribe(
      (res) => {
        this.militaryranks = res;
      }
    )
  }
}
