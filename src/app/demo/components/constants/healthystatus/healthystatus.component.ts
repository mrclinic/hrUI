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
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.healthystatusForm.reset();
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
      message: 'هل أنت متأكد من حذف' + this.HealthyStatus.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.healthystatusService.DeleteHealthyStatus(this.HealthyStatus.id as string).subscribe(
          (data) => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
            this.reload();
          }
        );
      },
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
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
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.healthystatusService.AddHealthyStatus(this.HealthyStatus).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
