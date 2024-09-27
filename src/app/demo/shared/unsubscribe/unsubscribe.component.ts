import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  template: "",
})
export class UnsubscribeComponent {

  destroy$ = new Subject();

  ngOnDestroy() {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
