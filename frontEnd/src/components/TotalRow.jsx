const TotalRow = ({ calculateTotal, data }) => {
  const totalRevenue = calculateTotal('potentialRevenue');
  const totalVolume = calculateTotal('annualizedCompetitorProcessingVolume');
  const totalMerchant = '-'; // Adjust accordingly if data is available
  const totalAccount = '-'; // Adjust accordingly if data is available
  const totalMarketShare = '-'; // Adjust accordingly if data is available
  const totalDDAs = '-'; // Adjust accordingly if data is available

  return (
    <tr style={{ fontWeight: 'bold' }}>
      <td>Total</td>
      <td>${totalRevenue}</td>
      <td>${totalVolume}</td>
      <td>{totalMerchant}</td>
      <td>{totalAccount}</td>
      <td>{totalMarketShare}</td>
      <td>{totalDDAs}</td>
      <td>-</td>
    </tr>
  );
};

export default TotalRow;
