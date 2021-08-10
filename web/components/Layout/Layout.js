import Head from 'next/head';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
export default function Layout({
  children,
  userAddress,
  contractAddress,
  title,
}) {
  return (
    <>
      <Head>
        <title>{title} - Tezos Israel</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Learn Tezos smart contract syntax and functionality in a range of coding languages."
        />
      </Head>
      <Navbar contractAddress={contractAddress} userAddress={userAddress} />
      <div className="w-full h-full mt-20">{children}</div>
    </>
  );
}

Layout.propTypes = {
  userAddress: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
