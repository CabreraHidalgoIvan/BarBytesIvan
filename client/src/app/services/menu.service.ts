import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url = 'http://localhost:4000/api/categories/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.url);
  }
}
