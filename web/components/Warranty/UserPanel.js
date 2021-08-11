import PropTypes from 'prop-types';
import styles from './Warranty.module.css';

export default function UserPanel({
    id, 
    userNFTs
}) {
    return (
        <div id={ id } className={ styles.tabcontent }>
          <h3>User Panel</h3>

          <table>
            <thead>    
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
              </tr>
              <tr>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
              </tr>
            </thead>
          </table>

          <p>{ userNFTs }</p> 
        </div>
    );
}

UserPanel.propTypes = {
    id: PropTypes.string.isRequired,
    userNFTs: PropTypes.string.isRequired,
};
