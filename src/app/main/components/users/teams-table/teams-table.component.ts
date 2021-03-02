import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { CompetitionApplyComponent } from 'src/app/main/modals/competition-apply/competition-apply.component';
import { Team } from 'src/app/main/models/team.model';
import { TeamService } from 'src/app/main/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.sass']
})
export class TeamsTableComponent implements OnInit {
  private getTeamsSubsciption: Subscription = new Subscription();
  pageSize: number = 10;
  pageIndex: number = 1;
  resultsLength: number = 0;
  dataSource: Team[]
  error: string = null;
  displayedColumns: string[] = ['teamName', 'email', 'mentor', 'grade', 'actions']
  readonly firstPage = 1;
  pageToFetch = 1;
  pageSizeReturned = 0;

  constructor(private teamService: TeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTeams();
  }

  paginator(event) {
    this.pageToFetch = event;
    // if page size is changed, get the first page of the results
    // if (this.pageSize !== event.pageSize) {
    //   this.pageToFetch = this.firstPage;
    // }
    // this.pageSize = event.pageSize;
    this.getTeams();

  }

  applyForCompetition(teamId: string) {
    const dialogRef = this.dialog.open(CompetitionApplyComponent)
  }

  getTeams(): void {
    this.getTeamsSubsciption = this.teamService.getTeams(this.pageToFetch, this.pageSize).subscribe(
      response => {
        if (response) {
          this.pageSizeReturned = response.metadata.pageSize;
          this.resultsLength = response.metadata.totalCount;
          this.pageIndex = response.metadata.currentPage;
          this.dataSource = response.entities;
        } else {
          this.error = "No teams were found.";
        }
      },
      error => {
        this.error = error;
      }
    )

  }
}
