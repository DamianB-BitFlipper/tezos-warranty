import { useEffect } from 'react';

import useBeacon from 'hooks/use-beacon';

import Warranty from 'components/Warranty/Warranty';
import warrantyData from 'data/warranty.json';

export default function WarrantyPage({ contract }) {
    const { connect, pkh } = useBeacon();

    useEffect(() => {
        connect();
    }, [connect]);

    if (!pkh) {
        return null;
    }

    return <Warranty contractAddress={ contract.address } userAddress={ pkh } />;
}

export function getStaticProps() {
    return { props: { contract: warrantyData.contract } };
}
