import PropTypes from 'prop-types';
import InputField from './InputField';
import OperationSelector from './OperationSelector';
import signs from './signs';
import styles from './Calculator.module.css';

export default function UserPanel({
  loading,
  onSubmit,
  firstInt,
  secondInt,
  setFirstInt,
  setSecondInt,
  sign,
  setSign,
}) {
  return (
    <>
      <div className={styles.opForm}>
        <InputField
          value={firstInt}
          onChange={setFirstInt}
          disabled={loading}
        />
        <OperationSelector
          sign={sign}
          setSign={setSign}
          signs={signs}
          isLoading={loading}
        />
        <InputField
          value={secondInt}
          onChange={setSecondInt}
          disabled={loading}
        />
      </div>
      <button
        type="button"
        className="submit-btn"
        onClick={() => onSubmit(firstInt, secondInt, sign)}
        disabled={loading}
      >
        SUBMIT
      </button>
    </>
  );
}

UserPanel.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  firstInt: PropTypes.number.isRequired,
  secondInt: PropTypes.number.isRequired,
  setFirstInt: PropTypes.func.isRequired,
  setSecondInt: PropTypes.func.isRequired,
  sign: PropTypes.string.isRequired,
  setSign: PropTypes.func.isRequired,
};
