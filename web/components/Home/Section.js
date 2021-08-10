import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Section.module.css';

function Section({ title, children }) {
  return (
    <div className="max-w-6xl mb-24 w-full">
      <h2
        className={classnames(
          'font-bold text-xl text-center mb-14 relative',
          styles.sectionTitle
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;
