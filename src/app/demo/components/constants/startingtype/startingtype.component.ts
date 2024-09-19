import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { StartingType } from 'src/app/demo/models/constants/startingtype.model';
import { StartingTypeService } from 'src/app/demo/service/constants/startingtype.service';

@Component({
  selector: 'app-startingtype',
  templateUrl: './startingtype.component.html',
  styleUrls: ['./startingtype.component.css']
})
export class StartingTypeComponent implements OnInit {
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
  startingtypeForm: FormGroup;
  name: string = '';
  startingtypeDialog: boolean = false;

  deleteStartingTypeDialog: boolean = false;

  deleteStartingTypesDialog: boolean = false;

  startingtypes: StartingType[] = [];

  StartingType: StartingType = {};

  selectedStartingTypes: StartingType[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly startingtypeService: StartingTypeService) {
    this.startingtypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res;
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
    this.StartingType = {};
    this.startingtypeDialog = true;
  }
  editStartingType(StartingType: StartingType) {
    this.StartingType = { ...StartingType };
    this.startingtypeDialog = true;
  }
  deleteSelectedStartingType(StartingType: StartingType) {
    this.StartingType = StartingType;
    this.deleteStartingType();
  }
  deleteStartingType() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.StartingType.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.startingtypeService.DeleteStartingType(this.StartingType.id as string).subscribe(
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
    this.startingtypeDialog = false;
  }

  saveStartingType() {
    if (this.startingtypeForm.valid) {
      if (this.StartingType.id) {
        this.startingtypeService.UpdateStartingType(this.StartingType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.startingtypeService.AddStartingType(this.StartingType).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.startingtypeDialog = false;
      this.StartingType = {};
    }
  }

  reload() {
    this.startingtypeService.GetAllStartingTypes('').subscribe(
      (res) => {
        this.startingtypes = res;
      }
    )
  }
  get f() {
    return this.startingtypeForm.controls;
  }
}
