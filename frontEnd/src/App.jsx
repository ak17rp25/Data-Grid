import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("location");
  const [sortingKey, setSortingKey] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    // Fetch data based on view type
    axios
      .get(`http://localhost:5000/api/data?view=${view}`)
      .then((res) => {
        setData(res.data);
        setOriginalData(res.data);
      })
      .catch((err) => console.error(err));
  }, [view]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleDelete = (index) => {
    const updatedData = [...filteredData];
    updatedData.splice(index, 1);
    setFilteredData(updatedData);
  };

  const handleSortChange = (key) => {
    const order = sortingKey === key && sortingOrder === "asc" ? "desc" : "asc";
    setSortingKey(key);
    setSortingOrder(order);

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const formatValue = (value) => {
    const num = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const calculateTotal = (key) => {
    const total = filteredData.reduce((acc, item) => {
      const value = parseFloat(String(item[key]).replace(/[^0-9.]/g, "")) || 0;
      return acc + value;
    }, 0);
    return formatValue(total);
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
    setFilteredData(originalData);
  };

  const filterByLocation = (location) => {
    const filtered = originalData.filter(
      (item) => item.location.toLowerCase() === location.toLowerCase()
    );
    setFilteredData(filtered);
  };

  return (
    <div className="app-container">
      <h1>Data Grid Application</h1>

      {/* Dropdown */}
      <Dropdown
        options={["location", "branch"]}
        onChange={handleViewChange}
        value={view}
        label="Select View"
      />

      {/* Table */}
      <Table
        data={filteredData}
        handleDelete={handleDelete}
        handleSortChange={handleSortChange}
        sortingKey={sortingKey}
        sortingOrder={sortingOrder}
        calculateTotal={calculateTotal}
        onLocationClick={filterByLocation}
      />
    </div>
  );
};

export default App;
