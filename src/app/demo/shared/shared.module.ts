import { NgModule } from "@angular/core";
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { PrimengModule } from "src/primeng/primeng.module";
import { PermissionListComponent } from "../dialogs/permissions.dialog/permissions.dialog";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    CustomTableComponent, PermissionListComponent
  ],
  exports: [
    CustomTableComponent, PermissionListComponent
  ],
  imports: [
    PrimengModule, CommonModule
  ]
})
export class SharedModule { }
