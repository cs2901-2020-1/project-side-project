import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppLessonService {
  
  static path = environment.APIEndpoint + '/applesson/';

  constructor(private http: HttpClient) { }

  getReqAppLessons() : Observable<any> {
    return this.http.get(AppLessonService.path + 'unapproved/').pipe(
      map(data => {
        return data
      })
    )
  }

  curateContent(applessonId : number, approval : boolean) : Observable<any> {
    return this.http.get(AppLessonService.path + 'approve/' + applessonId + '/' + approval)
    .pipe(
      map(data => {
        return data
      })
    )
  }
}