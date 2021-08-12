import PropTypes from 'prop-types';
import styles from './Warranty.module.css';

export default function UserPanel({
    id, 
    userNFTs
}) {
    const TableRow = (nft, i) => (
        <tr>
          <td>{nft.issuer}</td>
          <td>{nft.serial_number}</td>
          <td>{nft.issue_time}</td>
        </tr>
    );

    console.log(userNFTs);

    return (
        <div id={ id } className={ styles.tabcontent }>
          <h3>User Panel</h3>

          <table>
            <thead>    
              <tr>
                <th>Issuer</th>
                <th>Serial Number</th>
                <th>Issue Time</th>
              </tr>
              { userNFTs.map((nft, i) => TableRow(nft, i)) }
            </thead>
          </table>
        </div>
    );
}

UserPanel.propTypes = {
    id: PropTypes.string.isRequired,
    userNFTs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
