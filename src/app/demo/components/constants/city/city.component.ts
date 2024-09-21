import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Observable } from 'rxjs';
import { City } from 'src/app/demo/models/constants/city.model';
import { CityService } from 'src/app/demo/service/constants/city.service';
import { CountryService } from 'src/app/demo/service/constants/country.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  cityForm: FormGroup;
  name: string = '';
  cityDialog: boolean = false;
  deleteCityDialog: boolean = false;
  deleteCitysDialog: boolean = false;
  citys: City[] = [];
  city: City = {};
  selectedCitys: City[] = [];
  countries: any[] | undefined;
  filteredCountries: any[] | undefined;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService,
    private readonly cityService: CityService, private countryService: CountryService) {
    this.cityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      countryid: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    forkJoin([this.cityService.GetAllCitys(''), this.countryService.GetAllCountrys('')])
      .subscribe(([cities, countries]) => {
        this.citys = cities;
        this.countries = countries;
      });
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' },
      { field: 'countryid', header: "البلد" }
    ]
  }
  openNew() {
    this.cityForm.reset();
    this.city = {};
    this.cityDialog = true;
  }
  editCity(city: City) {
    this.city = { ...city };
    this.cityDialog = true;
    this.cityForm.patchValue({ name: this.city.name });
  }
  deleteSelectedCity(city: City) {
    this.city = city;
    this.deleteCity();
  }
  deleteCity() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.city.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cityService.DeleteCity(this.city.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
    });
  }

  hideDialog() {
    this.cityDialog = false;
  }

  saveCity() {
    if (this.cityForm.valid) {
      if (this.city.id) {
        this.cityService.UpdateCity(this.city).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.cityService.AddCity(this.city).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.cityDialog = false;
      this.city = {};
    }
  }

  reload() {
    this.cityService.GetAllCitys('').subscribe(
      (res) => {
        this.citys = res;
      }
    )
  }
  get f() {
    return this.cityForm.controls;
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[])?.length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
