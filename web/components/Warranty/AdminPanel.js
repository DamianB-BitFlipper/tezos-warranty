import PropTypes from 'prop-types';
import { useState } from 'react';

import { InputTextField, InputNumberField } from './InputField';
import styles from './Warranty.module.css';

import { hexEncode } from './utils.js';

export default function AdminPanel({ id, mint }) {
    // The mint input parameters
    const [owner, setOwner] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [warrantyDuration, setWarrantyDuration] = useState(0);
    const [warrantyConditions, setWarrantyConditions] = useState('');
    const [numTransfersAllowed, setNumTransfersAllowed] = useState(0);

    // TODO: Make all of the `disabled` fields work
    return (
        <div id={ id } className={ styles.tabcontent }>
          <h3>Admin Panel</h3>
          <div className={styles.opForm}>
            <InputTextField
              placeholder="Input recipient address"
              value={ owner }
              disabled={ false }
              onChange={ setOwner }
            />
            <InputTextField
              placeholder="Input serial number"
              value={ serialNumber }
              disabled={ false }
              onChange={ setSerialNumber }
            />
            <InputNumberField
              placeholder="Input warranty duration (days)"
              value={ warrantyDuration }
              disabled={ false }
              onChange={ setWarrantyDuration }
            />
            <InputTextField
              placeholder="Input warranty conditions (URL)"
              value={ warrantyConditions }
              disabled={ false }
              onChange={ setWarrantyConditions }
            />
            <InputNumberField
              placeholder="Input number of transfers allowed"
              value={ numTransfersAllowed }
              disabled={ false }
              onChange={ setNumTransfersAllowed }
            />
          </div>
          <button onClick={ (_e) => mint(owner, 
                                         serialNumber, 
                                         warrantyDuration, 
                                         hexEncode(warrantyConditions), 
                                         numTransfersAllowed) }>Mint NFT</button>
        </div>

    );
}

AdminPanel.propTypes = {
    id: PropTypes.string.isRequired,
    mint: PropTypes.func.isRequired,
};
