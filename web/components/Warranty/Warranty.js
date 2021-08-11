import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useWarrantyInput } from './useWarrantyInput';
import clsx from 'clsx';
import styles from './Warranty.module.css';
import { openTab } from './Warranty.module.js';
import Layout from 'components/Layout';

export default function Warranty({ contractAddress, userAddress }) {
    const { connect, mint, isLoading, currentStorage } = useWarrantyInput();
    const [isAdmin, setIsAdmin] = useState(false);
    const [userNFTs, setUserNFTs] = useState([]);

    useEffect(async () => {
        await connect(contractAddress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contractAddress]);

    useEffect(async () => {
        if (currentStorage != null) {
            const admin = currentStorage.admin.admin;
            if (admin === userAddress) {
                setIsAdmin(true);
            }

            // Form the user's NFTs
            const nfts = await currentStorage.reverse_ledger.get(userAddress); 
            nfts.forEach(async (nft) => {
                const metadata = await currentStorage.token_metadata.get(nft.toString());
                setUserNFTs(prev => [...prev, metadata.token_info.serial_number]);
            });

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStorage]);

    var adminButton = null;
    if (isAdmin) {
        adminButton = <button className={ styles.tablinks } onClick={ (e) => openTab(e, "admin-panel") }>Admin Panel</button>;
    }

    return (
        <Layout
          userAddress={userAddress}
          contractAddress={contractAddress}
          title="Warranty"
        >

          <div className={ styles.wrapper }>
            <div className={ clsx(styles.horizontalContainer, styles.warrantyApp) }>
              <div className={ styles.tab }>
                { adminButton }
                <button className={ styles.tablinks } onClick={ (e) => openTab(e, "user-panel") }>User Panel</button>
              </div>

              <div id="admin-panel" className={ styles.tabcontent }>
                <h3>Admin Panel</h3>
                <button onClick={ (e) => mint() }>Mint NFT</button>
              </div>

              <div id="user-panel" className={ styles.tabcontent }>
                <h3>User Panel</h3>
                <p>{ userNFTs.toString() }</p> 
              </div>

            </div>
          </div>

        </Layout>
    );
}

Warranty.propTypes = {
    contractAddress: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
};
