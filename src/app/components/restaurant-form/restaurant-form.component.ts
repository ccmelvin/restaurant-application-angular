import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  template: `
    <form [formGroup]="restaurantForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Restaurant Name</label>
        <input 
          id="name"
          type="text"
          formControlName="name"
          class="form-control"
          [class.is-invalid]="name.invalid && name.touched"
        >
        <div class="invalid-feedback" *ngIf="name.invalid && name.touched">
          Restaurant name is required
        </div>
      </div>

      <div class="form-group">
        <label for="cuisine">Cuisine</label>
        <input 
          id="cuisine"
          type="text"
          formControlName="cuisine"
          class="form-control"
          [class.is-invalid]="cuisine.invalid && cuisine.touched"
        >
        <div class="invalid-feedback" *ngIf="cuisine.invalid && cuisine.touched">
          Cuisine is required
        </div>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input 
          id="address"
          type="text"
          formControlName="address"
          class="form-control"
          [class.is-invalid]="address.invalid && address.touched"
        >
        <div class="invalid-feedback" *ngIf="address.invalid && address.touched">
          Address is required
        </div>
      </div>

      <div class="form-group">
        <label for="rating">Rating</label>
        <input 
          id="rating"
          type="number"
          formControlName="rating"
          class="form-control"
          min="1"
          max="5"
          step="0.1"
          [class.is-invalid]="rating.invalid && rating.touched"
        >
        <div class="invalid-feedback" *ngIf="rating.invalid && rating.touched">
          Rating must be between 1 and 5
        </div>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="restaurantForm.invalid">
        {{ editMode ? 'Update' : 'Create' }} Restaurant
      </button>
    </form>
  `
})
export class RestaurantFormComponent implements OnInit {
  @Input() restaurant?: Restaurant;
  @Output() submitForm = new EventEmitter<Partial<Restaurant>>();
  
  restaurantForm: FormGroup;
  editMode = false;

  constructor(private fb: FormBuilder) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required]],
      cuisine: ['', [Validators.required]],
      address: ['', [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    if (this.restaurant) {
      this.editMode = true;
      this.restaurantForm.patchValue(this.restaurant);
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      this.submitForm.emit(this.restaurantForm.value);
    }
  }

  // Getter methods for form controls
  get name() { return this.restaurantForm.get('name'); }
  get cuisine() { return this.restaurantForm.get('cuisine'); }
  get address() { return this.restaurantForm.get('address'); }
  get rating() { return this.restaurantForm.get('rating'); }
}
