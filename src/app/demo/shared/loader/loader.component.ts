import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  @Input() loading: boolean;
  constructor() { }

  ngOnInit(): void {
  }
}
