import { Component, OnInit } from '@angular/core';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  template: `
    <div class="restaurant-list">
      <h2>Restaurants</h2>
      <div *ngFor="let restaurant of restaurants" class="restaurant-item">
        <h3>{{restaurant.name}}</h3>
        <p>Cuisine: {{restaurant.cuisine}}</p>
        <p>Rating: {{restaurant.rating}}</p>
        <p>Address: {{restaurant.address}}</p>
        <button (click)="deleteRestaurant(restaurant.id)">Delete</button>
      </div>
    </div>
  `
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants()
      .subscribe(
        restaurants => this.restaurants = restaurants,
        error => console.error('Error loading restaurants:', error)
      );
  }

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id)
      .subscribe(
        () => {
          this.restaurants = this.restaurants.filter(r => r.id !== id);
        },
        error => console.error('Error deleting restaurant:', error)
      );
  }
}
