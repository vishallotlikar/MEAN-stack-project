import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService,
    private router: Router) { }

  loginDetails: FormGroup;

  ngOnInit(): void {
    const self = this;
    this.loginDetails = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  loginUser() {
    const userDetailsObj = {
      username: this.loginDetails.get('username').value,
      password: this.loginDetails.get('password').value
    }
    this.appService.loginUser(userDetailsObj).subscribe( // Subscribe for the api response.
      (data: any) => {
        // console.log('data--> ', JSON.stringify(data));
        if (data.status == true) {
          this.appService.userId = data.result._id;
          this.appService.httpOptions.headers = new HttpHeaders({ // Store received token into appService.
            'Authentication': data.result.token
          });
          this.router.navigate(['/camera']);
        }
      }, (err: HttpErrorResponse) => {
        // console.log('error--> ', JSON.stringify(err));
        if (err.error != null && err.error.status == false) {
          alert('Login failed');
        }
      });

  }

}
