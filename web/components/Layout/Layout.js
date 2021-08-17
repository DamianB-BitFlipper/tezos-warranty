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
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Issue and keep track of warranties in the form of NFTs."
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
