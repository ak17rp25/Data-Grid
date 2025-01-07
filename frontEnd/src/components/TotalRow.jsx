const TotalRow = ({ calculateTotal, keys }) => (
  <tr style={{ fontWeight: 'bold' }}>
    <td>Total</td>
    {keys.map((key, index) => (
      <td key={index}>{calculateTotal(key)}</td>
    ))}
    <td>-</td>
  </tr>
);

export default TotalRow;
