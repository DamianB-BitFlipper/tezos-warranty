import PropTypes from 'prop-types';
export function InputTextField({ placeholder, value, onChange, disabled }) {
    return (
        <input
          className="input-box"
          type="text"
          value={ value }
          onInput={ (e) => onChange(e.target.value) }
          placeholder={ placeholder }
          disabled={ disabled }
        />
    );
}

InputTextField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export function InputNumberField({ placeholder, value, onChange, disabled }) {
    return (
        <input
          className="input-box"
          type="number"
          value={ value }
          onInput={ (e) => onChange(e.target.value) }
          placeholder={ placeholder }
          disabled={ disabled }
        />
    );
}

InputNumberField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};
