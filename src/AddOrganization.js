import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrganization = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationShortName, setOrganizationShortName] = useState('');
  const [organizationURL, setOrganizationURL] = useState('');
  const [organizationLOGO, setOrganizationLOGO] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken'); // Assuming you store your token in localStorage

    try {
      const response = await fetch('http://122.170.12.63:90/api/Organization/addOrganization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          organizationName,
          organizationShortName,
          organizationURL,
          organizationLOGO
        }),
      });
      const data = await response.json();
      if (response.ok) {
        
        setSuccessMessage('Organization added successfully!');
        console.log('Organization added:', data);
        // Optionally reset the form here if needed
        setOrganizationName('');
        setOrganizationShortName('');
        setOrganizationURL('');
        setOrganizationLOGO('');
      } else {
        setErrorMessage(data.message || 'Failed to add organization.');
      }
    } catch (error) {
      setErrorMessage('There was an error submitting the form.');
      console.error('There was an error submitting the form:', error);
    }
  };
  const handelAddOrganization = () => {
    navigate('/Organization'); // Use navigate for redirection
  };
  return (
 <React.Fragment>

<div className='justify-start items-center my-5 '>
<button onClick={() => handelAddOrganization()} className="...">
Go back
  </button>
</div>
     <div className='flex justify-center flex-col items-center text-black'>


{successMessage && <div><p>{successMessage}</p></div>}
<div className='flex justify-center items-center flex-col md:w-[768px] w-full'>
<form onSubmit={handleSubmit} className="space-y-6">
<div>
<label>
  Organization Name:
  <input
    type="text"
    value={organizationName}
    onChange={(e) => setOrganizationName(e.target.value)}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</label>
</div>
<div>
<label>
  Organization Short Name:
  <input
    type="text"
    value={organizationShortName}
    onChange={(e) => setOrganizationShortName(e.target.value)}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</label>
</div>
<div>
<label>
  Organization URL:
  <input
    type="text"
    value={organizationURL}
    onChange={(e) => setOrganizationURL(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</label>
</div>

<div>
<label>
  Organization Logo
  <input
    type="text"
    value={organizationLOGO}
    onChange={(e) => setOrganizationLOGO(e.target.value)}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</label>
</div>
<div>{errorMessage && <p>{errorMessage}</p>}</div>
<div>
  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
Add
  </button>
</div>
</form>


</div>
</div>
 </React.Fragment>
  );
};

export default AddOrganization;
