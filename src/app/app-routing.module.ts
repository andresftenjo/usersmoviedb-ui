import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authguard } from './helpers/authguard';
import { LoginComponent } from './components/login/login.component';
import { MovielistComponent } from './components/movielist/movielist.component';

const routes: Routes = [
  { path: '', component: MovielistComponent, canActivate: [Authguard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
