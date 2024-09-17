import { JobTitle } from "src/app/demo/models/constants/hr/jobtitle.model";

export namespace JobTitleActions {

    export class AddJobTitle {
        static readonly type = '[JobTitle] Add New JobTitle';
        constructor(public payLoad: JobTitle) { };
    }
    export class UpdateJobTitle {
        static readonly type = '[JobTitle] Update the JobTitle';
        constructor(public payLoad: JobTitle) { }
    }

    export class GetAllJobTitles {
        static readonly type = '[JobTitle] Get All JobTitles';
        constructor(public payLoad: string) { };
    }
    export class DeleteJobTitle {
        static readonly type = '[JobTitle] Delete the JobTitle';
        constructor(public Id: string) { };
    }

    export class GetJobTitlesInfo {
        static readonly type = '[JobTitle] Get All JobTitles Info';
        constructor(public payLoad: string) { };
    }
}