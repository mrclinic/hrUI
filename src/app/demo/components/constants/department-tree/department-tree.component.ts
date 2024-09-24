import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';
import { DepartmentService } from 'src/app/demo/service/constants/department.service';

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.css']
})
export class DepartmentTreeComponent implements OnInit {
  departments: any[] = [];
  canAdd: string = '';
  canEdit: string = '';
  canSingleDelete: string = '';

  constructor(private messageService: MessageService,
    private readonly departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.departmentService.GetDepartmentsInfo('').subscribe(
      (res) => {
        this.departments = res.map((item) => {
          return Object.assign(item, {
            key: item?.id,
            label: item?.name,
            data: 'Documents Folder',
            icon: 'pi pi-fw pi-inbox',
            leaf: false,
            children: item?.subDepartments.map((child) => {
              return Object.assign(child, {
                key: child?.id,
                label: child?.name,
                data: 'Documents Folder',
                icon: 'pi pi-fw pi-inbox',
                leaf: true
              })
            })
          });
        })
      }
    );
  }

  submitEventHandler(eventData) {
    if (eventData.id) {
      this.departmentService.UpdateDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.EDIT_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.departmentService.AddDepartment(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.ADD_SUCCESS, life: 3000 });
          this.reload();
        }
      )
    }
  }

  deleteEventHandler(eventData) {
    this.departmentService.DeleteDepartment(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: APP_CONSTANTS.SUCCESS, detail: APP_CONSTANTS.DELETE_SUCCESS, life: 3000 });
        this.reload();
      }
    );
  }

  reload() {
    this.departmentService.GetDepartmentsInfo('').subscribe(
      (res) => {
        this.departments = res;
      }
    )
  }
}
