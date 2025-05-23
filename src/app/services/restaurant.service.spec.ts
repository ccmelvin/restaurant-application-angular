import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantService, Restaurant } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService]
    });

    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRestaurants', () => {
    it('should return an array of restaurants', () => {
      const mockRestaurants: Restaurant[] = [
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

      service.getRestaurants().subscribe(restaurants => {
        expect(restaurants).toEqual(mockRestaurants);
      });

      const req = httpMock.expectOne('http://localhost:3000/restaurants');
      expect(req.request.method).toBe('GET');
      req.flush(mockRestaurants);
    });
  });

  describe('getRestaurant', () => {
    it('should return a single restaurant by id', () => {
      const mockRestaurant: Restaurant = {
        id: 1,
        name: 'Test Restaurant',
        cuisine: 'Italian',
        address: '123 Test St',
        rating: 4.5
      };

      service.getRestaurant(1).subscribe(restaurant => {
        expect(restaurant).toEqual(mockRestaurant);
      });

      const req = httpMock.expectOne('http://localhost:3000/restaurants/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockRestaurant);
    });
  });

  describe('createRestaurant', () => {
    it('should create a new restaurant', () => {
      const newRestaurant = {
        name: 'New Restaurant',
        cuisine: 'Indian',
        address: '789 Test Blvd',
        rating: 4.8
      };

      const mockResponse: Restaurant = {
        id: 3,
        ...newRestaurant
      };

      service.createRestaurant(newRestaurant).subscribe(restaurant => {
        expect(restaurant).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/restaurants');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newRestaurant);
      req.flush(mockResponse);
    });
  });

  describe('updateRestaurant', () => {
    it('should update an existing restaurant', () => {
      const id = 1;
      const updateData = {
        name: 'Updated Restaurant',
        rating: 4.9
      };

      const mockResponse: Restaurant = {
        id: 1,
        name: 'Updated Restaurant',
        cuisine: 'Italian',
        address: '123 Test St',
        rating: 4.9
      };

      service.updateRestaurant(id, updateData).subscribe(restaurant => {
        expect(restaurant).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`http://localhost:3000/restaurants/${id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateData);
      req.flush(mockResponse);
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete a restaurant', () => {
      const id = 1;

      service.deleteRestaurant(id).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`http://localhost:3000/restaurants/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(undefined);
    });
  });
});
