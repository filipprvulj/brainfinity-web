import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
    renderer.addClass(document.body, "auth-background");
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, "auth-background");
  }
}
