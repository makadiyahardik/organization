import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationUrl, setOrganizationUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Define the validation criteria
    const validEmail = 'hiren@prishusoft.com';
    const validPassword = 'Hello@123$';
    const validUrl = 'http://localhost:4200/';
  
    // Basic validation for empty fields
    if (!email || !password || !organizationUrl) {
      setError('All fields are required');
      return;
    }
  
    // Specific validation for each field
    if (email !== validEmail) {
      setError('Invalid email address');
      return;
    }
  
    if (password !== validPassword) {
      setError('Invalid password');
      return;
    }
  
    if (organizationUrl !== validUrl) {
      setError('Invalid organization URL');
      return;
    }
  
    try {
      const response = await fetch('http://122.170.12.63:90/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          organizationUrl,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save auth token, assuming it's returned in the response data
        localStorage.setItem('authToken', data.authToken);
        // Redirect to the organization list page
        navigate('/Organization');;
      } else {
        // Display error message from API response
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };
  
  return (
   <div className='flex justify-center items-center'>
    
    <div className='flex justify-center items-center flex-col md:w-[768px] w-full'>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="organizationUrl" className="block text-sm font-medium text-gray-700">
          Organization URL
        </label>
        <input
          type="text"
          id="organizationUrl"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={organizationUrl}
          onChange={(e) => setOrganizationUrl(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
      </div>
    </form>


   {error && <div><p className='text-md text-red-600 '>{error}</p></div>}
    </div>
   </div>
  );
};

export default LoginForm;
