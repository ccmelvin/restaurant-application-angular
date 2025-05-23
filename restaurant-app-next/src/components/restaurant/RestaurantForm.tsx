'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from '../../lib/types';

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSubmit: (data: Restaurant) => void;
  onCancel: () => void;
}

export default function RestaurantForm({ restaurant, onSubmit, onCancel }: RestaurantFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');
  
  // If editing, populate form with restaurant data
  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name);
      setEmail(restaurant.email);
      setMobile(restaurant.mobile.toString());
      setAddress(restaurant.address);
      setServices(restaurant.services);
    }
  }, [restaurant]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: Restaurant = {
      name,
      email,
      mobile: Number(mobile),
      address,
      services,
    };
    
    // If editing, include the id
    if (restaurant?.id) {
      data.id = restaurant.id;
    }
    
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">
        {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Restaurant Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="mobile">
          Mobile
        </label>
        <input
          id="mobile"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="services">
          Services
        </label>
        <input
          id="services"
          type="text"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {restaurant ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}