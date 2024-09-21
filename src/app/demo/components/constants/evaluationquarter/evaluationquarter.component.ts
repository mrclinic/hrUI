import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EvaluationQuarter } from 'src/app/demo/models/constants/evaluationquarter.model';
import { EvaluationQuarterService } from 'src/app/demo/service/constants/evaluationquarter.service';

@Component({
  selector: 'app-evaluationquarter',
  templateUrl: './evaluationquarter.component.html',
  styleUrls: ['./evaluationquarter.component.css']
})
export class EvaluationQuarterComponent implements OnInit {
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
  evaluationquarterForm: FormGroup;
  name: string = '';
  evaluationquarterDialog: boolean = false;

  deleteEvaluationQuarterDialog: boolean = false;

  deleteEvaluationQuartersDialog: boolean = false;

  evaluationquarters: EvaluationQuarter[] = [];

  EvaluationQuarter: EvaluationQuarter = {};

  selectedEvaluationQuarters: EvaluationQuarter[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly evaluationquarterService: EvaluationQuarterService) {
    this.evaluationquarterForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.evaluationquarterService.GetAllEvaluationQuarters('').subscribe(
      (res) => {
        this.evaluationquarters = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.evaluationquarterForm.reset();
    this.EvaluationQuarter = {};
    this.evaluationquarterDialog = true;
  }
  editEvaluationQuarter(EvaluationQuarter: EvaluationQuarter) {
    this.EvaluationQuarter = { ...EvaluationQuarter };
    this.evaluationquarterDialog = true;
  }
  deleteSelectedEvaluationQuarter(EvaluationQuarter: EvaluationQuarter) {
    this.EvaluationQuarter = EvaluationQuarter;
    this.deleteEvaluationQuarter();
  }
  deleteEvaluationQuarter() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.EvaluationQuarter.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evaluationquarterService.DeleteEvaluationQuarter(this.EvaluationQuarter.id as string).subscribe(
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
    this.evaluationquarterDialog = false;
  }

  saveEvaluationQuarter() {
    if (this.evaluationquarterForm.valid) {
      if (this.EvaluationQuarter.id) {
        this.evaluationquarterService.UpdateEvaluationQuarter(this.EvaluationQuarter).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.evaluationquarterService.AddEvaluationQuarter(this.EvaluationQuarter).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.evaluationquarterDialog = false;
      this.EvaluationQuarter = {};
    }
  }

  reload() {
    this.evaluationquarterService.GetAllEvaluationQuarters('').subscribe(
      (res) => {
        this.evaluationquarters = res;
      }
    )
  }
  get f() {
    return this.evaluationquarterForm.controls;
  }
}
