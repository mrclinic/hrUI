import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/hr/country.model';
import { University } from 'src/app/models/hr/University';
import { CountryActions } from 'src/app/stateManagement/hr/actions/Country.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  countrys: Country[] = [];
  cols: any[];
  countryDialog: boolean;
  Country!: Country;
  submitted: boolean;
  Time: string = '';
  Place: string = '';
  DateLabel: string = '';
  Note: string = '';
  IsCancelled: string = '';
  IsDone: string = '';
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  RequestIdCol: string = '';
  RequestId: string = '';
  universities: University[] = [];
  countryForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.countryForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.countryDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new CountryActions.GetCountrysInfo('')).subscribe(
      () => {
        this.countrys = this.store.selectSnapshot<Country[]>((state) => state.users.countrys);
      }
    );
    this.translate.get('AppTitle').subscribe(
      () => {
        this.Time = this.translate.instant('Time');;
        this.Place = this.translate.instant('Place');
        this.DateLabel = this.translate.instant('Date');;
        this.Note = this.translate.instant('Note');
        this.IsCancelled = this.translate.instant('IsCancelled');
        this.IsDone = this.translate.instant('IsDone');
        this.CancelReason = this.translate.instant('CancelReason');
        this.ConfirmTitle = this.translate.instant('ConfirmTitle');
        this.ConfirmMsg = this.translate.instant('ConfirmMsg');
        this.Success = this.translate.instant('Success');
        this.deleteSuccess = this.translate.instant('deleteSuccess');
        this.Yes = this.translate.instant('Yes');
        this.No = this.translate.instant('No');
        this.editSuccess = this.translate.instant('editSuccess');
        this.addSuccess = this.translate.instant('addSuccess');
        this.RequestIdCol = this.translate.instant('RequestId');
        this.initColumns();
      }
    )
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.Country = {};
    this.submitted = false;
    this.countryDialog = true;
  }
  editCountry(Country: Country) {
    this.Country = { ...Country };
    this.countryDialog = true;
  }
  deleteSelectedCountry(Country: Country) {
    this.Country = Country;
    this.deleteCountry();
  }
  deleteCountry() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Country.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new CountryActions.DeleteCountry(this.Country.Id as string)).subscribe(
          data => {
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
    this.submitted = false;
  }

  saveCountry() {
    this.submitted = true;
    if (this.countryForm.valid) {
      if (this.Country.Id) {
        delete this.Country.Request;
        this.store.dispatch(new CountryActions.UpdateCountry(this.Country)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Country.Id;
        this.store.dispatch(new CountryActions.AddCountry(this.Country)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.countryDialog = false;
      this.Country = {};
    }
  }

  reload() {
    this.store.dispatch(new CountryActions.GetCountrysInfo('')).subscribe(
      () => {
        this.countrys = this.store.selectSnapshot<Country[]>((state) => state.users.countrys);
      }
    )
  }

  searchUniversity(event: any) {
    let filter = "Filters=Name@=" + event.query;
    this.store.dispatch(new UniversityActions.GetAllUniversitys(filter)).subscribe(
      () => {
        this.universities = this.store.selectSnapshot<University[]>((state) => state.users.universities);
      }
    );
  }
  onSelectUniversity(event: any) {
    this.RequestId = event.Id;
    this.Country.RequestId = this.RequestId;
  }

  get f() {
    return this.countryForm.controls;
  }
}
