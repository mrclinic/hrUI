import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { APP_CONSTANTS } from 'src/app/app.contants';

@Component({
  selector: 'app-custom-tree',
  templateUrl: './custom-tree.component.html',
  styleUrl: './custom-tree.component.scss'
})
export class CustomTreeComponent implements OnInit {
  @Input() treeItems: TreeNode[] = [];
  selectedITem!: TreeNode | null;
  menuItems: MenuItem[] = [];
  @Input() canAdd: string = '';
  @Input() canEdit: string = '';
  @Input() canSingleDelete: string = '';

  constructor() { }

  ngOnInit(): void {
    this.initMenuItems();
  }

  initMenuItems() {
    this.menuItems = [
      { label: APP_CONSTANTS.ADD_NAME, icon: 'pi pi-plus', command: (event) => this.addItem(this.selectedITem) },
      { label: APP_CONSTANTS.EDIT_NAME, icon: 'pi pi-pen-to-square', command: (event) => this.editITem(this.selectedITem) },
      { label: APP_CONSTANTS.DELETE_NAME, icon: 'pi pi-trash', command: (event) => this.deleteITem(this.selectedITem) }
    ];
  }

  deleteITem(selectedITem: any) {
    console.log(selectedITem);
  }

  editITem(selectedITem: any) {
    console.log(selectedITem);
  }

  addItem(selectedITem: any) {
    if (selectedITem?.leaf) return;
    console.log(selectedITem);
  }


}
