import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { RestaurentDashComponent } from './restaurent-dash.component';
import { ApiService } from '../shared/api.service';

describe('RestaurentDashComponent', () => {
  let component: RestaurentDashComponent;
  let fixture: ComponentFixture<RestaurentDashComponent>;
  let apiService: ApiService;

  // Mock restaurant data
  const mockRestaurants = [
    {
      id: 1,
      name: 'Test Restaurant',
      email: 'test@restaurant.com',
      mobile: '1234567890',
      address: '123 Test St',
      services: 'Dine-in'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ RestaurentDashComponent ],
      providers: [ ApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurentDashComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    
    // Spy on the API service methods
    spyOn(apiService, 'getRestaurent').and.returnValue(of(mockRestaurants));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.formValue).toBeDefined();
    expect(component.formValue.get('name')?.value).toBe('');
    expect(component.formValue.get('email')?.value).toBe('');
    expect(component.formValue.get('mobile')?.value).toBe('');
    expect(component.formValue.get('address')?.value).toBe('');
    expect(component.formValue.get('services')?.value).toBe('');
  });

  it('should load restaurants on init', () => {
    expect(apiService.getRestaurent).toHaveBeenCalled();
    expect(component.allRestaurentData).toEqual(mockRestaurants);
  });

  it('should reset form when clickAddResto is called', () => {
    // Set some values in the form
    component.formValue.controls['name'].setValue('Test Name');
    component.formValue.controls['email'].setValue('test@email.com');
    
    // Call the method
    component.clickAddResto();
    
    // Check if form is reset
    expect(component.formValue.get('name')?.value).toBe(null);
    expect(component.formValue.get('email')?.value).toBe(null);
    expect(component.showAdd).toBe(true);
    expect(component.showBtn).toBe(false);
  });

  it('should add restaurant successfully', () => {
    // Setup
    spyOn(apiService, 'postRestaurent').and.returnValue(of({ id: 2, ...mockRestaurants[0] }));
    spyOn(window, 'alert');
    spyOn(component, 'getAllData');
    
    // Set form values
    component.formValue.controls['name'].setValue('New Restaurant');
    component.formValue.controls['email'].setValue('new@restaurant.com');
    component.formValue.controls['mobile'].setValue('9876543210');
    component.formValue.controls['address'].setValue('456 New St');
    component.formValue.controls['services'].setValue('Takeout');
    
    // Call the method
    component.addRestaurent();
    
    // Assertions
    expect(apiService.postRestaurent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Restaurent Added Successfully');
    expect(component.getAllData).toHaveBeenCalled();
  });

  it('should handle error when adding restaurant fails', () => {
    // Setup
    spyOn(apiService, 'postRestaurent').and.returnValue(throwError(() => new Error('API Error')));
    spyOn(window, 'alert');
    spyOn(console, 'log');
    
    // Call the method
    component.addRestaurent();
    
    // Assertions
    expect(apiService.postRestaurent).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Restaurent Added Failed!');
    expect(console.log).toHaveBeenCalled();
  });

  it('should delete restaurant', () => {
    // Setup
    spyOn(apiService, 'deleteRestaurant').and.returnValue(of({}));
    spyOn(window, 'alert');
    spyOn(component, 'getAllData');
    
    // Call the method
    component.deleteResto(1);
    
    // Assertions
    expect(apiService.deleteRestaurant).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Restaurent Deleted Successfully');
    expect(component.getAllData).toHaveBeenCalled();
  });

  it('should populate form when editing restaurant', () => {
    // Call the method
    component.onEditResto(mockRestaurants[0]);
    
    // Assertions
    expect(component.showAdd).toBe(false);
    expect(component.showBtn).toBe(true);
    expect(component.restaurentModelObj.id).toBe(mockRestaurants[0].id);
    expect(component.formValue.get('name')?.value).toBe(mockRestaurants[0].name);
    expect(component.formValue.get('email')?.value).toBe(mockRestaurants[0].email);
    expect(component.formValue.get('mobile')?.value).toBe(mockRestaurants[0].mobile);
    expect(component.formValue.get('address')?.value).toBe(mockRestaurants[0].address);
    expect(component.formValue.get('services')?.value).toBe(mockRestaurants[0].services);
  });

  it('should update restaurant', () => {
    // Setup
    spyOn(apiService, 'updateRestaurant').and.returnValue(of({}));
    spyOn(window, 'alert');
    spyOn(component, 'getAllData');
    
    // Set form values and restaurant ID
    component.restaurentModelObj.id = 1;
    component.formValue.controls['name'].setValue('Updated Restaurant');
    component.formValue.controls['email'].setValue('updated@restaurant.com');
    component.formValue.controls['mobile'].setValue('5555555555');
    component.formValue.controls['address'].setValue('789 Update St');
    component.formValue.controls['services'].setValue('Delivery');
    
    // Call the method
    component.updateResto();
    
    // Assertions
    expect(apiService.updateRestaurant).toHaveBeenCalledWith(1, component.restaurentModelObj);
    expect(window.alert).toHaveBeenCalledWith('Restaurent Updated Successfully');
    expect(component.getAllData).toHaveBeenCalled();
  });
});
