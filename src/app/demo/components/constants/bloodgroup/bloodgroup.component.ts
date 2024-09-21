import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
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
  bloodGroupForm: FormGroup;
  bloodGroupDialog: boolean = false;
  deleteBloodGroupDialog: boolean = false;
  deleteBloodGroupsDialog: boolean = false;
  bloodGroups: BloodGroup[] = [];
  bloodGroup: BloodGroup = {};
  selectedBloodGroups: BloodGroup[] = [];
  selectedBloodGroupId: string;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private readonly bloodGroupService: BloodGroupService) { }

  ngOnInit(): void {

    this.bloodGroupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });

    this.cols = [];
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.bloodGroupService.GetAllBloodGroups('').subscribe(
      (res) => {
        this.bloodGroups = res;
      }
    );
    this.initColumns();
  }

  initColumns() {
    this.cols = [
      { field: 'name', header: "الاسم", type: 'string' }
    ]
  }
  openNew() {
    this.bloodGroupForm.reset();
    this.bloodGroup = {};
    this.selectedBloodGroupId = null;
    this.bloodGroupDialog = true;
  }
  editBloodGroup(bloodGroup: BloodGroup) {
    this.bloodGroup = { ...bloodGroup };
    this.selectedBloodGroupId = this.bloodGroup?.id;
    this.bloodGroupDialog = true;
    this.bloodGroupForm.patchValue({ name: this.bloodGroup.name });
  }
  deleteSelectedBloodGroup(bloodGroup: BloodGroup) {
    this.bloodGroup = bloodGroup;
    this.deleteBloodGroupDialog = true;
  }

  deleteBloodGroup(bloodGroup: BloodGroup) {
    this.deleteBloodGroupDialog = true;
    this.bloodGroup = bloodGroup;
    this.bloodGroupService.DeleteBloodGroup(bloodGroup.id as string).subscribe(
      (data) => {
        this.deleteBloodGroupDialog = false;
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
        this.reload();
      }
    );
  }

  hideDialog() {
    this.bloodGroupDialog = false;
  }
  confirmDelete(bloodGroup) {
    this.deleteBloodGroup(bloodGroup);
  }

  deleteSelectedBloodGroups() {
    this.deleteBloodGroupsDialog = true;
  }
  confirmDeleteSelected() {
    this.deleteBloodGroupsDialog = false;
    let itemIdsToDelete = this.selectedBloodGroups.map((item) => { return item?.id });
  }
  saveBloodGroup() {
    this.bloodGroup = { ...this.bloodGroupForm.value, id: this.selectedBloodGroupId };
    if (this.bloodGroupForm.valid) {
      if (this.bloodGroup.id) {
        this.bloodGroupService.UpdateBloodGroup(this.bloodGroup).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.bloodGroup.id;
        this.bloodGroupService.AddBloodGroup(this.bloodGroup).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
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
