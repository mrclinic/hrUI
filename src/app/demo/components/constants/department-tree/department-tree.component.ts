import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { OrgDepartmentService } from 'src/app/demo/service/constants/org-department.service';
import { DynamicFormComponent } from 'src/app/demo/shared/dynamic-form/dynamic-form/dynamic-form.component';
import { IFormStructure } from 'src/app/demo/shared/dynamic-form/from-structure-model';

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.css']
})
export class DepartmentTreeComponent implements OnInit {
  orgDepartments: any[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';
  treeNodes: any[] = [];
  itemDialog: boolean = false;
  formStructure: IFormStructure[] = [];
  fetched: boolean = false;
  parentId: string;
  itemToEdit: string;

  @ViewChild(DynamicFormComponent) childComponent: DynamicFormComponent;
  constructor(private messageService: MessageService,
    private readonly orgDepartmentService: OrgDepartmentService) {
    this.initFormStructure();
  }

  ngOnInit(): void {
    this.orgDepartmentService.GetOrgDepartmentsInfo('').subscribe(
      (res) => {
        this.orgDepartments = res;
        this.fetched = true;
        this.treeNodes = this.buildTreeArray(this.orgDepartments);
      }

    );
  }

  initFormStructure() {
    this.formStructure = [
      {
        type: 'text',
        label: APP_CONSTANTS.NAME,
        name: 'name',
        value: '',
        validations: [
          {
            name: 'required',
            validator: 'required',
            message: APP_CONSTANTS.FIELD_REQUIRED,
          },
        ],
      }
    ];
  }

  buildTreeArray(flatArray) {

    // Store references to nodes by their IDs
    const nodeMap = {};

    // Store the root nodes of the tree
    const result = [];

    // Create a reference object
    flatArray.forEach(item => {
      nodeMap[item.id] = {
        ...item, children: [],
        key: item?.id,
        label: item?.name,
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
      };
    });

    // Build the tree array
    flatArray.forEach(item => {
      const node = {
        ...nodeMap[item.id], key: item?.id,
        label: item?.name,
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
      };
      if (item.parentId !== null) {
        nodeMap[item.parentId].children.push(node);
      } else {
        result.push(node);
      }
    });
    return result;
  }

  submitEventHandler(eventData) {
    this.itemDialog = true;
    if (!eventData) {
      this.itemDialog = true;
    } else if (eventData?.id) {
      this.parentId = eventData?.parentId;
      this.itemToEdit = eventData?.id;
      this.childComponent.dynamicForm.patchValue({ name: eventData?.name });

    } else this.parentId = eventData;
  }

  deleteEventHandler(eventData) {
    this.orgDepartmentService.DeleteOrgDepartment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.orgDepartmentService.GetOrgDepartmentsInfo('').subscribe(
      (res) => {
        this.orgDepartments = res;
        this.treeNodes = this.buildTreeArray(this.orgDepartments);
      }
    )
  }
  hideDialog() {
    this.itemDialog = false;
  }

  saveItem() {
    this.childComponent.dynamicForm.markAllAsTouched();
    if (this.childComponent.dynamicForm.valid) {
      if (!this.itemToEdit) {
        let itemToSave = { ...this.childComponent.dynamicForm.value, parentId: this.parentId };
        this.orgDepartmentService.AddOrgDepartment(itemToSave).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
            this.itemDialog = false;
            this.reload();
          }
        )
      } else {
        let itemToSave = { ...this.childComponent.dynamicForm.value, parentId: this.parentId, id: this.itemToEdit };
        this.orgDepartmentService.UpdateOrgDepartment(itemToSave).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
            this.itemDialog = false;
            this.reload();
          }
        )
      }
    }
  }
}
