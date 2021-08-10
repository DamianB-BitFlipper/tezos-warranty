import PropTypes from 'prop-types';
import signs from './signs';

export default function OperationSelector({ sign, setSign, isLoading }) {
  return (
    <select
      name=""
      value={sign}
      onChange={(e) => {
        setSign(e.target.value);
      }}
      disabled={isLoading}
    >
      <option value={signs.PLUS}>Add</option>
      <option value={signs.MINUS}>Subtract</option>
      <option value={signs.MUL}>Multiply</option>
      <option value={signs.DIV}>Divide</option>
    </select>
  );
}

OperationSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setSign: PropTypes.func,
  sign: PropTypes.oneOf(Object.values(signs)).isRequired,
};
