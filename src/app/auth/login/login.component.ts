import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  destroy$ = new Subject<boolean>();
  error: string = '';

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[0-9a-zA-Z !"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+/
          ),
        ],
      ],
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService
      .login(this.formGroup.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (token) => {
          this.authService.storeToken(token);
          this.router.navigate(['']);
        },
        (response) => {
          const userMessage = JSON.parse(response.error).error.meesage;
          this.error = userMessage;
        }
      )
  }
}
