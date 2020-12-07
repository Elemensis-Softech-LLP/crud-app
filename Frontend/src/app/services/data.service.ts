import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
import { map, catchError } from 'rxjs/operators';

export interface User {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService{
  constructor(private  httpClient : HttpClient) { }

  public extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // this._alert.showAlert('Authentication Failure', error.error.message );

    return Observable.throw(error.message);
  }

  getUsers(): Observable<{}> {
    return this.httpClient.get(environment.endpoint).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUserById(id: any): Observable<{}> {
    return this.httpClient.get(`${environment.endpoint}/${id}`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
