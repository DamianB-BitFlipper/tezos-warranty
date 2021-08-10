import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Banner.module.css';

function Banner({ banner }) {
  return (
    <div
      className={classnames('text-center w-full py-20 mb-24', styles.banner)}
    >
      <h2 className="font-bold lg:text-3xl text-2xl mb-8">{banner.title}</h2>
      <a
        href={banner.button.link}
        className="bg-blue-600 rounded-lg py-3 px-8 text-white shadow-lg"
      >
        {banner.button.label}
      </a>
    </div>
  );
}

Banner.propTypes = {
  banner: PropTypes.shape({
    title: PropTypes.string.isRequired,
    button: PropTypes.shape({
      link: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
};

export default Banner;
