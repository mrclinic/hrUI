import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/demo/models/constants/gender.model';
import { GenderService } from 'src/app/demo/service/constants/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
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
  genderForm: FormGroup;
  name: string = '';
  genderDialog: boolean = false;

  deleteGenderDialog: boolean = false;

  deleteGendersDialog: boolean = false;

  genders: Gender[] = [];

  Gender: Gender = {};

  selectedGenders: Gender[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly genderService: GenderService) {
    this.genderForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.genderService.GetAllGenders('').subscribe(
      (res) => {
        this.genders = res;
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
    this.Gender = {};
    this.genderDialog = true;
  }
  editGender(Gender: Gender) {
    this.Gender = { ...Gender };
    this.genderDialog = true;
  }
  deleteSelectedGender(Gender: Gender) {
    this.Gender = Gender;
    this.deleteGender();
  }
  deleteGender() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Gender.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.genderService.DeleteGender(this.Gender.id as string).subscribe(
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
    this.genderDialog = false;
  }

  saveGender() {
    if (this.genderForm.valid) {
      if (this.Gender.id) {
        this.genderService.UpdateGender(this.Gender).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.genderService.AddGender(this.Gender).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.genderDialog = false;
      this.Gender = {};
    }
  }

  reload() {
    this.genderService.GetAllGenders('').subscribe(
      (res) => {
        this.genders = res;
      }
    )
  }
  get f() {
    return this.genderForm.controls;
  }
}
