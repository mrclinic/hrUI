import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Observable } from 'rxjs';
import { Branch } from 'src/app/demo/models/constants/branch.model';
import { BranchService } from 'src/app/demo/service/constants/branch.service';
import { DepartmentService } from 'src/app/demo/service/constants/department.service';
import { SubDepartmentService } from 'src/app/demo/service/constants/subdepartment.service';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  cols: any[];
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  branchForm: FormGroup;
  branchDialog: boolean = false;

  deleteBranchDialog: boolean = false;

  deleteBranchsDialog: boolean = false;

  branchs: Branch[] = [];

  Branch: Branch = {};

  selectedBranchs: Branch[] = [];

  items: any[] | undefined;
  filteredItems: any[] | undefined;

  subItems: any[] | undefined;
  filteredSubItems: any[] | undefined;
  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private readonly branchService: BranchService,
    private readonly departmentService: DepartmentService, private readonly subDepartmentService: SubDepartmentService) {
    this.branchForm = this.fb.group({
      departmentid: new FormControl('', [Validators.required]),
      subdepartmentid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.cols = [];
    this.branchDialog = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    forkJoin([this.branchService.GetAllBranchs(''), this.departmentService.GetAllDepartments(''), this.subDepartmentService.GetAllSubDepartments('')])
      .subscribe(([branches, items, subItems]) => {
        this.branchs = branches;
        this.items = items;
        this.subItems = subItems;
      });
  }
  initColumns() {
    this.cols = [
      { field: 'name', header: 'الاسم' },
      { field: 'departmentid', header: 'الجهة المصدرة' },
      { field: 'subdepartmentid', header: 'الفرعية الفعالية' }
    ]
  }
  openNew() {
    this.branchForm.reset();
    this.Branch = {};
    this.branchDialog = true;
  }
  editBranch(Branch: Branch) {
    this.Branch = { ...Branch };
    this.branchDialog = true;
    this.branchForm.patchValue({
      name: this.Branch?.name, departmentid: this.Branch?.departmentid
      , subdepartmentid: this.Branch?.subdepartmentid
    });

  }
  deleteSelectedBranch(Branch: Branch) {
    this.Branch = Branch;
    this.deleteBranch();
  }
  deleteBranch() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.Branch.name + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.branchService.DeleteBranch(this.Branch.id as string).subscribe(
          data => {
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
    this.branchDialog = false;
  }

  saveBranch() {
    if (this.branchForm.valid) {
      if (this.Branch.id) {
        this.branchService.UpdateBranch(this.Branch).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.Branch.id;
        this.branchService.AddBranch(this.Branch).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.branchDialog = false;
      this.Branch = {};
    }
  }

  reload() {
    this.branchService.GetAllBranchs('').subscribe(
      (res) => {
        this.branchs = res;
      }
    )
  }
  get f() {
    return this.branchForm.controls;
  }

  filterItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[])?.length; i++) {
      let item = (this.items as any[])[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }

  filterSubItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.subItems as any[])?.length; i++) {
      let item = (this.subItems as any[])[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.filteredItems = filtered;
  }
}
