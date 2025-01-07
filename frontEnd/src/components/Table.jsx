const Table = ({ data, handleDelete, handleSortChange }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>
            Location
            <button onClick={() => handleSortChange('location')}>Sort</button>
          </th>
          <th>
            Potential Revenue
            <button onClick={() => handleSortChange('potentialRevenue')}>Sort</button>
          </th>
          <th>
            Annualized Competitor Processing Volume
            <button onClick={() => handleSortChange('annualizedCompetitorProcessingVolume')}>Sort</button>
          </th>
          <th>
            Annualized Competitor Merchant
            <button onClick={() => handleSortChange('annualizedCompetitorMerchant')}>Sort</button>
          </th>
          <th>
            Annualized Revenue Per Account
            <button onClick={() => handleSortChange('annualizedRevenuePerAccount')}>Sort</button>
          </th>
          <th>
            Annualized Market Share By Revenue
            <button onClick={() => handleSortChange('annualizedMarketShareByRevenue')}>Sort</button>
          </th>
          <th>
            Commercial DDAs
            <button onClick={() => handleSortChange('commercialDDAs')}>Sort</button>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Data Rows */}
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.location}</td>
            <td>${item.potentialRevenue}</td>
            <td>${item.annualizedCompetitorProcessingVolume}</td>
            <td>{item.annualizedCompetitorMerchant}</td>
            <td>${item.annualizedRevenuePerAccount}</td>
            <td>{item.annualizedMarketShareByRevenue}</td>
            <td>{item.commercialDDAs}</td>
            <td>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
