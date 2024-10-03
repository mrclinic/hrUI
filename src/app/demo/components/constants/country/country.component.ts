import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { Country } from 'src/app/demo/models/constants/country.model';
import { CountryService } from 'src/app/demo/service/constants/country.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  cols: any[] = [];
  countrys: Country[] = [];
  formStructure: IFormStructure[] = [];
  canAdd: string = 'HR_Country_CreateCountry';
  canEdit: string = 'HR_Country_UpdateCountry';
  canSingleDelete: string = 'HR_Country_DeleteCountry';

  constructor(private messageService: MessageService,
    private readonly countryService: CountryService) {
    this.initColumns();
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.countryService.GetAllCountrys('').subscribe(
      (res) => {
        this.countrys = res
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
      this.countryService.UpdateCountry(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.countryService.AddCountry(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.countryService.DeleteCountry(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.countryService.GetAllCountrys('').subscribe(
      (res) => {
        this.countrys = res;
      }
    )
  }
}
