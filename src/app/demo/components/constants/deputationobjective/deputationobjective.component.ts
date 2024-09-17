import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationObjective } from 'src/app/models/hr/deputationobjective.model';
import { University } from 'src/app/models/hr/University';
import { DeputationObjectiveActions } from 'src/app/stateManagement/hr/actions/DeputationObjective.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-deputationobjective',
  templateUrl: './deputationobjective.component.html',
  styleUrls: ['./deputationobjective.component.css']
})
export class DeputationObjectiveComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  deputationobjectives: DeputationObjective[] = [];
  cols: any[];
  deputationobjectiveDialog: boolean;
  DeputationObjective!: DeputationObjective;
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
  deputationobjectiveForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.deputationobjectiveForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.deputationobjectiveDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new DeputationObjectiveActions.GetDeputationObjectivesInfo('')).subscribe(
      () => {
        this.deputationobjectives = this.store.selectSnapshot<DeputationObjective[]>((state) => state.users.deputationobjectives);
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
    this.DeputationObjective = {};
    this.submitted = false;
    this.deputationobjectiveDialog = true;
  }
  editDeputationObjective(DeputationObjective: DeputationObjective) {
    this.DeputationObjective = { ...DeputationObjective };
    this.deputationobjectiveDialog = true;
  }
  deleteSelectedDeputationObjective(DeputationObjective: DeputationObjective) {
    this.DeputationObjective = DeputationObjective;
    this.deleteDeputationObjective();
  }
  deleteDeputationObjective() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.DeputationObjective.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new DeputationObjectiveActions.DeleteDeputationObjective(this.DeputationObjective.Id as string)).subscribe(
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
    this.deputationobjectiveDialog = false;
    this.submitted = false;
  }

  saveDeputationObjective() {
    this.submitted = true;
    if (this.deputationobjectiveForm.valid) {
      if (this.DeputationObjective.Id) {
        delete this.DeputationObjective.Request;
        this.store.dispatch(new DeputationObjectiveActions.UpdateDeputationObjective(this.DeputationObjective)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.DeputationObjective.Id;
        this.store.dispatch(new DeputationObjectiveActions.AddDeputationObjective(this.DeputationObjective)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationobjectiveDialog = false;
      this.DeputationObjective = {};
    }
  }

  reload() {
    this.store.dispatch(new DeputationObjectiveActions.GetDeputationObjectivesInfo('')).subscribe(
      () => {
        this.deputationobjectives = this.store.selectSnapshot<DeputationObjective[]>((state) => state.users.deputationobjectives);
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
    this.DeputationObjective.RequestId = this.RequestId;
  }

  get f() {
    return this.deputationobjectiveForm.controls;
  }
}
