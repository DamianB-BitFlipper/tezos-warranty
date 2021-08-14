import PropTypes from 'prop-types';
import { useState } from 'react';

import { InputTextField } from './InputField';
import styles from './Warranty.module.css';

import { hexDecode } from './utils.js';

function TableHeader() {
    return (
        <tr>
          <th>Select</th>
          <th>Issuer</th>
          <th className={ styles.smallCol }>Serial Number</th>
          <th>Issue Time</th>
          <th>Warranty Duration</th>
          <th className={ styles.smallCol }>Warranty Conditions</th>
          <th>Transfers Remaining</th>
        </tr>
    );
}

function TableRow(id, nft) {
    return (
        <tr key={ id }>
          <td className={ styles.textCentered }>
            <input name="nft" type="checkbox" value={ id }/>
          </td>
          <td>{ nft.issuer }</td>
          <td className={ styles.smallCol }>{ nft.serial_number }</td>
          <td>{ nft.issue_time }</td>
          <td>{ nft.warranty_duration.toNumber() }</td>
          <td className={ styles.smallCol }>{ hexDecode(nft.link_to_warranty_conditions) }</td>
          <td>{ nft.num_transfers_allowed.toNumber() }</td>
        </tr>
    );
}

export default function UserPanel({
    id,
    userAddress,
    userNFTs,
    transfer
}) {
    const [recipient, setRecipient] = useState('');

    const getSelectedNFT_tokenIDs = () => {
        var token_ids = [];
        var checkboxes = document.querySelectorAll('input[name="nft"]:checked');
        checkboxes.forEach((el) => {
            const token_id = userNFTs[el.value].token_id;
            token_ids.push(token_id);
        });
        return token_ids;
    };

    return (
        <div id={ id } className={ styles.tabcontent }>
          <table>
            <thead>    
              <TableHeader/>
              { userNFTs.map((nft, i) => TableRow(i, nft)) }
            </thead>
          </table>
          <div className={ styles.opForm }>
            <InputTextField
              label="Recipient Address"
              value={ recipient }
              disabled={ false }
              onChange={ setRecipient }
            />
          </div>
            <button onClick={ (_e) => transfer(userAddress, 
                                               recipient, 
                                               getSelectedNFT_tokenIDs()) }>Transfer</button>
        </div>
    );
}

UserPanel.propTypes = {
    id: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
    userNFTs: PropTypes.arrayOf(PropTypes.object).isRequired,
    transfer: PropTypes.func.isRequired,
};
