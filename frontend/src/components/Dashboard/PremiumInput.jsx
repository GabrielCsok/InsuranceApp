import React, { useState } from 'react';

const PremiumInput = ({ id, initialValue, onCommit }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="number"
      className="form-control"
      value={value}
      placeholder="Enter premium amount"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onCommit(id, 'premiumAmount', value)}
    />
  );
};

export default PremiumInput;