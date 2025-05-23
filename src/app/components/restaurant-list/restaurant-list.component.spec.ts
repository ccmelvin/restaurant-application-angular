import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantListComponent } from './restaurant-list.component';
import { RestaurantService } from '../../services/restaurant.service';
import { of, throwError } from 'rxjs';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;

  const mockRestaurants = [
    {
      id: 1,
      name: 'Test Restaurant 1',
      cuisine: 'Italian',
      address: '123 Test St',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Test Restaurant 2',
      cuisine: 'Mexican',
      address: '456 Test Ave',
      rating: 4.0
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RestaurantService', ['getRestaurants', 'deleteRestaurant']);
    spy.getRestaurants.and.returnValue(of(mockRestaurants));
    spy.deleteRestaurant.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      declarations: [ RestaurantListComponent ],
      providers: [
        { provide: RestaurantService, useValue: spy }
      ]
    }).compileComponents();

    restaurantService = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on init', () => {
    expect(restaurantService.getRestaurants).toHaveBeenCalled();
    expect(component.restaurants).toEqual(mockRestaurants);
  });

  it('should delete restaurant when delete button is clicked', () => {
    const restaurantId = 1;
    component.deleteRestaurant(restaurantId);

    expect(restaurantService.deleteRestaurant).toHaveBeenCalledWith(restaurantId);
    expect(component.restaurants.length).toBe(1);
    expect(component.restaurants.find(r => r.id === restaurantId)).toBeUndefined();
  });

  it('should handle error when loading restaurants fails', () => {
    restaurantService.getRestaurants.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.loadRestaurants();

    expect(console.error).toHaveBeenCalledWith('Error loading restaurants:', 'Error');
  });

  it('should handle error when deleting restaurant fails', () => {
    const restaurantId = 1;
    restaurantService.deleteRestaurant.and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.deleteRestaurant(restaurantId);

    expect(console.error).toHaveBeenCalledWith('Error deleting restaurant:', 'Error');
    expect(component.restaurants.length).toBe(2); // Restaurant should not be removed from list
  });
});
