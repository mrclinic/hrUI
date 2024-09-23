import { NgModule } from "@angular/core";
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { PrimengModule } from "src/primeng/primeng.module";
import { PermissionListComponent } from "../dialogs/permissions.dialog/permissions.dialog";
import { CommonModule } from "@angular/common";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form/dynamic-form.component";

@NgModule({
  declarations: [
    CustomTableComponent, PermissionListComponent, DynamicFormComponent
  ],
  exports: [
    CustomTableComponent, PermissionListComponent, DynamicFormComponent
  ],
  imports: [
    PrimengModule, CommonModule
  ]
})
export class SharedModule { }
