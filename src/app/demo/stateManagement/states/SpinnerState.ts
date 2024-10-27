import { State, Action, StateContext } from '@ngxs/store';
import { ToggleHide, ToggleShow } from '../actions/spinner.actions';
import { Injectable } from '@angular/core';

@State<boolean>({
    name: 'spinner',
    defaults: true
})
@Injectable()
export class SpinnerState {
    @Action(ToggleShow)
    toggleShow(store: StateContext<boolean>) {
        store.setState(true);
    }

    @Action(ToggleHide)
    toggleHide(store: StateContext<boolean>) {
        store.setState(false);
    }
}