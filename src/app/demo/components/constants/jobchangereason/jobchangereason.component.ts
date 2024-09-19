import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { forkJoin, Observable } from 'rxjs';
import { JobChangeReason } from 'src/app/demo/models/constants/jobchangereason.model';
import { JobChangeReasonService } from 'src/app/demo/service/constants/jobchangereason.service';
import { ModificationContractTypeService } from 'src/app/demo/service/constants/modificationcontracttype.service';

@Component({
  selector: 'app-jobchangereason',
  templateUrl: './jobchangereason.component.html',
  styleUrls: ['./jobchangereason.component.css']
})
export class JobChangeReasonComponent implements OnInit {
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
  jobchangereasonForm: FormGroup;
  name: string = '';
  jobchangereasonDialog: boolean = false;

  deleteJobChangeReasonDialog: boolean = false;

  deleteJobChangeReasonsDialog: boolean = false;

  jobchangereasons: JobChangeReason[] = [];

  JobChangeReason: JobChangeReason = {};

  selectedJobChangeReasons: JobChangeReason[] = [];
  items: any[] | undefined;
  filteredItems: any[] | undefined;

  constructor(private fb: FormBuilder, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService,
    private readonly jobchangereasonService: JobChangeReasonService
    , private readonly modificationcontracttypeService: ModificationContractTypeService) {
    this.jobchangereasonForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      modificationcontracttypeid: new FormControl('', [Validators.required]),

    });
    this.cols = [];
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
      }
    );
    forkJoin([this.jobchangereasonService.GetAllJobChangeReasons(''), this.modificationcontracttypeService.GetAllModificationContractTypes('')])
      .subscribe(([jobchangereasons, items]) => {
        this.jobchangereasons = jobchangereasons;
        this.items = items;
      });

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
      { field: 'name', header: "الاسم", type: 'string' },
      { field: 'modificationcontracttypeid', header: "نوع صك التعيين" }
    ]
  }
  openNew() {
    this.JobChangeReason = {};
    this.jobchangereasonDialog = true;
  }
  editJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = { ...JobChangeReason };
    this.jobchangereasonDialog = true;
  }
  deleteSelectedJobChangeReason(JobChangeReason: JobChangeReason) {
    this.JobChangeReason = JobChangeReason;
    this.deleteJobChangeReason();
  }
  deleteJobChangeReason() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.JobChangeReason.name + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobchangereasonService.DeleteJobChangeReason(this.JobChangeReason.id as string).subscribe(
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
    this.jobchangereasonDialog = false;
  }

  saveJobChangeReason() {
    if (this.jobchangereasonForm.valid) {
      if (this.JobChangeReason.id) {
        this.jobchangereasonService.UpdateJobChangeReason(this.JobChangeReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        this.jobchangereasonService.AddJobChangeReason(this.JobChangeReason).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.jobchangereasonDialog = false;
      this.JobChangeReason = {};
    }
  }

  reload() {
    this.jobchangereasonService.GetAllJobChangeReasons('').subscribe(
      (res) => {
        this.jobchangereasons = res;
      }
    )
  }
  get f() {
    return this.jobchangereasonForm.controls;
  }

  filterItems(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[])?.length; i++) {
      let country = (this.items as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredItems = filtered;
  }
}
