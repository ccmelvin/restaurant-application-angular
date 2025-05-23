import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantForm from '../RestaurantForm';
import { Restaurant } from '../../../lib/types';

describe('RestaurantForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders empty form when no restaurant is provided', () => {
    render(
      <RestaurantForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Check if form elements are rendered with empty values
    expect(screen.getByLabelText(/restaurant name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/address/i)).toHaveValue('');
    expect(screen.getByLabelText(/mobile/i)).toHaveValue('');
    expect(screen.getByLabelText(/services/i)).toHaveValue('');
    
    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
  
  it('renders form with restaurant data when provided', () => {
    const mockRestaurant: Restaurant = {
      id: 1,
      name: 'Test Restaurant',
      email: 'test@restaurant.com',
      address: '123 Test Street',
      mobile: '123-456-7890',
      services: 'Dine-in, Takeout'
    };
    
    render(
      <RestaurantForm 
        restaurant={mockRestaurant}
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Check if form elements are rendered with restaurant values
    expect(screen.getByLabelText(/restaurant name/i)).toHaveValue('Test Restaurant');
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@restaurant.com');
    expect(screen.getByLabelText(/address/i)).toHaveValue('123 Test Street');
    expect(screen.getByLabelText(/mobile/i)).toHaveValue('123-456-7890');
    expect(screen.getByLabelText(/services/i)).toHaveValue('Dine-in, Takeout');
    
    // Check if button text is "Update" instead of "Add"
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });
  
  it('handles form submission with new restaurant data', () => {
    render(
      <RestaurantForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/restaurant name/i), { 
      target: { value: 'New Restaurant' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'new@restaurant.com' } 
    });
    fireEvent.change(screen.getByLabelText(/address/i), { 
      target: { value: '456 New Street' } 
    });
    fireEvent.change(screen.getByLabelText(/mobile/i), { 
      target: { value: '987-654-3210' } 
    });
    fireEvent.change(screen.getByLabelText(/services/i), { 
      target: { value: 'Delivery, Catering' } 
    });
    
    // Submit the form by clicking the button
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    // Check if onSubmit was called with the right data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'New Restaurant',
      email: 'new@restaurant.com',
      address: '456 New Street',
      mobile: NaN, // Since we're passing a string with hyphens
      services: 'Delivery, Catering'
    });
  });
  
  it('handles form submission with updated restaurant data', () => {
    const mockRestaurant: Restaurant = {
      id: 1,
      name: 'Test Restaurant',
      email: 'test@restaurant.com',
      address: '123 Test Street',
      mobile: '123-456-7890',
      services: 'Dine-in, Takeout'
    };
    
    render(
      <RestaurantForm 
        restaurant={mockRestaurant}
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Update the form
    fireEvent.change(screen.getByLabelText(/restaurant name/i), { 
      target: { value: 'Updated Restaurant' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    
    // Check if onSubmit was called with the right data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated Restaurant',
      email: 'test@restaurant.com',
      address: '123 Test Street',
      mobile: NaN, // Since we're passing a string with hyphens
      services: 'Dine-in, Takeout'
    });
  });
  
  it('calls onCancel when Cancel button is clicked', () => {
    render(
      <RestaurantForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
