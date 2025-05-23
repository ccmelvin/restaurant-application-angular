import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get restaurants', () => {
    const mockRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      email: 'test@restaurant.com',
      mobile: '1234567890',
      address: '123 Test St',
      services: 'Dine-in'
    };

    service.getRestaurent().subscribe(restaurants => {
      expect(restaurants).toEqual([mockRestaurant]);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');
    req.flush([mockRestaurant]);
  });
});
