import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { PromotionPercentage } from 'src/app/models/hr/promotionpercentage.model';
import { University } from 'src/app/models/hr/University';
import { PromotionPercentageActions } from 'src/app/stateManagement/hr/actions/PromotionPercentage.action';
import { UniversityActions } from 'src/app/stateManagement/hr/actions/university.action';

@Component({
  selector: 'app-promotionpercentage',
  templateUrl: './promotionpercentage.component.html',
  styleUrls: ['./promotionpercentage.component.css']
})
export class PromotionPercentageComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  promotionpercentages: PromotionPercentage[] = [];
  cols: any[];
  promotionpercentageDialog: boolean;
  PromotionPercentage!: PromotionPercentage;
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
  promotionpercentageForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.promotionpercentageForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.promotionpercentageDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new PromotionPercentageActions.GetPromotionPercentagesInfo('')).subscribe(
      () => {
        this.promotionpercentages = this.store.selectSnapshot<PromotionPercentage[]>((state) => state.users.promotionpercentages);
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
    this.PromotionPercentage = {};
    this.submitted = false;
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
      message: this.ConfirmMsg + this.PromotionPercentage.Place + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new PromotionPercentageActions.DeletePromotionPercentage(this.PromotionPercentage.Id as string)).subscribe(
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
    this.promotionpercentageDialog = false;
    this.submitted = false;
  }

  savePromotionPercentage() {
    this.submitted = true;
    if (this.promotionpercentageForm.valid) {
      if (this.PromotionPercentage.Id) {
        delete this.PromotionPercentage.Request;
        this.store.dispatch(new PromotionPercentageActions.UpdatePromotionPercentage(this.PromotionPercentage)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.PromotionPercentage.Id;
        this.store.dispatch(new PromotionPercentageActions.AddPromotionPercentage(this.PromotionPercentage)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.promotionpercentageDialog = false;
      this.PromotionPercentage = {};
    }
  }

  reload() {
    this.store.dispatch(new PromotionPercentageActions.GetPromotionPercentagesInfo('')).subscribe(
      () => {
        this.promotionpercentages = this.store.selectSnapshot<PromotionPercentage[]>((state) => state.users.promotionpercentages);
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
    this.PromotionPercentage.RequestId = this.RequestId;
  }

  get f() {
    return this.promotionpercentageForm.controls;
  }
}
