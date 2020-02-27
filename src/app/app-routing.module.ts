import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authguard } from './helpers/authguard';
import { LoginComponent } from './components/login/login.component';
import { MovielistComponent } from './components/movielist/movielist.component';
import { MoviedetailComponent } from './components/moviedetail/moviedetail.component';

const routes: Routes = [
  { path: '', component: MovielistComponent, canActivate: [Authguard] },
  { path: 'login', component: LoginComponent },
  { path: 'movie/:id', component: MoviedetailComponent, canActivate: [Authguard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
