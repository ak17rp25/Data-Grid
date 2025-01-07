const Table = ({
  data,
  handleDelete,
  handleSortChange,
  sortingKey,
  sortingOrder,
  calculateTotal,
  onLocationClick,
}) => {
  const renderSortIndicator = (key) => {
    if (sortingKey === key) {
      return sortingOrder === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  const keys = [
    "potentialRevenue",
    "annualizedCompetitorProcessingVolume",
    "annualizedCompetitorMerchant",
    "annualizedRevenuePerAccount",
    "annualizedMarketShareByRevenue",
    "commercialDDAs",
  ];

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>
            Location
            <button onClick={() => handleSortChange("location")}>
              {renderSortIndicator("location")}
            </button>
          </th>
          {keys.map((key) => (
            <th key={key}>
              {key.replace(/([A-Z])/g, " $1")}
              <button onClick={() => handleSortChange(key)}>
                {renderSortIndicator(key)}
              </button>
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Total Row */}
        <tr style={{ fontWeight: "bold" }}>
          <td>Total</td>
          {keys.map((key) => (
            <td key={key}>{calculateTotal(key)}</td>
          ))}
          <td>-</td>
        </tr>

        {/* Data Rows */}
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => onLocationClick(item.location)}
              >
                {item.location}
              </span>
            </td>
            {keys.map((key) => (
              <td key={key}>{item[key]}</td>
            ))}
            <td>
              <button onClick={() => handleDelete(index)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
