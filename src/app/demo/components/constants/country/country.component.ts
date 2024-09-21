import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { count, Observable } from 'rxjs';
import { Country } from 'src/app/demo/models/constants/country.model';
import { CountryService } from 'src/app/demo/service/constants/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
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
  countryForm: FormGroup;
  name: string = '';
  countryDialog: boolean = false;

  deleteCountryDialog: boolean = false;

  deleteCountrysDialog: boolean = false;

  countrys: Country[] = [];

  country: Country = {};

  selectedCountrys: Country[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly countryService: CountryService) {
    this.countryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.countryService.GetAllCountrys('').subscribe(
      (res) => {
        this.countrys = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.countryForm.reset();
    this.country = {};
    this.countryDialog = true;
  }
  editCountry(country: Country) {
    this.country = { ...country };
    this.countryDialog = true;
    this.countryForm.patchValue({ name: this.country.name });
  }
  deleteSelectedCountry(country: Country) {
    this.country = country;
    this.deleteCountry(this.country);
  }
  deleteCountry(country?: Country) {
    console.log(country);
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + country.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.countryService.DeleteCountry(country.id as string).subscribe(
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
    this.countryDialog = false;
  }

  saveCountry() {
    if (this.countryForm.valid) {
      if (this.country.id) {
        this.countryService.UpdateCountry(this.country).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.countryService.AddCountry(this.country).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.countryDialog = false;
      this.country = {};
    }
  }

  reload() {
    this.countryService.GetAllCountrys('').subscribe(
      (res) => {
        this.countrys = res;
      }
    )
  }
  get f() {
    return this.countryForm.controls;
  }
}
