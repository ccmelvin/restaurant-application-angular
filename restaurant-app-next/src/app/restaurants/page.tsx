'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantList from '../../components/restaurant/RestaurantList';

export default function RestaurantsPage() {
  const router = useRouter();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/');
    }
  }, [router]);
  
  return <RestaurantList />;
}