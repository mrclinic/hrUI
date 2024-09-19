import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HealthyStatus } from 'src/app/demo/models/constants/healthystatus.model';
import { HealthyStatusService } from 'src/app/demo/service/constants/healthystatus.service';

@Component({
  selector: 'app-healthystatus',
  templateUrl: './healthystatus.component.html',
  styleUrls: ['./healthystatus.component.css']
})
export class HealthyStatusComponent implements OnInit {
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
  healthystatusForm: FormGroup;
  name: string = '';
  healthystatusDialog: boolean = false;

  deleteHealthyStatusDialog: boolean = false;

  deleteHealthyStatussDialog: boolean = false;

  healthystatuss: HealthyStatus[] = [];

  HealthyStatus: HealthyStatus = {};

  selectedHealthyStatuss: HealthyStatus[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly healthystatusService: HealthyStatusService) {
    this.healthystatusForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.healthystatusService.GetAllHealthyStatuss('').subscribe(
      (res) => {
        this.healthystatuss = res;
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
    this.HealthyStatus = {};
    this.healthystatusDialog = true;
  }
  editHealthyStatus(HealthyStatus: HealthyStatus) {
    this.HealthyStatus = { ...HealthyStatus };
    this.healthystatusDialog = true;
  }
  deleteSelectedHealthyStatus(HealthyStatus: HealthyStatus) {
    this.HealthyStatus = HealthyStatus;
    this.deleteHealthyStatus();
  }
  deleteHealthyStatus() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.HealthyStatus.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthystatusService.DeleteHealthyStatus(this.HealthyStatus.id as string).subscribe(
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
    this.healthystatusDialog = false;
  }

  saveHealthyStatus() {
    if (this.healthystatusForm.valid) {
      if (this.HealthyStatus.id) {
        this.healthystatusService.UpdateHealthyStatus(this.HealthyStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.healthystatusService.AddHealthyStatus(this.HealthyStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.healthystatusDialog = false;
      this.HealthyStatus = {};
    }
  }

  reload() {
    this.healthystatusService.GetAllHealthyStatuss('').subscribe(
      (res) => {
        this.healthystatuss = res;
      }
    )
  }
  get f() {
    return this.healthystatusForm.controls;
  }
}
