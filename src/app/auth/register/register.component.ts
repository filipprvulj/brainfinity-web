import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        email: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }),
      secondFormGroup: this._formBuilder.group({
        teamName: ['', Validators.required],
        logo: ['', Validators.required],
        teamImage: ['', Validators.required]
      }),
      thirdFormGroup: this._formBuilder.group({
        teamMemberFirstName: ['', Validators.required],
        teamMemberLastName: ['', Validators.required]
      })
    })
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

  onSubmit() {
    var registerModelFormData = new FormData();

    registerModelFormData.append("email", this.registerFormGroup.controls['firstFormGroup'].value.email);
    registerModelFormData.append("password", this.registerFormGroup.controls['firstFormGroup'].value.password);
    registerModelFormData.append("teamName", this.registerFormGroup.controls['secondFormGroup'].value.teamName);
    registerModelFormData.append("logo", this.registerFormGroup.controls['secondFormGroup'].value.logo.files[0]);
    registerModelFormData.append("teamPicture", this.registerFormGroup.controls['secondFormGroup'].value.teamImage.files[0]);

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
