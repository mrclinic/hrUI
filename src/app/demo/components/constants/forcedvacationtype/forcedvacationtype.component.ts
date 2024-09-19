import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ForcedVacationType } from 'src/app/demo/models/constants/forcedvacationtype.model';
import { ForcedVacationTypeService } from 'src/app/demo/service/constants/forcedvacationtype.service';

@Component({
  selector: 'app-forcedvacationtype',
  templateUrl: './forcedvacationtype.component.html',
  styleUrls: ['./forcedvacationtype.component.css']
})
export class ForcedVacationTypeComponent implements OnInit {
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
  forcedvacationtypeForm: FormGroup;
  name: string = '';
  forcedvacationtypeDialog: boolean = false;

  deleteForcedVacationTypeDialog: boolean = false;

  deleteForcedVacationTypesDialog: boolean = false;

  forcedvacationtypes: ForcedVacationType[] = [];

  ForcedVacationType: ForcedVacationType = {};

  selectedForcedVacationTypes: ForcedVacationType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly forcedvacationtypeService: ForcedVacationTypeService) {
    this.forcedvacationtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res;
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
    this.ForcedVacationType = {};
    this.forcedvacationtypeDialog = true;
  }
  editForcedVacationType(ForcedVacationType: ForcedVacationType) {
    this.ForcedVacationType = { ...ForcedVacationType };
    this.forcedvacationtypeDialog = true;
  }
  deleteSelectedForcedVacationType(ForcedVacationType: ForcedVacationType) {
    this.ForcedVacationType = ForcedVacationType;
    this.deleteForcedVacationType();
  }
  deleteForcedVacationType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.ForcedVacationType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.forcedvacationtypeService.DeleteForcedVacationType(this.ForcedVacationType.id as string).subscribe(
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
    this.forcedvacationtypeDialog = false;
  }

  saveForcedVacationType() {
    if (this.forcedvacationtypeForm.valid) {
      if (this.ForcedVacationType.id) {
        this.forcedvacationtypeService.UpdateForcedVacationType(this.ForcedVacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.forcedvacationtypeService.AddForcedVacationType(this.ForcedVacationType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.forcedvacationtypeDialog = false;
      this.ForcedVacationType = {};
    }
  }

  reload() {
    this.forcedvacationtypeService.GetAllForcedVacationTypes('').subscribe(
      (res) => {
        this.forcedvacationtypes = res;
      }
    )
  }
  get f() {
    return this.forcedvacationtypeForm.controls;
  }
}
