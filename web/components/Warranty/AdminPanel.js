import PropTypes from 'prop-types';
import styles from './Warranty.module.css';

export default function AdminPanel({ id, mint }) {
  return (
      <div id={ id } className={ styles.tabcontent }>
        <h3>Admin Panel</h3>
        <button onClick={ (_e) => mint() }>Mint NFT</button>
      </div>

  );
}

AdminPanel.propTypes = {
  id: PropTypes.string.isRequired,
  mint: PropTypes.func.isRequired,
};
