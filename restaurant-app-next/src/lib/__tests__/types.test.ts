import { Restaurant, User } from '../types';

describe('Types', () => {
  describe('Restaurant', () => {
    it('should create a valid Restaurant object', () => {
      const restaurant: Restaurant = {
        id: 1,
        name: 'Test Restaurant',
        email: 'test@restaurant.com',
        address: '123 Test Street',
        mobile: '123-456-7890',
        services: 'Dine-in, Takeout'
      };
      
      expect(restaurant).toHaveProperty('id');
      expect(restaurant).toHaveProperty('name');
      expect(restaurant).toHaveProperty('email');
      expect(restaurant).toHaveProperty('address');
      expect(restaurant).toHaveProperty('mobile');
      expect(restaurant).toHaveProperty('services');
      
      expect(restaurant.id).toBe(1);
      expect(restaurant.name).toBe('Test Restaurant');
      expect(restaurant.email).toBe('test@restaurant.com');
      expect(restaurant.address).toBe('123 Test Street');
      expect(restaurant.mobile).toBe('123-456-7890');
      expect(restaurant.services).toBe('Dine-in, Takeout');
    });
    
    it('should allow creating a Restaurant without an id', () => {
      const restaurant: Restaurant = {
        name: 'New Restaurant',
        email: 'new@restaurant.com',
        address: '456 New Street',
        mobile: '987-654-3210',
        services: 'Delivery, Catering'
      };
      
      expect(restaurant.id).toBeUndefined();
      expect(restaurant.name).toBe('New Restaurant');
      expect(restaurant.email).toBe('new@restaurant.com');
      expect(restaurant.address).toBe('456 New Street');
      expect(restaurant.mobile).toBe('987-654-3210');
      expect(restaurant.services).toBe('Delivery, Catering');
    });
  });
  
  describe('User', () => {
    it('should create a valid User object', () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '123-456-7890',
        password: 'password123'
      };
      
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('mobile');
      expect(user).toHaveProperty('password');
      
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.mobile).toBe('123-456-7890');
      expect(user.password).toBe('password123');
    });
    
    it('should allow creating a User without an id', () => {
      const user: User = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        mobile: '987-654-3210',
        password: 'password456'
      };
      
      expect(user.id).toBeUndefined();
      expect(user.name).toBe('Jane Doe');
      expect(user.email).toBe('jane@example.com');
      expect(user.mobile).toBe('987-654-3210');
      expect(user.password).toBe('password456');
    });
  });
});
