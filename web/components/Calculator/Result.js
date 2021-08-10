import PropTypes from 'prop-types';
import { useTimedLoad } from './useTimedLoad';

import styles from './Result.module.css';

export default function Result({
  isLoading,
  result,
  firstInt,
  secondInt,
  sign,
}) {
  const timedLoad = useTimedLoad('CALCULATING');
  return (
    <div className={styles.resultView}>
      <div>{!isLoading ? `LAST COMPUTED: ${result}` : timedLoad}</div>
      <div>{`${firstInt} ${sign} ${secondInt} = ${result}`}</div>
    </div>
  );
}

Result.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  result: PropTypes.number.isRequired,
  firstInt: PropTypes.number,
  secondInt: PropTypes.number,
  sign: PropTypes.string,
};
