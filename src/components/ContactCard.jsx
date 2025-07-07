import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ContactCard = ({ contact, onDelete }) => (
  <div className="contact-card">
    <h3 className="contact-name">{contact.name || contact.full_name}</h3>
    <p className="contact-email">{contact.email}</p>
    <p className="contact-phone">{contact.phone}</p>
    <p className="contact-address">{contact.address}</p>
    <div className="actions">
      <Link to={`/edit/${contact.id}`}> 
        <button className="btn-edit">Edit</button>
      </Link>
      {onDelete && (
        <button className="btn-delete" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      )}
    </div>
  </div>
);

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    full_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func
};

export default ContactCard;