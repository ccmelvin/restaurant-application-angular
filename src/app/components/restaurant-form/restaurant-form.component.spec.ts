import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RestaurantFormComponent } from './restaurant-form.component';

describe('RestaurantFormComponent', () => {
  let component: RestaurantFormComponent;
  let fixture: ComponentFixture<RestaurantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.restaurantForm.get('name').value).toBe('');
    expect(component.restaurantForm.get('cuisine').value).toBe('');
    expect(component.restaurantForm.get('address').value).toBe('');
    expect(component.restaurantForm.get('rating').value).toBe('');
  });

  it('should initialize in create mode by default', () => {
    expect(component.editMode).toBeFalse();
  });

  it('should validate required fields', () => {
    const form = component.restaurantForm;
    expect(form.valid).toBeFalse();

    // Check each field's validity
    const nameControl = form.get('name');
    const cuisineControl = form.get('cuisine');
    const addressControl = form.get('address');
    const ratingControl = form.get('rating');

    expect(nameControl.errors?.required).toBeTrue();
    expect(cuisineControl.errors?.required).toBeTrue();
    expect(addressControl.errors?.required).toBeTrue();
    expect(ratingControl.errors?.required).toBeTrue();
  });

  it('should validate rating range', () => {
    const ratingControl = component.restaurantForm.get('rating');
    
    ratingControl.setValue(0);
    expect(ratingControl.errors?.min).toBeTruthy();
    
    ratingControl.setValue(6);
    expect(ratingControl.errors?.max).toBeTruthy();
    
    ratingControl.setValue(4.5);
    expect(ratingControl.errors).toBeNull();
  });

  it('should emit form value when valid', () => {
    spyOn(component.submitForm, 'emit');
    
    const testData = {
      name: 'Test Restaurant',
      cuisine: 'Test Cuisine',
      address: 'Test Address',
      rating: 4.5
    };
    
    component.restaurantForm.patchValue(testData);
    component.onSubmit();
    
    expect(component.submitForm.emit).toHaveBeenCalledWith(testData);
  });

  it('should not emit form value when invalid', () => {
    spyOn(component.submitForm, 'emit');
    
    component.onSubmit();
    
    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });

  it('should load existing restaurant data in edit mode', () => {
    const testRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      cuisine: 'Test Cuisine',
      address: 'Test Address',
      rating: 4.5
    };
    
    component.restaurant = testRestaurant;
    component.ngOnInit();
    
    expect(component.editMode).toBeTrue();
    expect(component.restaurantForm.value).toEqual({
      name: testRestaurant.name,
      cuisine: testRestaurant.cuisine,
      address: testRestaurant.address,
      rating: testRestaurant.rating
    });
  });

  describe('Form Control Getters', () => {
    it('should return form controls', () => {
      expect(component.name).toBe(component.restaurantForm.get('name'));
      expect(component.cuisine).toBe(component.restaurantForm.get('cuisine'));
      expect(component.address).toBe(component.restaurantForm.get('address'));
      expect(component.rating).toBe(component.restaurantForm.get('rating'));
    });
  });
});
