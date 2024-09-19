import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Nationality } from 'src/app/demo/models/constants/nationality.model';
import { NationalityService } from 'src/app/demo/service/constants/nationality.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {
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
  nationalityForm: FormGroup;
  name: string = '';
  nationalityDialog: boolean = false;

  deleteNationalityDialog: boolean = false;

  deleteNationalitysDialog: boolean = false;

  nationalitys: Nationality[] = [];

  Nationality: Nationality = {};

  selectedNationalitys: Nationality[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly nationalityService: NationalityService) {
    this.nationalityForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.nationalityService.GetAllNationalitys('').subscribe(
      (res) => {
        this.nationalitys = res;
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
    this.Nationality = {};
    this.nationalityDialog = true;
  }
  editNationality(Nationality: Nationality) {
    this.Nationality = { ...Nationality };
    this.nationalityDialog = true;
  }
  deleteSelectedNationality(Nationality: Nationality) {
    this.Nationality = Nationality;
    this.deleteNationality();
  }
  deleteNationality() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.Nationality.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nationalityService.DeleteNationality(this.Nationality.id as string).subscribe(
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
    this.nationalityDialog = false;
  }

  saveNationality() {
    if (this.nationalityForm.valid) {
      if (this.Nationality.id) {
        this.nationalityService.UpdateNationality(this.Nationality).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.nationalityService.AddNationality(this.Nationality).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.nationalityDialog = false;
      this.Nationality = {};
    }
  }

  reload() {
    this.nationalityService.GetAllNationalitys('').subscribe(
      (res) => {
        this.nationalitys = res;
      }
    )
  }
  get f() {
    return this.nationalityForm.controls;
  }
}
