import { UserProfile } from "src/app/demo/models/userManagment/UserProfile";

export namespace UserProfileActions {

  export class AddUserProfile {
    static readonly type = '[UserProfile] Add New UserProfile';
    constructor(public payLoad: UserProfile) { };
  }
  export class UpdateUserProfile {
    static readonly type = '[UserProfile] Update the UserProfile';
    constructor(public payLoad: UserProfile) { }
  }

  export class GetAllUserProfiles {
    static readonly type = '[UserProfile] Get All UserProfiles';
    constructor(public payLoad: string) { };
  }
  export class DeleteUserProfile {
    static readonly type = '[UserProfile] Delete the UserProfile';
    constructor(public Id: string) { };
  }

  export class GetMyUserProfiles {
    static readonly type = '[UserProfile] Get My UserProfiles';
    constructor(public payLoad: string) { };
  }

  export class GetAllUserProfilesInfo {
    static readonly type = '[UserProfile] Get All UserProfiles Info';
    constructor(public payLoad: string) { };
  }
}
