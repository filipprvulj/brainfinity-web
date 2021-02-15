import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.sass'],
})
export class SidebarComponent {
  isClosed: boolean = false;

  constructor() {

  }

}