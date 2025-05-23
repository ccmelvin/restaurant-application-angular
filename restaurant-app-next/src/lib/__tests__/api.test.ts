import { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant, login, signup } from '../api';
import { Restaurant, User } from '../types';

// Mock global fetch
global.fetch = jest.fn();

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRestaurants', () => {
    it('should fetch all restaurants successfully', async () => {
      const mockRestaurants = [
        { id: 1, name: 'Restaurant 1', email: 'test@example.com', address: '123 Main St', mobile: '123456', services: 'Dine-in' },
        { id: 2, name: 'Restaurant 2', email: 'test2@example.com', address: '456 Oak St', mobile: '654321', services: 'Takeout' }
      ];
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRestaurants
      });
      
      const result = await getRestaurants();
      
      expect(global.fetch).toHaveBeenCalledWith('/api/restaurants');
      expect(result).toEqual(mockRestaurants);
    });
  });
  
  describe('addRestaurant', () => {
    it('should create a restaurant successfully', async () => {
      const newRestaurant: Restaurant = {
        name: 'New Restaurant',
        email: 'new@restaurant.com',
        address: '123 New St',
        mobile: '123-456-7890',
        services: 'Dine-in'
      };
      
      const createdRestaurant = {
        id: 3,
        ...newRestaurant
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdRestaurant
      });
      
      const result = await addRestaurant(newRestaurant);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRestaurant)
      });
      expect(result).toEqual(createdRestaurant);
    });
  });
  
  describe('updateRestaurant', () => {
    it('should update a restaurant successfully', async () => {
      const restaurantId = 1;
      const updatedData: Restaurant = {
        name: 'Updated Restaurant',
        email: 'updated@restaurant.com',
        address: '456 Update St',
        mobile: '987-654-3210',
        services: 'Takeout'
      };
      
      const updatedRestaurant = {
        id: restaurantId,
        ...updatedData
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedRestaurant
      });
      
      const result = await updateRestaurant(restaurantId, updatedData);
      
      expect(global.fetch).toHaveBeenCalledWith(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      expect(result).toEqual(updatedRestaurant);
    });
  });
  
  describe('deleteRestaurant', () => {
    it('should delete a restaurant successfully', async () => {
      const restaurantId = 1;
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });
      
      await deleteRestaurant(restaurantId);
      
      expect(global.fetch).toHaveBeenCalledWith(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE'
      });
    });
  });
  
  describe('login', () => {
    it('should login successfully', async () => {
      const email = 'user@example.com';
      const password = 'password123';
      const mockResponse = { 
        user: { id: 1, email, name: 'Test User' },
        message: 'Login successful'
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await login(email, password);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('signup', () => {
    it('should signup successfully', async () => {
      const userData: User = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
        mobile: '123-456-7890'
      };
      
      const mockResponse = { 
        message: 'Registration successful'
      };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await signup(userData);
      
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
