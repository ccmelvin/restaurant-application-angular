'use client';

import { Restaurant } from '../../lib/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (id: number) => void;
}

export default function RestaurantCard({ restaurant, onEdit, onDelete }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
      
      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Address:</span> {restaurant.address}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {restaurant.email}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Mobile:</span> {restaurant.mobile}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Services:</span> {restaurant.services}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(restaurant)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(restaurant.id!)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}