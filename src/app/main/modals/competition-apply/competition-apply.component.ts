import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Competition } from '../../models/competition.model';
import { CompetitionApplyModalService } from '../../services/competition-apply-modal.service';

@Component({
  selector: 'app-competition-apply',
  templateUrl: './competition-apply.component.html',
  styleUrls: ['./competition-apply.component.sass']
})
export class CompetitionApplyComponent implements OnInit, OnDestroy {

  private getCompetitionSubsciption: Subscription = new Subscription();
  form: FormGroup;
  competitions: Competition[] = [];
  error: string;
  competitionId: string = ''


  constructor(public dialogRef: MatDialogRef<CompetitionApplyComponent>,
    private formBuilder: FormBuilder,
    private competitionModalService: CompetitionApplyModalService,
  ) {

    this.form = this.formBuilder.group({
      competitions: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getCompetitions();
  }

  getCompetitions() {
    this.getCompetitionSubsciption = this.competitionModalService.getCompetitions().subscribe(
      response => {
        if (response) {
          this.competitions = response
        } else {
          this.error = "No teams were found.";
        }
      },
      error => {
        this.error = error;
      }
    );
  }

  close() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.getCompetitionSubsciption.unsubscribe();
  }
}
