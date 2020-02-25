import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private AuthenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.AuthenticationService.logout();
    this.router.navigate(['/login']);
  }

}
