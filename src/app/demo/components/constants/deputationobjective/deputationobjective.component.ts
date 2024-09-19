import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationObjective } from 'src/app/demo/models/constants/deputationobjective.model';
import { DeputationObjectiveService } from 'src/app/demo/service/constants/deputationobjective.service';

@Component({
  selector: 'app-deputationobjective',
  templateUrl: './deputationobjective.component.html',
  styleUrls: ['./deputationobjective.component.css']
})
export class DeputationobjectiveComponent implements OnInit {
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
  deputationobjectiveForm: FormGroup;
  name: string = '';
  deputationobjectiveDialog: boolean = false;

  deleteDeputationobjectiveDialog: boolean = false;

  deleteDeputationobjectivesDialog: boolean = false;

  deputationobjectives: DeputationObjective[] = [];

  deputationobjective: DeputationObjective = {};

  selectedDeputationobjectives: DeputationObjective[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly deputationobjectiveService: DeputationObjectiveService) {
    this.deputationobjectiveForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res;
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
    this.deputationobjective = {};
    this.deputationobjectiveDialog = true;
  }
  editDeputationobjective(deputationobjective: DeputationObjective) {
    this.deputationobjective = { ...deputationobjective };
    this.deputationobjectiveDialog = true;
  }
  deleteSelectedDeputationobjective(deputationobjective: DeputationObjective) {
    this.deputationobjective = deputationobjective;
    this.deleteDeputationobjective();
  }
  deleteDeputationobjective() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.deputationobjective.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deputationobjectiveService.DeleteDeputationObjective(this.deputationobjective.id as string).subscribe(
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
    this.deputationobjectiveDialog = false;
  }

  saveDeputationobjective() {
    if (this.deputationobjectiveForm.valid) {
      if (this.deputationobjective.id) {
        this.deputationobjectiveService.UpdateDeputationObjective(this.deputationobjective).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.deputationobjectiveService.AddDeputationObjective(this.deputationobjective).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationobjectiveDialog = false;
      this.deputationobjective = {};
    }
  }

  reload() {
    this.deputationobjectiveService.GetAllDeputationObjectives('').subscribe(
      (res) => {
        this.deputationobjectives = res;
      }
    )
  }
  get f() {
    return this.deputationobjectiveForm.controls;
  }
}
