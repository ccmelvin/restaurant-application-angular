'use client';

import { useState, useEffect, useRef } from 'react';
import { Restaurant } from '../../lib/types';
import { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } from '../../lib/api';
import { useRouter } from 'next/navigation';

// Bootstrap modal functionality
declare global {
  interface Window {
    bootstrap: any;
  }
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    services: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  
  // Fetch restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
    
    // Import Bootstrap JS only on client side
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);
  
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getRestaurants();
      setRestaurants(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAddRestaurant = async () => {
    try {
      const data = {
        ...formData,
        mobile: Number(formData.mobile),
      };
      
      await addRestaurant(data);
      resetForm();
      closeModal();
      fetchRestaurants();
      alert('Restaurant Added Successfully');
    } catch (err) {
      alert('Restaurant Added Failed!');
      console.error(err);
    }
  };
  
  const handleUpdateRestaurant = async () => {
    if (editId === null) return;
    
    try {
      const data = {
        ...formData,
        mobile: Number(formData.mobile),
      };
      
      await updateRestaurant(editId, data);
      resetForm();
      closeModal();
      fetchRestaurants();
      alert('Restaurant Updated Successfully');
    } catch (err) {
      alert('Restaurant Update Failed!');
      console.error(err);
    }
  };
  
  const handleDeleteRestaurant = async (id: number) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await deleteRestaurant(id);
        fetchRestaurants();
        alert('Restaurant Deleted Successfully');
      } catch (err) {
        alert('Restaurant Delete Failed!');
        console.error(err);
      }
    }
  };
  
  const handleEditRestaurant = (restaurant: Restaurant) => {
    setFormData({
      name: restaurant.name,
      email: restaurant.email,
      mobile: restaurant.mobile.toString(),
      address: restaurant.address,
      services: restaurant.services,
    });
    setEditId(restaurant.id!);
    setShowAdd(false);
    setShowBtn(true);
  };
  
  const handleAddClick = () => {
    resetForm();
    setShowAdd(true);
    setShowBtn(false);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
      services: '',
    });
    setEditId(null);
  };
  
  const closeModal = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };
  
  if (loading) {
    return <div className="text-center py-5">Loading restaurants...</div>;
  }
  
  return (
    <>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
          <h2 style={{ color: 'white' }}>Restaurant Record App</h2>
          <div className="d-flex">
            <button 
              onClick={handleAddClick} 
              className="btn btn-success" 
              type="button" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal"
            >
              Add Restaurant
            </button>
            <button 
              onClick={handleLogout}
              style={{ marginLeft: '5px' }} 
              className="btn btn-danger" 
              type="button"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
      
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Restaurant Records Management System</h1>
          <p className="col-md-8 fs-4">You can save Records of Restaurant</p>
          <a 
            className="btn btn-primary btn-lg" 
            type="button" 
            target="_blank" 
            href="https://github.com/sibashish99/Restaurent_Application"
          >
            Source Code
          </a>
        </div>
      </div>
      
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">Restaurant Id</th>
            <th scope="col">Restaurant Name</th>
            <th scope="col">Restaurant Email</th>
            <th scope="col">Restaurant Address</th>
            <th scope="col">Restaurant Phone</th>
            <th scope="col">Restaurant Services</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.email}</td>
              <td>{restaurant.address}</td>
              <td>{restaurant.mobile}</td>
              <td>{restaurant.services}</td>
              <td>
                <button 
                  onClick={() => handleEditRestaurant(restaurant)} 
                  className="btn btn-info" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#exampleModal"
                >
                  Edit
                </button> &nbsp;
                <button 
                  onClick={() => handleDeleteRestaurant(restaurant.id!)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Records</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Restaurant Name" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="abcd@gmail.com" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Abc road, near abc, pin: 12546" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91-1234567890" 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Services</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    placeholder="chai, coffee" 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                ref={closeButtonRef}
              >
                Close
              </button>
              {showAdd && (
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleAddRestaurant}
                >
                  Add Details
                </button>
              )}
              {showBtn && (
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleUpdateRestaurant}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}