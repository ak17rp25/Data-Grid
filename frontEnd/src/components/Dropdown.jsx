const Dropdown = ({ options, onChange, value, label }) => {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option || 'Select...'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
