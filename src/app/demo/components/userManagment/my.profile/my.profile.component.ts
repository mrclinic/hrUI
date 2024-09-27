import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { helper } from 'src/app/demo/helper/helper';
import { User } from 'src/app/demo/models/userManagment/User';
import { UserProfile } from 'src/app/demo/models/userManagment/UserProfile';
import { UserActions } from 'src/app/demo/stateManagement/userManagment/actions/user.action';
import { UserProfileActions } from 'src/app/demo/stateManagement/userManagment/actions/user.profile.action';

@Component({
  selector: 'app-myProfile',
  templateUrl: './my.profile.component.html',
  styleUrls: ['./my.profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myProfileForm: FormGroup;
  isLoading$!: Observable<boolean>;
  userProfiles: UserProfile[] = [];
  cols: any[];
  userProfileDialog: boolean;
  userProfile!: UserProfile;
  submitted: boolean;
  fatherName: string = '';
  motherName: string = '';
  birthPlace: string = '';
  birthDate: string = '';
  gender: string = '';
  address: string = '';
  cardNumber: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  userId: string = '';
  filter: string = '';
  sexTypes: any[] = [];
  isGenderReq: boolean = true;
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.myProfileForm = this.fb.group({
      fatherName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      motherName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      birthPlace: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
    this.cols = [];
    this.userProfileDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.sexTypes = helper.sexTypes;
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    let user = JSON.parse(localStorage.getItem('users.loggedUser') || '') as User;
    this.userId = user.id || '';
    this.filter = `Filters=userId==${this.userId}`;
    this.store.dispatch(new UserProfileActions.GetMyUserProfiles(this.filter)).subscribe(
      () => {
        this.userProfiles = this.store.selectSnapshot<UserProfile[]>((state) => state.users.userProfiles);
        this.initColumns();
      }
    );
  }
  initColumns() {
    this.cols = [
      { field: 'fatherName', header: this.fatherName },
      { field: 'motherName', header: this.motherName },
      { field: 'birthPlace', header: this.birthPlace },
      { field: 'birthDate', header: this.birthDate },
      { field: 'gender', header: this.gender },
      { field: 'cardNumber', header: this.cardNumber },
      { field: 'address', header: this.address }
    ]
  }
  openNew() {
    this.userProfile = {};
    this.submitted = false;
    this.userProfileDialog = true;
  }
  editUserProfile(userProfile: UserProfile) {
    this.userProfile = { ...userProfile };
    let date = this.datePipe.transform(userProfile?.birthDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    this.userProfile.birthDate = new Date(date != null ? date : "");
    this.userProfileDialog = true;
  }
  deleteSelectedUserProfile(userProfile: UserProfile) {
    this.userProfile = userProfile;
    this.deleteUserProfile();
  }
  deleteUserProfile() {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف' + this.userProfile.fatherName + '?',
      header: 'تأكيد',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new UserProfileActions.DeleteUserProfile(this.userProfile.id as string)).subscribe(
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
    this.userProfileDialog = false;
    this.submitted = false;
  }

  saveUserProfile() {
    this.submitted = true;
    if (this.myProfileForm.valid) {
      if (this.userProfile.id) {
        this.store.dispatch(new UserProfileActions.UpdateUserProfile(this.userProfile)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية التعديل بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.userProfile.id;
        this.store.dispatch(new UserProfileActions.AddUserProfile(this.userProfile)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تمت عملية الإضافة بنجاح', life: 3000 });
            this.reload();
          }
        )
      }
      this.userProfileDialog = false;
      this.userProfile = {};
    }
  }

  reload() {
    this.store.dispatch(new UserProfileActions.GetMyUserProfiles(this.filter)).subscribe(
      () => {
        this.userProfiles = this.store.selectSnapshot<UserProfile[]>((state) => state.users.userProfiles);
        this.store.dispatch(new UserActions.getUserInfo(this.userId || ''));
      }
    )
  }
  onClear() {
    delete this.userProfile.gender;
  }

  get f() {
    return this.myProfileForm.controls;
  }
}
