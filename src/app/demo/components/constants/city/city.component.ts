import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/hr/city.model';
import { University } from 'src/app/models/hr/University';
import { CityActions } from 'src/app/stateManagement/hr/actions/City.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  citys: City[] = [];
  cols: any[];
  cityDialog: boolean;
  City!: City;
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
  cityForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.cityForm = fb.group({
      countryid: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.cityDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new CityActions.GetCitysInfo('')).subscribe(
      () => {
        this.citys = this.store.selectSnapshot<City[]>((state) => state.users.citys);
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
      { field: 'countryid', header: this.countryid, type: 'string' },
      { field: 'country', header: this.country, type: 'hiastHRApi.Service.DTO.Constants.CountryDto' },
      { field: 'name', header: this.name, type: 'string' },
      { field: 'id', header: this.id, type: 'string' },

    ]
  }
  openNew() {
    this.City = {};
    this.submitted = false;
    this.cityDialog = true;
  }
  editCity(City: City) {
    this.City = { ...City };
    this.cityDialog = true;
  }
  deleteSelectedCity(City: City) {
    this.City = City;
    this.deleteCity();
  }
  deleteCity() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.City.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new CityActions.DeleteCity(this.City.Id as string)).subscribe(
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
    this.cityDialog = false;
    this.submitted = false;
  }

  saveCity() {
    this.submitted = true;
    if (this.cityForm.valid) {
      if (this.City.Id) {
        delete this.City.Request;
        this.store.dispatch(new CityActions.UpdateCity(this.City)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.City.Id;
        this.store.dispatch(new CityActions.AddCity(this.City)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.cityDialog = false;
      this.City = {};
    }
  }

  reload() {
    this.store.dispatch(new CityActions.GetCitysInfo('')).subscribe(
      () => {
        this.citys = this.store.selectSnapshot<City[]>((state) => state.users.citys);
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
    this.City.RequestId = this.RequestId;
  }

  get f() {
    return this.cityForm.controls;
  }
}
