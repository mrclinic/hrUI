import { DeputationObjective } from "src/app/demo/models/constants/hr/deputationobjective.model";

export namespace DeputationObjectiveActions {

    export class AddDeputationObjective {
        static readonly type = '[DeputationObjective] Add New DeputationObjective';
        constructor(public payLoad: DeputationObjective) { };
    }
    export class UpdateDeputationObjective {
        static readonly type = '[DeputationObjective] Update the DeputationObjective';
        constructor(public payLoad: DeputationObjective) { }
    }

    export class GetAllDeputationObjectives {
        static readonly type = '[DeputationObjective] Get All DeputationObjectives';
        constructor(public payLoad: string) { };
    }
    export class DeleteDeputationObjective {
        static readonly type = '[DeputationObjective] Delete the DeputationObjective';
        constructor(public Id: string) { };
    }

    export class GetDeputationObjectivesInfo {
        static readonly type = '[DeputationObjective] Get All DeputationObjectives Info';
        constructor(public payLoad: string) { };
    }
}