import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: '',
    component: MainComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
