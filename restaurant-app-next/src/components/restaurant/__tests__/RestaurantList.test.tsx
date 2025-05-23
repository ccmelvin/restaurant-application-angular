import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RestaurantList from '../RestaurantList';
import { Restaurant } from '../../../lib/types';

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.confirm
const mockConfirm = jest.spyOn(window, 'confirm');

describe('RestaurantList', () => {
  const mockRestaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Restaurant 1',
      email: 'restaurant1@example.com',
      address: '123 Main St',
      mobile: '123-456-7890',
      services: 'Dine-in, Takeout'
    },
    {
      id: 2,
      name: 'Restaurant 2',
      email: 'restaurant2@example.com',
      address: '456 Oak Ave',
      mobile: '987-654-3210',
      services: 'Delivery, Catering'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage.getItem to return a user by default
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ id: 1, email: 'user@example.com' }));
    
    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
    
    // Default successful fetch for initial load
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRestaurants,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('redirects to login if no user is found', () => {
    // Mock localStorage.getItem to return null (no user)
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    
    render(<RestaurantList />);
    
    // Check if router.push was called to redirect to login
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders loading state initially', async () => {
    // Delay the fetch response to ensure loading state is shown
    (global.fetch as jest.Mock).mockReset();
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => mockRestaurants
        }), 100)
      )
    );
    
    render(<RestaurantList />);
    
    // Check for loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders restaurant list after loading', async () => {
    render(<RestaurantList />);
    
    // Wait for the restaurants to load
    await waitFor(() => {
      // Check for restaurant names
      expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
      expect(screen.getByText('Restaurant 2')).toBeInTheDocument();
    });
    
    // Check if the table headers are rendered - using the actual header text
    expect(screen.getByText('Restaurant Name')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Email')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Address')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Phone')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Services')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('handles restaurant deletion', async () => {
    // Mock confirm to return true
    mockConfirm.mockReturnValueOnce(true);
    
    // Mock fetch for delete operation and subsequent fetch
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRestaurants,
      })
      .mockResolvedValueOnce({
        ok: true,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRestaurants.filter(r => r.id !== 1),
      });
    
    render(<RestaurantList />);
    
    // Wait for the restaurants to load
    await waitFor(() => {
      expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
    });
    
    // Find all delete buttons and click the first one
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    // Check if confirm was called
    expect(mockConfirm).toHaveBeenCalled();
    
    // Check if fetch was called with the right arguments for deletion
    // Use the actual API endpoint used in the component
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/restaurants/1', {
        method: 'DELETE',
      });
    });
  });

  it('opens add restaurant modal when Add button is clicked', async () => {
    render(<RestaurantList />);
    
    // Wait for the restaurants to load
    await waitFor(() => {
      expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
    });
    
    // Click the Add button
    fireEvent.click(screen.getByRole('button', { name: /add restaurant/i }));
    
    // Check if the modal title is shown
    // Note: Using "Records" as the modal title based on the actual implementation
    expect(screen.getByText('Records')).toBeInTheDocument();
  });
});
