import { JobCategory } from "src/app/demo/models/constants/hr/jobcategory.model";

export namespace JobCategoryActions {

    export class AddJobCategory {
        static readonly type = '[JobCategory] Add New JobCategory';
        constructor(public payLoad: JobCategory) { };
    }
    export class UpdateJobCategory {
        static readonly type = '[JobCategory] Update the JobCategory';
        constructor(public payLoad: JobCategory) { }
    }

    export class GetAllJobCategorys {
        static readonly type = '[JobCategory] Get All JobCategorys';
        constructor(public payLoad: string) { };
    }
    export class DeleteJobCategory {
        static readonly type = '[JobCategory] Delete the JobCategory';
        constructor(public Id: string) { };
    }

    export class GetJobCategorysInfo {
        static readonly type = '[JobCategory] Get All JobCategorys Info';
        constructor(public payLoad: string) { };
    }
}