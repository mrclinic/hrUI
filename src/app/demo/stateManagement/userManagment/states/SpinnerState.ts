import { State, Action, StateContext } from '@ngxs/store';
import { ToggleHide, ToggleShow } from '../actions/spinner.actions';

@State<boolean>({
    name: 'spinner',
    defaults: true
})
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