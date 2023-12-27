import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8080/v1/';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Object> {
    return this.http.get(this.url + 'hotel/hotels');
  }

  getHotelsByCity(id: any): Observable<Object> {
    return this.http.get(this.url + 'hotel/find-hotels/' + id);
  }

  getCities(): Observable<Object> {
    return this.http.get(this.url + 'city/cities');
  }
}
