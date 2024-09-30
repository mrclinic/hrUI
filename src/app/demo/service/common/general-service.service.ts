import { Injectable } from '@angular/core';

@Injectable()
export class GeneralService {

    radioOptions: any[] = [{ value: true, label: 'نعم' }, { value: false, label: 'لا' }];
    constructor() { }

    getRadioOptions() {
        return this.radioOptions;
    }

    getRadioOptionLabel(val: boolean) {
        return this.radioOptions.filter((p) => p.value == val)[0].label;
    }
}