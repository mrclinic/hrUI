import { Language } from "../constants/language.model";
import { LanguageLevel } from "../constants/languagelevel.model";

export interface EmpLanguage {
    languageid?: string;
    language?: Language;
    languagelevelid?: string;
    languagelevel?: LanguageLevel;
    displayonrecordcard?: boolean;
    id?: string;
}
