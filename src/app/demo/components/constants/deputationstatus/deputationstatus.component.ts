import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DeputationStatus } from 'src/app/demo/models/constants/deputationstatus.model';
import { DeputationStatusService } from 'src/app/demo/service/constants/deputationstatus.service';

@Component({
  selector: 'app-deputationStatus',
  templateUrl: './deputationStatus.component.html',
  styleUrls: ['./deputationStatus.component.css']
})
export class DeputationStatusComponent implements OnInit {
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
  deputationStatusForm: FormGroup;
  name: string = '';
  deputationStatusDialog: boolean = false;

  deleteDeputationStatusDialog: boolean = false;

  deleteDeputationStatussDialog: boolean = false;

  deputationStatuss: DeputationStatus[] = [];

  deputationStatus: DeputationStatus = {};

  selectedDeputationStatuss: DeputationStatus[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly deputationStatussService: DeputationStatusService) {
    this.deputationStatusForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.deputationStatussService.GetAllDeputationStatuss('').subscribe(
      (res) => {
        this.deputationStatuss = res;
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
    this.deputationStatus = {};
    this.deputationStatusDialog = true;
  }
  editDeputationStatus(deputationStatus: DeputationStatus) {
    this.deputationStatus = { ...deputationStatus };
    this.deputationStatusDialog = true;
  }
  deleteSelectedDeputationStatus(deputationStatus: DeputationStatus) {
    this.deputationStatus = deputationStatus;
    this.deleteDeputationStatus();
  }
  deleteDeputationStatus() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.deputationStatus.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deputationStatussService.DeleteDeputationStatus(this.deputationStatus.id as string).subscribe(
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
    this.deputationStatusDialog = false;
  }

  saveDeputationStatus() {
    if (this.deputationStatusForm.valid) {
      if (this.deputationStatus.id) {
        this.deputationStatussService.UpdateDeputationStatus(this.deputationStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.deputationStatussService.AddDeputationStatus(this.deputationStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.deputationStatusDialog = false;
      this.deputationStatus = {};
    }
  }

  reload() {
    this.deputationStatussService.GetAllDeputationStatuss('').subscribe(
      (res) => {
        this.deputationStatuss = res;
      }
    )
  }
  get f() {
    return this.deputationStatusForm.controls;
  }
}
