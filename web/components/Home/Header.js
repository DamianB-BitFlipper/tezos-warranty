import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import Image from 'next/image';

function Header({ title, buttonLabel, buttonLink, description }) {
  return (
    <div className="header text-center mx-auto lg:w-2/4 py-24">
      <div className="logo">
        <Image src="/logo_blue.svg" width="84" height="178" alt="tezos logo"/>
      </div>
      <div className="header-content">
        <h1
          className={classnames(
            'font-bold lg:text-3xl text-2xl lg:my-14 mt-4 mb-11 relative',
            styles.headerTitle
          )}
        >
          {title}
        </h1>
        <p className="text-gray-500 mb-6 lg:px-0 px-6">{description}</p>
        <a
          href={buttonLink}
          className="bg-blue-600 rounded-lg py-3 px-6 text-white shadow-lg"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Header;
