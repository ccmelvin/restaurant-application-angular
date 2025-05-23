import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  createRestaurant(restaurant: Omit<Restaurant, 'id'>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  updateRestaurant(id: number, restaurant: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
