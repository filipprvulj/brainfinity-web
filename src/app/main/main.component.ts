import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

/** @title Responsive sidenav */
@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.sass'],
})
export class MainComponent {
  isClosed: boolean = false;

  constructor() {

  }

}