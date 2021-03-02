import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { MatSidenavModule, } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { UsersComponent } from "./components/users/users.component";
import { CompetitionsComponent } from "./components/competitions/competitions.component";
import { MainRoutingModule } from "./main-routing.module";
import { CommonModule } from "@angular/common";
import { TeamsTableComponent } from './components/users/teams-table/teams-table.component';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { JuryTableComponent } from './components/users/jury-table/jury-table.component';
import { GraderTableComponent } from './components/users/grader-table/grader-table.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog'
import { CompetitionApplyComponent } from './modals/competition-apply/competition-apply.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        MainComponent,
        UsersComponent,
        CompetitionsComponent,
        TeamsTableComponent,
        JuryTableComponent,
        GraderTableComponent,
        CompetitionApplyComponent
    ],
    imports: [
        MainRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatDialogModule,
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
