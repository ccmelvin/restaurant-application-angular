import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantCard from '../RestaurantCard';
import { Restaurant } from '../../../lib/types';

describe('RestaurantCard', () => {
  const mockRestaurant: Restaurant = {
    id: 1,
    name: 'Test Restaurant',
    email: 'test@restaurant.com',
    address: '123 Test Street',
    mobile: '123-456-7890',
    services: 'Dine-in, Takeout'
  };
  
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders restaurant information correctly', () => {
    render(
      <RestaurantCard 
        restaurant={mockRestaurant} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Check if restaurant details are displayed
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText(/123 Test Street/)).toBeInTheDocument();
    expect(screen.getByText(/test@restaurant.com/)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
    expect(screen.getByText(/Dine-in, Takeout/)).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
  
  it('calls onEdit when Edit button is clicked', () => {
    render(
      <RestaurantCard 
        restaurant={mockRestaurant} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockRestaurant);
  });
  
  it('calls onDelete when Delete button is clicked', () => {
    render(
      <RestaurantCard 
        restaurant={mockRestaurant} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
