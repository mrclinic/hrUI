import { ExperienceType } from "../constants/experiencetype.model";

export interface EmpExperience {
    experiencetypeid?: string;
    experiencetype?: ExperienceType;
    source?: string;
    duration?: string;
    id?: string;
}