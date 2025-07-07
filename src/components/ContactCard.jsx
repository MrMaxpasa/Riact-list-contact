
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ContactCard = ({ contact, onDelete }) => (
  <div className="contact-card">
    <h3>{contact.full_name}</h3>
    <p>{contact.email}</p>
    <p>{contact.phone}</p>
    <p>{contact.address}</p>
    <div className="actions">
      <Link to={`/edit/${contact.id}`}><button>Edit</button></Link>
      {onDelete && <button onClick={() => onDelete(contact.id)}>Delete</button>}
    </div>
  </div>
);

ContactCard.propTypes = { contact: PropTypes.object.isRequired, onDelete: PropTypes.func };
export default ContactCard;
