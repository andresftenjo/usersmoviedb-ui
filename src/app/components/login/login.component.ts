import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  loadingText : string = "Login";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingText = "Login";
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //getter to access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }

    this.loadingText = "Loading..."
    this.loginService.login(this.f.username.value, this.f.password.value)
        .subscribe((datatoken: any) => {
        this.loginService.authenticate()
          .subscribe((datauser: any) => {
            this.loadingText = "Login";
            this.router.navigate([this.returnUrl]);
        });
    });
  }
}
