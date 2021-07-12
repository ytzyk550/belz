import { Injectable } from '@angular/core';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class User {
  id: string;
  name: string;
  email: string;
  phone: number;
}

@Injectable({
  providedIn: 'root'
})

export class RequestsService {


  // REST API
  endpoint = '/api';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getRequest(path: string): Observable<any> {
    
    return this.httpClient.get<any>(this.endpoint + path)
    .pipe(
      retry(0),
      catchError(this.processError)
    )
  }

  postRequest(path: string, data): Observable<any> {
    
    return this.httpClient.post<any>(this.endpoint + path, JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(0),
      catchError(this.processError)
    )
  }  

  deleteRequest(path: string){
    return this.httpClient.delete<any>(this.endpoint + path, this.httpHeader)
    .pipe(
      retry(0),
      catchError(this.processError)
    )
  }
  
  public downloadRequest(path, data, type): Observable<any> {
      
    return this.httpClient.post(path, JSON.stringify(data), {
      responseType: "blob",
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': type
      })
    }).pipe(
      retry(0),
      catchError(this.processError)
    )
  }

  processError(err) {
    // console.log(err);
    return throwError(err)
  }
  
}