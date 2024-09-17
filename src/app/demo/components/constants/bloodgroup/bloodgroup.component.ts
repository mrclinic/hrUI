import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BloodGroup } from 'src/app/demo/models/constants/bloodgroup.model';
import { BloodGroupService } from 'src/app/demo/service/constants/bloodgroup.service';
import { BloodGroupActions } from 'src/app/demo/stateManagement/constants/actions/bloodgroup.action';

@Component({
  selector: 'app-bloodgroup',
  templateUrl: './bloodgroup.component.html',
  styleUrls: ['./bloodgroup.component.css']
})
export class BloodGroupComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  bloodGroups: BloodGroup[] = [];
  cols: any[];
  bloodgroupDialog: boolean;
  bloodGroup!: BloodGroup;
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
  bloodgroupForm: FormGroup;
  name: string = '';
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly bloodGroupService: BloodGroupService) {
    this.bloodgroupForm = fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
    this.bloodgroupDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.bloodGroupService.GetAllBloodGroups('').subscribe(
      (res) => {
        this.bloodGroups = res;
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
      { field: 'name', header: this.name, type: 'string' }
    ]
  }
  openNew() {
    this.bloodGroup = {};
    this.submitted = false;
    this.bloodgroupDialog = true;
  }
  editBloodGroup(bloodGroup: BloodGroup) {
    this.bloodGroup = { ...bloodGroup };
    this.bloodgroupDialog = true;
  }
  deleteSelectedBloodGroup(bloodGroup: BloodGroup) {
    this.bloodGroup = bloodGroup;
    this.deleteBloodGroup();
  }
  deleteBloodGroup() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.bloodGroup.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new BloodGroupActions.DeleteBloodGroup(this.bloodGroup.id as string)).subscribe(
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
    this.bloodgroupDialog = false;
    this.submitted = false;
  }

  saveBloodGroup() {
    this.submitted = true;
    if (this.bloodgroupForm.valid) {
      if (this.bloodGroup.id) {
        this.store.dispatch(new BloodGroupActions.UpdateBloodGroup(this.bloodGroup)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.store.dispatch(new BloodGroupActions.AddBloodGroup(this.bloodGroup)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.bloodgroupDialog = false;
      this.bloodGroup = {};
    }
  }

  reload() {
    this.bloodGroupService.GetAllBloodGroups('').subscribe(
      (res) => {
        this.bloodGroups = res;
      }
    )
  }



  get f() {
    return this.bloodgroupForm.controls;
  }
}
