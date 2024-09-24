import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { QualificationService } from 'src/app/demo/service/constants/qualification.service';
import { SpecializationService } from 'src/app/demo/service/constants/specialization.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {
  cols: any[] = [];
  specializations: any[] = [];
  formStructure: IFormStructure[] = [];
  qualifications: any[] = [];
  fetched: boolean = false;
  constructor(private messageService: MessageService,
    private readonly specializationService: SpecializationService, private readonly qualificationService: QualificationService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.specializationService.GetSpecializationsInfo(''),
    this.qualificationService.GetAllQualifications('')]).subscribe(([res, qualifications]) => {
      this.specializations = this.mapItemList(res);
      this.qualifications = qualifications.map((item) => {
        return Object.assign(item, {
          label: item?.name,
          value: item?.id
        });
      })
      this.initFormStructure();
      this.fetched = true;
    })
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
      },
      {
        type: 'select',
        label: APP_CONSTANTS.qualification_NAME,
        name: 'qualificationId',
        value: '',
        options: [...this.qualifications],
        placeHolder: APP_CONSTANTS.qualification_PLACE_HOLDER,
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
      { dataKey: 'name', header: APP_CONSTANTS.NAME, type: 'string' },
      { dataKey: 'qualificationName', header: APP_CONSTANTS.qualification_NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.specializationService.UpdateSpecialization(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.specializationService.AddSpecialization(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.specializationService.DeleteSpecialization(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.specializationService.GetSpecializationsInfo('').subscribe(
      (res) => {
        this.specializations = this.mapItemList(res);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        qualificationName: item?.qualification?.name
      });
    })
  }
}
