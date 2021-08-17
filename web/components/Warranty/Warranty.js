import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useWarrantyInput } from './useWarrantyInput';
import clsx from 'clsx';
import styles from './Warranty.module.css';
import { openTab } from './Warranty.module.js';
import Layout from 'components/Layout';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';

export default function Warranty({ contractAddress, userAddress }) {
    const { connect, mint, transfer, isLoading, currentStorage } = useWarrantyInput();
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

            // Format the user's NFTs
            var token_infos = [];
            const nfts = await currentStorage.reverse_ledger.get(userAddress); 
            for (const nft of nfts) {
                const metadata = await currentStorage.token_metadata.get(nft.toString());
                // Push a copy of the `token_info`
                token_infos.push({...metadata.token_info, token_id: nft});
            }
            setUserNFTs(token_infos);
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
          title="NFT Warranties"
        >
          <div className={ styles.wrapper }>
            <div className={ clsx(styles.horizontalContainer, styles.warrantyApp) }>
              <div className={ clsx(styles.verticalContainer, styles.tab) }>
                { adminButton }
                <button className={ styles.tablinks } onClick={ (e) => openTab(e, "user-panel") }>User Panel</button>
              </div>

              <AdminPanel
                id='admin-panel'
                mint={ mint }
              >
              </AdminPanel>

              <UserPanel
                id='user-panel'
                userAddress={ userAddress }
                userNFTs={ userNFTs }
                transfer={ transfer }
              >
              </UserPanel>

            </div>
          </div>

        </Layout>
    );
}

Warranty.propTypes = {
    contractAddress: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
};
