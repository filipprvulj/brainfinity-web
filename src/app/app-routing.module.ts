import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
