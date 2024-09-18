import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BloodGroup } from 'src/app/demo/models/constants/bloodgroup.model';
import { BloodGroupService } from 'src/app/demo/service/constants/bloodgroup.service';

@Component({
  selector: 'app-bloodgroup',
  templateUrl: './bloodgroup.component.html',
  styleUrls: ['./bloodgroup.component.css']
})
export class BloodGroupComponent implements OnInit {
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
  bloodGroupForm: FormGroup;
  name: string = '';
  bloodGroupDialog: boolean = false;

  deleteBloodGroupDialog: boolean = false;

  deleteBloodGroupsDialog: boolean = false;

  bloodGroups: BloodGroup[] = [];

  bloodGroup: BloodGroup = {};

  selectedBloodGroups: BloodGroup[] = [];
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService, private readonly bloodGroupService: BloodGroupService) {
    this.bloodGroupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });
    this.cols = [];
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
    this.bloodGroup = {};
    this.bloodGroupDialog = true;
  }
  editBloodGroup(bloodGroup: BloodGroup) {
    this.bloodGroup = { ...bloodGroup };
    this.bloodGroupDialog = true;
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
        this.bloodGroupService.DeleteBloodGroup(this.bloodGroup.id as string).subscribe(
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
    this.bloodGroupDialog = false;
  }

  saveBloodGroup() {
    if (this.bloodGroupForm.valid) {
      if (this.bloodGroup.id) {
        this.bloodGroupService.UpdateBloodGroup(this.bloodGroup).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.bloodGroupService.AddBloodGroup(this.bloodGroup).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.bloodGroupDialog = false;
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
    return this.bloodGroupForm.controls;
  }
}
