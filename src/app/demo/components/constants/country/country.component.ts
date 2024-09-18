import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
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
    this.translate.get('AppTitle').subscribe(
      () => {
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.country = {};
    this.countryDialog = true;
  }
  editCountry(country: Country) {
    this.country = { ...country };
    this.countryDialog = true;
  }
  deleteSelectedCountry(country: Country) {
    this.country = country;
    this.deleteCountry();
  }
  deleteCountry() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.country.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.countryService.DeleteCountry(this.country.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.deleteSuccess, life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: this.Yes,
      rejectLabel: this.No,
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
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.countryService.AddCountry(this.country).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
