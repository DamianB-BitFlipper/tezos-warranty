import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useWarrantyInput } from './useWarrantyInput';
import clsx from 'clsx';
import styles from './Warranty.module.css';
import Layout from 'components/Layout';

export default function Warranty({ contractAddress, userAddress }) {
    const { submit, isLoading, connect, currentStorage } = useWarrantyInput();

    useEffect(async () => {
        await connect(contractAddress);

        if (currentStorage != false) {
            console.log(currentStorage);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contractAddress, currentStorage]);

    return (
        <Layout
          userAddress={userAddress}
          contractAddress={contractAddress}
          title="Warranty"
        >

          <div className={styles.wrapper}>
            <div className={clsx(styles.horizontalContainer, styles.warrantyApp)}>

            </div>
          </div>

        </Layout>
    );
}

Warranty.propTypes = {
    contractAddress: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
};
