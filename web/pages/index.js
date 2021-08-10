import { useRouter } from 'next/router';

import ConnectWallet from 'components/ConnectWallet';
import warrantyData from 'data/warranty.json';

export default function Home({ contract }) {
    const router = useRouter();

    return (<ConnectWallet
            contractAddress={ contract.address }
            onSubmit={ handleConnect }
            />
           );

    async function handleConnect() {
        router.push(`/warranty`);
    }
}

export function getStaticProps() {
    return { props: { contract: warrantyData.contract } };
}
