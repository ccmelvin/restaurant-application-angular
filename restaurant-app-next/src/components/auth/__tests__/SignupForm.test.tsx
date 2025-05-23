import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '../SignupForm';

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.alert
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('SignupForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Reset fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    mockAlert.mockClear();
  });

  it('renders the signup form correctly', () => {
    render(<SignupForm />);
    
    // Check if the form elements are rendered
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<SignupForm />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('shows error when passwords do not match', async () => {
    render(<SignupForm />);
    
    // Fill in the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { 
      target: { value: 'password456' } 
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));
    
    // Check for error message
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    
    // Verify fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits the form and handles successful signup', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Registration successful' }),
    });
    
    render(<SignupForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));
    
    // Wait for the async operations to complete
    await waitFor(() => {
      // Check if fetch was called with the right arguments
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: 'John Doe',
          email: 'john@example.com', 
          password: 'password123' 
        }),
      });
      
      // Check if alert was shown
      expect(mockAlert).toHaveBeenCalledWith('Registration successful');
      
      // Check if router.push was called to redirect
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('handles signup failure and displays error message', async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists' }),
    });
    
    render(<SignupForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { 
      target: { value: 'password123' } 
    });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('form'));
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
    
    // Check that router was not called
    expect(mockPush).not.toHaveBeenCalled();
  });
});
