import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Nationality } from 'src/app/models/hr/nationality.model';
import { University } from 'src/app/models/hr/University';
import { NationalityActions } from 'src/app/stateManagement/hr/actions/Nationality.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  nationalitys: Nationality[] = [];
  cols: any[];
  nationalityDialog: boolean;
  Nationality!: Nationality;
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
  nationalityForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.nationalityForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.nationalityDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new NationalityActions.GetNationalitysInfo('')).subscribe(
      () => {
        this.nationalitys = this.store.selectSnapshot<Nationality[]>((state) => state.users.nationalitys);
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
    this.Nationality = {};
    this.submitted = false;
    this.nationalityDialog = true;
  }
  editNationality(Nationality: Nationality) {
    this.Nationality = { ...Nationality };
    this.nationalityDialog = true;
  }
  deleteSelectedNationality(Nationality: Nationality) {
    this.Nationality = Nationality;
    this.deleteNationality();
  }
  deleteNationality() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Nationality.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new NationalityActions.DeleteNationality(this.Nationality.Id as string)).subscribe(
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
    this.nationalityDialog = false;
    this.submitted = false;
  }

  saveNationality() {
    this.submitted = true;
    if (this.nationalityForm.valid) {
      if (this.Nationality.Id) {
        delete this.Nationality.Request;
        this.store.dispatch(new NationalityActions.UpdateNationality(this.Nationality)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Nationality.Id;
        this.store.dispatch(new NationalityActions.AddNationality(this.Nationality)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.nationalityDialog = false;
      this.Nationality = {};
    }
  }

  reload() {
    this.store.dispatch(new NationalityActions.GetNationalitysInfo('')).subscribe(
      () => {
        this.nationalitys = this.store.selectSnapshot<Nationality[]>((state) => state.users.nationalitys);
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
    this.Nationality.RequestId = this.RequestId;
  }

  get f() {
    return this.nationalityForm.controls;
  }
}
