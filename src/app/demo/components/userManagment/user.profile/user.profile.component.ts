import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { helper } from 'src/app/demo/helper/helper';
import { UserProfile } from 'src/app/demo/models/userManagment/UserProfile';
import { UserProfileActions } from 'src/app/demo/stateManagement/userManagment/actions/user.profile.action';




@Component({
  selector: 'app-userProfile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  userProfiles: UserProfile[] = [];
  cols: any[];
  userProfileDialog: boolean;
  userProfile!: UserProfile;
  submitted: boolean;
  FatherName: string = '';
  MotherName: string = '';
  BirthPlace: string = '';
  BirthDate: string = '';
  Gender: string = '';
  Address: string = '';
  CardNumber: string = '';
  UserId: string = '';
  ConfirmTitle: string = '';
  ConfirmMsg: string = '';
  Success: string = '';
  deleteSuccess: string = '';
  Yes: string = '';
  No: string = '';
  editSuccess: string = '';
  addSuccess: string = '';
  sexTypes: any[] = [];
  isGenderReq: boolean = true;
  constructor(private datePipe: DatePipe, private store: Store, private messageService: MessageService,
    private confirmationService: ConfirmationService, private translate: TranslateService) {
    this.cols = [];
    this.userProfileDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.sexTypes = helper.sexTypes;
    this.isLoading$ = this.store.select<boolean>(
      (state) => state.users.isLoading
    );
    this.store.dispatch(new UserProfileActions.GetAllUserProfiles('')).subscribe(
      () => {
        this.userProfiles = this.store.selectSnapshot<UserProfile[]>((state) => state.users.userProfiles);
      }
    );
    this.translate.get('AppTitle').subscribe(
      data => {
        this.FatherName = this.translate.instant('FatherName');;
        this.MotherName = this.translate.instant('MotherName');
        this.BirthPlace = this.translate.instant('BirthPlace');
        this.BirthDate = this.translate.instant('BirthDate');
        this.Gender = this.translate.instant('Gender');
        this.CardNumber = this.translate.instant('CardNumber');
        this.Address = this.translate.instant('Address');
        this.UserId = this.translate.instant('UserId');
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
      { field: 'FatherName', header: this.FatherName },
      { field: 'MotherName', header: this.MotherName },
      { field: 'BirthPlace', header: this.BirthPlace },
      { field: 'BirthDate', header: this.BirthDate },
      { field: 'Gender', header: this.Gender },
      { field: 'CardNumber', header: this.CardNumber },
      { field: 'Address', header: this.Address },
      { field: 'UserId', header: this.UserId }
    ]
  }
  openNew() {
    this.userProfile = {};
    this.submitted = false;
    this.userProfileDialog = true;
  }
  editUserProfile(userProfile: UserProfile) {
    this.userProfile = { ...userProfile };
    let date = this.datePipe.transform(userProfile?.BirthDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    this.userProfile.BirthDate = new Date(date != null ? date : "");
    this.userProfileDialog = true;
  }
  deleteSelectedUserProfile(userProfile: UserProfile) {
    this.userProfile = userProfile;
    this.deleteUserProfile();
  }
  deleteUserProfile() {
    this.confirmationService.confirm({
      message: this.ConfirmMsg + this.userProfile.FatherName + '?',
      header: this.ConfirmTitle,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(new UserProfileActions.DeleteUserProfile(this.userProfile.Id as string)).subscribe(
          () => {
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
    this.userProfileDialog = false;
    this.submitted = false;
  }

  saveUserProfile() {
    this.submitted = true;
    if (this.userProfile.FatherName?.trim()) {
      if (this.userProfile.Id) {
        this.store.dispatch(new UserProfileActions.UpdateUserProfile(this.userProfile)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.editSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      else {
        delete this.userProfile.Id;
        this.store.dispatch(new UserProfileActions.AddUserProfile(this.userProfile)).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: this.Success, detail: this.addSuccess, life: 3000 });
            this.reload();
          }
        )
      }
      this.userProfileDialog = false;
      this.userProfile = {};
    }
  }

  reload() {
    this.store.dispatch(new UserProfileActions.GetAllUserProfiles('')).subscribe(
      () => {
        this.userProfiles = this.store.selectSnapshot<UserProfile[]>((state) => state.users.userProfiles);
      }
    )
  }
}
