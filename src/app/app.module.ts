import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovielistComponent } from './components/movielist/movielist.component';
import { LoginComponent } from './components/login/login.component';
import { Authguard } from './helpers/authguard';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

import { MovieposterComponent } from './components/movieposter/movieposter.component';
import { SearchmovieComponent } from './components/searchmovie/searchmovie.component';
import { MoviedetailComponent } from './components/moviedetail/moviedetail.component';
import { MoviecommentsComponent } from './components/moviecomments/moviecomments.component';
import { RatingComponent } from './components/rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    LoginComponent,
    LogoutComponent,
    MovieposterComponent,
    SearchmovieComponent,
    MoviedetailComponent,
    MoviecommentsComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [Authguard],
  bootstrap: [AppComponent]
})
export class AppModule { }
