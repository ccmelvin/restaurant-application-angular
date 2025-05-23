import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('LoginForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Reset fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    mockAlert.mockClear();
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);
    
    // Check if the form elements are rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/new user\? click to sign up/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('submits the form and handles successful login', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        message: 'Login successful', 
        user: { id: 1, email: 'test@example.com' } 
      }),
    });
    
    render(<LoginForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));
    
    // Wait for the async operations to complete
    await waitFor(() => {
      // Check if fetch was called with the right arguments
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'test@example.com', 
          password: 'password123' 
        }),
      });
      
      // Check if localStorage was updated
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user', 
        JSON.stringify({ id: 1, email: 'test@example.com' })
      );
      
      // Check if alert was shown
      expect(mockAlert).toHaveBeenCalledWith('Login successful');
      
      // Check if router.push was called to redirect
      expect(mockPush).toHaveBeenCalledWith('/restaurants');
    });
  });

  it('handles login failure and displays error message', async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });
    
    render(<LoginForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'wrongpassword' } 
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
    
    // Check that localStorage and router were not called
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
