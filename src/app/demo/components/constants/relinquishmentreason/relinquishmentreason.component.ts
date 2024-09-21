import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { RelinquishmentReason } from 'src/app/demo/models/constants/relinquishmentreason.model';
import { RelinquishmentReasonService } from 'src/app/demo/service/constants/relinquishmentreason.service';

@Component({
  selector: 'app-relinquishmentreason',
  templateUrl: './relinquishmentreason.component.html',
  styleUrls: ['./relinquishmentreason.component.css']
})
export class RelinquishmentReasonComponent implements OnInit {
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
  relinquishmentreasonForm: FormGroup;
  name: string = '';
  relinquishmentreasonDialog: boolean = false;

  deleteRelinquishmentReasonDialog: boolean = false;

  deleteRelinquishmentReasonsDialog: boolean = false;

  relinquishmentreasons: RelinquishmentReason[] = [];

  RelinquishmentReason: RelinquishmentReason = {};

  selectedRelinquishmentReasons: RelinquishmentReason[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly relinquishmentreasonService: RelinquishmentReasonService) {
    this.relinquishmentreasonForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.relinquishmentreasonService.GetAllRelinquishmentReasons('').subscribe(
      (res) => {
        this.relinquishmentreasons = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.relinquishmentreasonForm.reset();
    this.RelinquishmentReason = {};
    this.relinquishmentreasonDialog = true;
  }
  editRelinquishmentReason(RelinquishmentReason: RelinquishmentReason) {
    this.RelinquishmentReason = { ...RelinquishmentReason };
    this.relinquishmentreasonDialog = true;
  }
  deleteSelectedRelinquishmentReason(RelinquishmentReason: RelinquishmentReason) {
    this.RelinquishmentReason = RelinquishmentReason;
    this.deleteRelinquishmentReason();
  }
  deleteRelinquishmentReason() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.RelinquishmentReason.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.relinquishmentreasonService.DeleteRelinquishmentReason(this.RelinquishmentReason.id as string).subscribe(
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
    this.relinquishmentreasonDialog = false;
  }

  saveRelinquishmentReason() {
    if (this.relinquishmentreasonForm.valid) {
      if (this.RelinquishmentReason.id) {
        this.relinquishmentreasonService.UpdateRelinquishmentReason(this.RelinquishmentReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.relinquishmentreasonService.AddRelinquishmentReason(this.RelinquishmentReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.relinquishmentreasonDialog = false;
      this.RelinquishmentReason = {};
    }
  }

  reload() {
    this.relinquishmentreasonService.GetAllRelinquishmentReasons('').subscribe(
      (res) => {
        this.relinquishmentreasons = res;
      }
    )
  }
  get f() {
    return this.relinquishmentreasonForm.controls;
  }
}
