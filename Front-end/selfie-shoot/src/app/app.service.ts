import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authentication': null
    })
  }

  userId = null;

  constructor(
    private http: HttpClient
  ) { }

  loginUser(userDetailsObj: any): Observable<any> {
    return this.http.post(`http://localhost:9000/api/user/login`, userDetailsObj);
  }

  cameraImage(imageObj: any): Observable<any> {
    return this.http.post('http://localhost:9000/api/user/image', imageObj, this.httpOptions);
  }

}
