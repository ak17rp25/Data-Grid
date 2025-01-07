import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Dropdown from './components/Dropdown';
import TotalRow from './components/TotalRow';

const App = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('location');
  const [sortingKey, setSortingKey] = useState('location');
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/data?view=${view}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [view]);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleSortChange = (key) => {
    setSortingKey(key);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const calculateTotal = (key) => {
    return data.reduce((acc, item) => {
      const value = parseFloat(item[key]) || 0;
      return acc + value;
    }, 0).toFixed(2);
  };

  const filterByBranch = (data, branch) => {
    if (!branch) return data;
    return data.filter(item => item.branch === branch);
  };

  const sortedData = filterByBranch(data, selectedBranch).sort((a, b) => {
    if (a[sortingKey] < b[sortingKey]) return -1;
    if (a[sortingKey] > b[sortingKey]) return 1;
    return 0;
  });

  return (
    <div className="app-container">
      <h1>Data Grid Application</h1>

      {/* View Dropdown */}
      <Dropdown 
        options={['location', 'branch']} 
        onChange={(e) => setView(e.target.value)} 
        value={view} 
        label="View" 
      />

      {/* Branch Filtering Dropdown */}
      <Dropdown 
        options={['', 'Sales', 'Engineering', 'HR']} 
        onChange={handleBranchChange} 
        value={selectedBranch} 
        label="Branch Filter" 
      />

      {/* Table Component */}
      <Table
        data={sortedData}
        handleDelete={handleDelete}
        handleSortChange={handleSortChange}
      />

      {/* Total Row */}
      <TotalRow 
        calculateTotal={calculateTotal} 
        data={data} // Pass data here for accurate calculation
      />
    </div>
  );
};

export default App;
