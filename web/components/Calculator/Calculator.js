import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Result from './Result';
import UserPanel from './UserPanel';
import { useCalculatorInput } from './useCalculatorInput';
import { useInts } from './useInts';
import clsx from 'clsx';
import styles from './Calculator.module.css';
import Layout from 'components/Layout';

export default function Calculator({ contractAddress, userAddress }) {
  const { submit, isLoading, connect, currentValue } = useCalculatorInput();
  const {
    firstInt,
    secondInt,
    setFirstInt,
    setSecondInt,
    sign,
    setSign,
  } = useInts();

  useEffect(() => {
    connect(contractAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractAddress]);

  return (
    <Layout
      userAddress={userAddress}
      contractAddress={contractAddress}
      title="Calculator"
    >
      <div className={styles.wrapper}>
        <div className={clsx(styles.horizontalContainer, styles.calculatorApp)}>
          <div className={styles.innerContainer}>
            <Result
              isLoading={isLoading}
              result={currentValue}
              firstInt={firstInt}
              secondInt={secondInt}
              sign={sign}
            />
            <div className={styles.panelContainer}>
              <UserPanel
                loading={isLoading}
                onSubmit={submit}
                firstInt={firstInt}
                secondInt={secondInt}
                setFirstInt={setFirstInt}
                setSecondInt={setSecondInt}
                sign={sign}
                setSign={setSign}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Calculator.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  userAddress: PropTypes.string.isRequired,
};
