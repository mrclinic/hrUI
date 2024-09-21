import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { PromotionPercentage } from 'src/app/demo/models/constants/promotionpercentage.model';
import { PromotionPercentageService } from 'src/app/demo/service/constants/promotionpercentage.service';

@Component({
  selector: 'app-promotionpercentage',
  templateUrl: './promotionpercentage.component.html',
  styleUrls: ['./promotionpercentage.component.css']
})
export class PromotionPercentageComponent implements OnInit {
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
  promotionpercentageForm: FormGroup;
  name: string = '';
  promotionpercentageDialog: boolean = false;

  deletePromotionPercentageDialog: boolean = false;

  deletePromotionPercentagesDialog: boolean = false;

  promotionpercentages: PromotionPercentage[] = [];

  PromotionPercentage: PromotionPercentage = {};

  selectedPromotionPercentages: PromotionPercentage[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly promotionpercentageService: PromotionPercentageService) {
    this.promotionpercentageForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.promotionpercentageService.GetAllPromotionPercentages('').subscribe(
      (res) => {
        this.promotionpercentages = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.promotionpercentageForm.reset();
    this.PromotionPercentage = {};
    this.promotionpercentageDialog = true;
  }
  editPromotionPercentage(PromotionPercentage: PromotionPercentage) {
    this.PromotionPercentage = { ...PromotionPercentage };
    this.promotionpercentageDialog = true;
  }
  deleteSelectedPromotionPercentage(PromotionPercentage: PromotionPercentage) {
    this.PromotionPercentage = PromotionPercentage;
    this.deletePromotionPercentage();
  }
  deletePromotionPercentage() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.PromotionPercentage.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.promotionpercentageService.DeletePromotionPercentage(this.PromotionPercentage.id as string).subscribe(
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
    this.promotionpercentageDialog = false;
  }

  savePromotionPercentage() {
    if (this.promotionpercentageForm.valid) {
      if (this.PromotionPercentage.id) {
        this.promotionpercentageService.UpdatePromotionPercentage(this.PromotionPercentage).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.promotionpercentageService.AddPromotionPercentage(this.PromotionPercentage).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.promotionpercentageDialog = false;
      this.PromotionPercentage = {};
    }
  }

  reload() {
    this.promotionpercentageService.GetAllPromotionPercentages('').subscribe(
      (res) => {
        this.promotionpercentages = res;
      }
    )
  }
  get f() {
    return this.promotionpercentageForm.controls;
  }
}
