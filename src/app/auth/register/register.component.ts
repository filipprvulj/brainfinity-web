import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterModel } from '../models/RegisterModel';
import { TeamMember } from '../models/TeamMember';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('firstNameInput') firstNameInput;
  @ViewChild('lastNameInput') lastNameInput;

  isLinear = true;
  registerFormGroup: FormGroup;
  teamMembers: TeamMember[] = [];
  destroy$ = new Subject<boolean>();
  error: string = "";


  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  ngOnInit() {
    this.registerFormGroup = this._formBuilder.group({
      firstFormGroup: this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        passwordFormGroup: this._formBuilder.group({
          password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ !"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[0-9a-zA-Z !"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+/
            )
          ]],
          passwordConfirm: ['', [Validators.required]]
        }, { validators: this.isPasswordConfirmed })
      }),

      secondFormGroup: this._formBuilder.group({
        teamName: ['', Validators.required],
        logo: ['', Validators.required],
        teamImage: ['', Validators.required]
      }),

      thirdFormGroup: this._formBuilder.group({
        mentorEmail: ['', [Validators.required, Validators.email]],
        mentorFirstName: ['', Validators.required],
        mentorLastName: ['', Validators.required]
      }),

      fourthFormGroup: this._formBuilder.group({
        teamMemberFirstName: ['', Validators.required],
        teamMemberLastName: ['', Validators.required]
      })
    })
  }

  isPasswordConfirmed(c: FormGroup): ValidationErrors {

    return c.get("password").value === c.get("passwordConfirm").value ? null : { mismatch: true };
  }

  addTeamMember(firstName: string, lastName: string) {
    let teamMember: TeamMember = {
      firstName: firstName,
      lastName: lastName
    }
    if (teamMember.firstName != "" && teamMember.lastName != "") {
      this.teamMembers.push(teamMember);
    }

    this.firstNameInput.nativeElement.value = "";
    this.lastNameInput.nativeElement.value = "";
  }

  removeTeamMember(index: number) {
    this.teamMembers.splice(index, 1);
  }

  onPasswordInput() {
    if (this.registerFormGroup.get(['firstFormGroup', 'passwordFormGroup']).errors?.mismatch) {
      this.registerFormGroup.get(['firstFormGroup', 'passwordFormGroup']).get('passwordConfirm').setErrors({ mismatch: true });
    }
  }

  onSubmit() {
    var registerModelFormData = new FormData();

    registerModelFormData.append("email", this.registerFormGroup.get(['firstFormGroup', 'email']).value);
    registerModelFormData.append("password", this.registerFormGroup.get(['firstFormGroup', 'passwordFormGroup', 'password']).value);
    registerModelFormData.append("teamName", this.registerFormGroup.get(['secondFormGroup', 'teamName']).value);
    registerModelFormData.append("logo", this.registerFormGroup.get(['secondFormGroup', 'logo']).value.files[0]);
    registerModelFormData.append("teamPicture", this.registerFormGroup.get(['secondFormGroup', 'teamImage']).value.files[0]);
    registerModelFormData.append("teamMentor[email]", this.registerFormGroup.get(['thirdFormGroup', 'mentorEmail']).value);
    registerModelFormData.append("teamMentor[firstName]", this.registerFormGroup.get(['thirdFormGroup', 'mentorFirstName']).value);
    registerModelFormData.append("teamMentor[lastName]", this.registerFormGroup.get(['thirdFormGroup', 'mentorLastName']).value);

    for (var i = 0; i < this.teamMembers.length; i++) {
      registerModelFormData.append(`teamMembers[${i}][firstName]`, this.teamMembers[i].firstName);
      registerModelFormData.append(`teamMembers[${i}][lastName]`, this.teamMembers[i].lastName);
    }

    this.authService.register(registerModelFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.router.navigate(['']),
        (response) => {
          const userMessage = JSON.parse(response.error).errors.meesage;
          this.error = userMessage;
        }
      );
  }
}
