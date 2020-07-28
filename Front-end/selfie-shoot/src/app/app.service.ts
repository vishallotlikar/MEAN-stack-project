import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Headers go here.
  httpOptions = {
    headers: new HttpHeaders({
      'Authentication': null
    })
  }

  userId = null;

  constructor(
    private http: HttpClient
  ) { }

  // API call to server for login.
  loginUser(userDetailsObj: any): Observable<any> {
    return this.http.post(`http://localhost:9000/api/user/login`, userDetailsObj);
  }

  // API call to server to add an image.
  cameraImage(imageObj: any): Observable<any> {
    return this.http.post('http://localhost:9000/api/user/image', imageObj, this.httpOptions);
  }

}
