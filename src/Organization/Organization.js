import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Organization = () => {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          'http://122.170.12.63:90/api/Organization/getAllOrganization',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          // setResult(data);
          setResult(data?.data);

          console.log('Organizations fetched:', data.data);
        } else {
          // Handle errors such as token expiration or other API errors
          throw new Error('Authorization failed');
        }
      } catch (error) {
        // Redirect to the login page using navigate
        navigate('/');
      }
    };

    fetchOrganizations();
  }, [navigate]); // Replace history with navigate in the dependency array

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); // Use navigate for redirection
  };
  const handelAddOrganization = () => {
    navigate('/AddOrganization'); // Use navigate for redirection
  };

  return (
    <div className="">
      {/* Add Organization and Logout buttons */}
      <div className="flex  justify-end items-center space-x-5 my-10">
        <button onClick={() => handleLogout()} className="...">
          Logout
        </button>
        <button onClick={() => handelAddOrganization()} className="...">
          Add Organization
        </button>
      </div>

      <>
        <div>
          <table className="min-w-full table-auto">
            <thead className="justify-between">
              <tr className="bg-gray-800">
                <th className="px-16 py-2">
                  <span className="text-gray-300">Name</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-300">Short Name</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-300">URL</span>
                </th>
                <th className="px-16 py-2">
                  <span className="text-gray-300">Logo URL</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {/* Here we map over the result array and output a row for each item */}
              {result.slice(0, 5).map(
                (
                  item,
                  index // only taking the first 5 results
                ) => (
                  <tr key={index} className="bg-white border-4 border-gray-200">
                    <td className="px-16 py-2">
                      <span className="text-center ml-2 font-semibold">
                        {item.organizationName
                          ? item.organizationName
                          : 'no data'}
                      </span>
                    </td>
                    <td className="px-16 py-2">
                      <span>{item.organizationShortName}</span>
                    </td>
                    <td className="px-16 py-2">
                      <a
                        href={item.organizationURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-800"
                      >
                        {item.organizationURL}
                      </a>
                    </td>
                    <td className="px-16 py-2">
                      <span>{item.organizationLOGO}</span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default Organization;
