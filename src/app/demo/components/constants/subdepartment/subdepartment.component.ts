import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SubDepartment } from 'src/app/demo/models/constants/subdepartment.model';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';

@Component({
  selector: 'app-subdepartment',
  templateUrl: './subdepartment.component.html',
  styleUrls: ['./subdepartment.component.css']
})
export class SubDepartmentComponent implements OnInit {
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
  subdepartmentForm: FormGroup;
  name: string = '';
  subdepartmentDialog: boolean = false;

  deleteSubDepartmentDialog: boolean = false;

  deleteSubDepartmentsDialog: boolean = false;

  subdepartments: SubDepartment[] = [];

  SubDepartment: SubDepartment = {};

  selectedSubDepartments: SubDepartment[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly subdepartmentService: SubDepartmentService) {
    this.subdepartmentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res;
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
    this.SubDepartment = {};
    this.subdepartmentDialog = true;
  }
  editSubDepartment(SubDepartment: SubDepartment) {
    this.SubDepartment = { ...SubDepartment };
    this.subdepartmentDialog = true;
  }
  deleteSelectedSubDepartment(SubDepartment: SubDepartment) {
    this.SubDepartment = SubDepartment;
    this.deleteSubDepartment();
  }
  deleteSubDepartment() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.SubDepartment.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subdepartmentService.DeleteSubDepartment(this.SubDepartment.id as string).subscribe(
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
    this.subdepartmentDialog = false;
  }

  saveSubDepartment() {
    if (this.subdepartmentForm.valid) {
      if (this.SubDepartment.id) {
        this.subdepartmentService.UpdateSubDepartment(this.SubDepartment).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.subdepartmentService.AddSubDepartment(this.SubDepartment).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.subdepartmentDialog = false;
      this.SubDepartment = {};
    }
  }

  reload() {
    this.subdepartmentService.GetAllSubDepartments('').subscribe(
      (res) => {
        this.subdepartments = res;
      }
    )
  }
  get f() {
    return this.subdepartmentForm.controls;
  }
}
