import PropTypes from 'prop-types';
import styles from './Warranty.module.css';

export function InputTextField({ label, value, onChange, disabled }) {
    const inputElement = 
          <input
            className={ styles.inputBox }
            type="text"
            value={ value }
            onInput={ (e) => onChange(e.target.value) }
            disabled={ disabled }
          />;

    var ret;
    if (label != '') {
        ret = <div className={ styles.horizontalContainer }>
                <label>
                  { label }:
                </label>
                { inputElement }
              </div>;
    } else {
        ret = inputElement;
    }

    return ret;
}

InputTextField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export function InputNumberField({ label, value, onChange, disabled }) {
    const inputElement = 
        <input
          className={ styles.inputBox }
          type="number"
          value={ value }
          onInput={ (e) => onChange(Number(e.target.value)) }
          disabled={ disabled }
        />;

    var ret;
    if (label != '') {
        ret = <div className={ styles.horizontalContainer }>
                <label>
                  { label }:
                </label>
                { inputElement }
              </div>;
    } else {
        ret = inputElement;
    }

    return ret;
}

InputNumberField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};
