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
  cols: any[] = [];
  bloodGroupForm: FormGroup;
  bloodGroups: BloodGroup[] = [];

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private readonly bloodGroupService: BloodGroupService) { }

  ngOnInit(): void {

    this.bloodGroupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),

    });

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
      { dataKey: 'name', header: "الاسم", type: 'string' }
    ]
  }
  submitEventHandler(eventData) {
    if (eventData.id) {
      this.bloodGroupService.UpdateBloodGroup(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
          this.reload();
        }
      )
    }
    else {
      delete eventData.id;
      this.bloodGroupService.AddBloodGroup(eventData).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
          this.reload();
        }
      )
    }
  }
  deleteEventHandler(eventData) {
    this.bloodGroupService.DeleteBloodGroup(eventData as string).subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الحذف بنجاح', life: 3000 });
        this.reload();
      }
    );
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
