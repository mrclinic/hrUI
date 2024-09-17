import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DegreesAuthority } from 'src/app/models/hr/degreesauthority.model';
import { University } from 'src/app/models/hr/University';
import { DegreesAuthorityActions } from 'src/app/stateManagement/hr/actions/DegreesAuthority.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-degreesauthority',
  templateUrl: './degreesauthority.component.html',
  styleUrls: ['./degreesauthority.component.css']
})
export class DegreesAuthorityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  degreesauthoritys: DegreesAuthority[] = [];
  cols: any[];
  degreesauthorityDialog: boolean;
  DegreesAuthority!: DegreesAuthority;
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
  degreesauthorityForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.degreesauthorityForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.degreesauthorityDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DegreesAuthorityActions.GetDegreesAuthoritysInfo('')).subscribe(
      () => {
        this.degreesauthoritys = this.store.selectSnapshot<DegreesAuthority[]>((state) => state.users.degreesauthoritys);
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
    this.DegreesAuthority = {};
    this.submitted = false;
    this.degreesauthorityDialog = true;
  }
  editDegreesAuthority(DegreesAuthority: DegreesAuthority) {
    this.DegreesAuthority = { ...DegreesAuthority };
    this.degreesauthorityDialog = true;
  }
  deleteSelectedDegreesAuthority(DegreesAuthority: DegreesAuthority) {
    this.DegreesAuthority = DegreesAuthority;
    this.deleteDegreesAuthority();
  }
  deleteDegreesAuthority() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.DegreesAuthority.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DegreesAuthorityActions.DeleteDegreesAuthority(this.DegreesAuthority.Id as string)).subscribe(
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
    this.degreesauthorityDialog = false;
    this.submitted = false;
  }

  saveDegreesAuthority() {
    this.submitted = true;
    if (this.degreesauthorityForm.valid) {
      if (this.DegreesAuthority.Id) {
        delete this.DegreesAuthority.Request;
        this.store.dispatch(new DegreesAuthorityActions.UpdateDegreesAuthority(this.DegreesAuthority)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.DegreesAuthority.Id;
        this.store.dispatch(new DegreesAuthorityActions.AddDegreesAuthority(this.DegreesAuthority)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.degreesauthorityDialog = false;
      this.DegreesAuthority = {};
    }
  }

  reload() {
    this.store.dispatch(new DegreesAuthorityActions.GetDegreesAuthoritysInfo('')).subscribe(
      () => {
        this.degreesauthoritys = this.store.selectSnapshot<DegreesAuthority[]>((state) => state.users.degreesauthoritys);
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
    this.DegreesAuthority.RequestId = this.RequestId;
  }

  get f() {
    return this.degreesauthorityForm.controls;
  }
}
