import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getCurrentUser() : BehaviorSubject<User>{
   return new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }
}
