import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Qualification } from 'src/app/demo/models/constants/qualification.model';
import { QualificationService } from 'src/app/demo/service/constants/qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
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
  qualificationForm: FormGroup;
  name: string = '';
  qualificationDialog: boolean = false;

  deleteQualificationDialog: boolean = false;

  deleteQualificationsDialog: boolean = false;

  qualifications: Qualification[] = [];

  Qualification: Qualification = {};

  selectedQualifications: Qualification[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly qualificationService: QualificationService) {
    this.qualificationForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.qualificationService.GetAllQualifications('').subscribe(
      (res) => {
        this.qualifications = res;
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.qualificationForm.reset();
    this.Qualification = {};
    this.qualificationDialog = true;
  }
  editQualification(Qualification: Qualification) {
    this.Qualification = { ...Qualification };
    this.qualificationDialog = true;
  }
  deleteSelectedQualification(Qualification: Qualification) {
    this.Qualification = Qualification;
    this.deleteQualification();
  }
  deleteQualification() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.Qualification.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.qualificationService.DeleteQualification(this.Qualification.id as string).subscribe(
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
    this.qualificationDialog = false;
  }

  saveQualification() {
    if (this.qualificationForm.valid) {
      if (this.Qualification.id) {
        this.qualificationService.UpdateQualification(this.Qualification).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.qualificationService.AddQualification(this.Qualification).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.qualificationDialog = false;
      this.Qualification = {};
    }
  }

  reload() {
    this.qualificationService.GetAllQualifications('').subscribe(
      (res) => {
        this.qualifications = res;
      }
    )
  }
  get f() {
    return this.qualificationForm.controls;
  }
}
