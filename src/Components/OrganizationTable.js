const OrganizationTable = ( data ) => {

  console.log("organizations",data.data)

  const newRes = data&& data?.data
    return (
      <div className="container mx-auto mt-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-2">Organization Name</th>
              <th className="px-4 py-2">Short Name</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Logo</th>
            </tr>
          </thead>
          <tbody>
          {
  newRes &&
    newRes.slice(0, 5).map((item, index) => (
      <tr key={index} className="bg-white border-b text-gray-900">
        <td className="px-4 py-2">{item.organizationName}</td>
        <td className="px-4 py-2">{item.organizationShortName}</td>
        <td className="px-4 py-2">
          <a href={item.organizationURL} target="_blank" rel="noopener noreferrer">
            {item.organizationURL}
          </a>
        </td>
        {/* Make sure you are accessing the organizationLOGO correctly */}
        <td className="px-4 py-2">{item.organizationLOGO}</td>
      </tr>
    ))
}

          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrganizationTable;
  