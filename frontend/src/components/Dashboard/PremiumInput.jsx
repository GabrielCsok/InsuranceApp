import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Premium Input Component
 * Used to keep React from updating the Premium Amount field in the InsurancesTable Component
 * so that the user can input it without losing focus every single input
 * 
 * @returns {JSX.Element} A form input
 */
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

// PropTypes definition to ensure the component receives the correct props
PremiumInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onCommit: PropTypes.func.isRequired,
};

export default PremiumInput;