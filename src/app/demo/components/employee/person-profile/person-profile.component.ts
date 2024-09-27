import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from 'src/app/demo/shared/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonPrfileComponent extends UnsubscribeComponent implements OnInit {
  personId: number;
  activeIndex: number = 0;
  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.personId = params['personId']
    });
  }
}
