import PropTypes from 'prop-types';
import Image from 'next/image';

export default function ConnectWallet({ contractAddress, onSubmit }) {
  return (
    <div className="connect-section flex justify-center items-center h-full flex-col">
      <div className="form-group flex  flex-col mb-5 text-center">
        <div className="logo mb-4">
          <Image src="/logo_blue.svg" width="300" height="210" alt="tezos logo"/>
        </div>
        <label className="text-md mb-3 text-left text-gray-700">
          Warranty Contract Address: { contractAddress }
        </label>
      </div>
      <button
        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2"
        onClick={onSubmit}
      >
        Connect Wallet
      </button>
    </div>
  );
}

ConnectWallet.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
