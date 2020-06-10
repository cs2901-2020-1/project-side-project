import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  
  static path = environment.APIEndpoint + '/image/';

  constructor(private http: HttpClient) { }

  getImage(file: string) : string {
    return environment.APIEndpoint + '/images/' + file;
  }

  getAllImages() : Observable<any> {
    return this.http.get(ImageService.path).pipe(
      map(res => {
        return res
      })
    )
  }

  uploadImage(file: File) : Observable<any> {
    if (!file) { return; }
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(ImageService.path, formData).pipe(
      map(res => {
        return res
      })
    )
  }
}
