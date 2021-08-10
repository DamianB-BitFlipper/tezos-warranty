import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ contractAddress, userAddress }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <nav className="border-bottom border border-gray-100 bg-white py-3 px-5 fixed top-0 left-0 right-0 flex lg:flex-row flex-col justify-between items-center">
      <Link href={`/`}>
        <a className="">
          <Image src="/horizontal_logo_blue.svg" width="128" height="54" alt="Tezos logo"/>
        </a>
      </Link>
      <ul className="flex lg:flex-row flex-col lg:px-0 px-3 items-center h-full justify-center">
        <li className="lg:relative lg:top-auto lg:left-auto absolute top-6 left-3">
          <Link href={`/`}>
            <a className="py-3 px-5 text-blue-600 text-sm">Back</a>
          </Link>
        </li>
        <li className="lg:my-0 my-2">
          <pre className="bg-gray-200 text-gray-800 whitespace-pre-line lg:whitespace-nowrap lg:rounded-full rounded-md px-3 py-2 lg:text-sm text-xs">
            Contract Address: {contractAddress}
          </pre>
        </li>
        <li className="lg:ml-3">
          <pre className="bg-gray-800 text-white whitespace-pre-line lg:whitespace-nowrap lg:rounded-full rounded-md px-3 py-2 lg:text-sm text-xs">
            Your Address: {userAddress}
          </pre>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  userAddress: PropTypes.string.isRequired,
};
