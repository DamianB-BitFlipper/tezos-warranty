import Image from 'next/image';
import PropTypes from 'prop-types';
function Contacts({ contactsList }) {
  return (
    <div className="w-full flex justify-center lg:flex-row flex-col lg:px-0 px-10">
      {contactsList.map((item, index) => {
        return (
          <a
            href={item.url}
            className={`${item.btnBg} rounded-lg px-10 py-2 inline-flex justify-center items-center lg:mx-2 lg:mb-0 mb-5`}
            key={index}
          >
            <Image src={item.icon} width="120" height="35" alt={`Tezos ${item.title} address`}/>
          </a>
        );
      })}
    </div>
  );
}

Contacts.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      btnBg: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
};

export default Contacts;
