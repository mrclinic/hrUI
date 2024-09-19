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
  CancelReason: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  universityForm: FormGroup;
  name: string = '';
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
      message: this.ConfirmMsg + this.University.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.universityService.DeleteUniversity(this.University.id as string).subscribe(
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
    this.universityDialog = false;
  }

  saveUniversity() {
    if (this.universityForm.valid) {
      if (this.University.id) {
        this.universityService.UpdateUniversity(this.University).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.universityService.AddUniversity(this.University).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
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
