import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { University } from 'src/app/demo/models/constants/university.model';
import { UniversityService } from 'src/app/demo/service/constants/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];

  universityForm: FormGroup;

  universityDialog: boolean = false;

  deleteUniversityDialog: boolean = false;

  deleteUniversitysDialog: boolean = false;

  universitys: University[] = [];

  University: University = {};

  selectedUniversitys: University[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly universityService: UniversityService) {
    this.universityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.universityService.GetAllUniversitys('').subscribe(
      (res) => {
        this.universitys = res;
      }
    );

  }
  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.universityForm.reset();
    this.University = {};
    this.universityDialog = true;
  }
  editUniversity(University: University) {
    this.University = { ...University };
    this.universityDialog = true;
  }
  deleteSelectedUniversity(University: University) {
    this.University = University;
    this.deleteUniversity();
  }
  deleteUniversity() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.University.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.universityService.DeleteUniversity(this.University.id as string).subscribe(
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
    this.universityDialog = false;
  }

  saveUniversity() {
    if (this.universityForm.valid) {
      if (this.University.id) {
        this.universityService.UpdateUniversity(this.University).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.universityService.AddUniversity(this.University).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.universityDialog = false;
      this.University = {};
    }
  }

  reload() {
    this.universityService.GetAllUniversitys('').subscribe(
      (res) => {
        this.universitys = res;
      }
    )
  }
  get f() {
    return this.universityForm.controls;
  }
}
