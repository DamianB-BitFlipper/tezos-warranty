import PropTypes from 'prop-types';
export default function InputField({ value, onChange, disabled }) {
  return (
    <input
      className="input-box"
      type="number"
      value={value || ''}
      onInput={(e) => onChange(+e.target.value)}
      placeholder="input integer"
      disabled={disabled}
    />
  );
}

InputField.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
