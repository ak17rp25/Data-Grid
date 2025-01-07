const Dropdown = ({ options, onChange, value, label }) => (
  <div className="dropdown-container">
    <label>{label}</label>
    <select onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
