import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { RewardType } from 'src/app/demo/models/constants/rewardtype.model';
import { RewardTypeService } from 'src/app/demo/service/constants/rewardtype.service';

@Component({
  selector: 'app-rewardtype',
  templateUrl: './rewardtype.component.html',
  styleUrls: ['./rewardtype.component.css']
})
export class RewardTypeComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  rewardtypeForm: FormGroup;

  rewardtypeDialog: boolean = false;

  deleteRewardTypeDialog: boolean = false;

  deleteRewardTypesDialog: boolean = false;

  rewardtypes: RewardType[] = [];

  RewardType: RewardType = {};

  selectedRewardTypes: RewardType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly rewardtypeService: RewardTypeService) {
    this.rewardtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.rewardtypeService.GetAllRewardTypes('').subscribe(
      (res) => {
        this.rewardtypes = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.rewardtypeForm.reset();
    this.RewardType = {};
    this.rewardtypeDialog = true;
  }
  editRewardType(RewardType: RewardType) {
    this.RewardType = { ...RewardType };
    this.rewardtypeDialog = true;
  }
  deleteSelectedRewardType(RewardType: RewardType) {
    this.RewardType = RewardType;
    this.deleteRewardType();
  }
  deleteRewardType() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.RewardType.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rewardtypeService.DeleteRewardType(this.RewardType.id as string).subscribe(
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
    this.rewardtypeDialog = false;
  }

  saveRewardType() {
    if (this.rewardtypeForm.valid) {
      if (this.RewardType.id) {
        this.rewardtypeService.UpdateRewardType(this.RewardType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.rewardtypeService.AddRewardType(this.RewardType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.rewardtypeDialog = false;
      this.RewardType = {};
    }
  }

  reload() {
    this.rewardtypeService.GetAllRewardTypes('').subscribe(
      (res) => {
        this.rewardtypes = res;
      }
    )
  }
  get f() {
    return this.rewardtypeForm.controls;
  }
}
