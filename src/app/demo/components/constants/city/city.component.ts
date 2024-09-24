import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { City } from 'src/app/demo/models/constants/city.model';
import { CityService } from 'src/app/demo/service/constants/city.service';
import { CountryService } from 'src/app/demo/service/constants/country.service';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cols: any[] = [];
  citys: City[] = [];
  countries: any[] = [];
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  constructor(private messageService: MessageService,
    private readonly cityService: CityService, private readonly countryService: CountryService) {
    this.initColumns();
  }

  ngOnInit(): void {
    forkJoin([this.cityService.GetCitysInfo(''), this.countryService.GetAllCountrys('')]).subscribe(([cities, countries]) => {
      this.citys = this.mapItemList(cities);
      this.countries = countries.map((item) => {
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
        label: APP_CONSTANTS.COUNTRY_NAME,
        name: 'countryId',
        value: '',
        options: [...this.countries],
        placeHolder: APP_CONSTANTS.COUNTRY_PLACE_HOLDER,
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
      { dataKey: 'countryName', header: APP_CONSTANTS.COUNTRY_NAME, type: 'string' }
    ]
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.cityService.UpdateCity(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.cityService.AddCity(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.cityService.DeleteCity(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.cityService.GetCitysInfo('').subscribe(
      (cities) => {
        this.citys = this.mapItemList(cities);
      }
    )
  }
  mapItemList(items) {
    return items.map((item) => {
      return Object.assign(item, {
        ...item,
        countryName: item?.country?.name
      });
    })
  }
}
