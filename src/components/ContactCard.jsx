import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Phone, Mail, Edit2, Trash2 } from 'lucide-react';

import duck1 from '../assets/ducks/duck1.png';
import duck2 from '../assets/ducks/duck2.png';
import duck3 from '../assets/ducks/duck3.png';
import duck4 from '../assets/ducks/duck4.png';
import duck5 from '../assets/ducks/duck5.png';

const DUCKS = [duck1, duck2, duck3, duck4, duck5];

const getAvatarUrl = (id) => {
  if (typeof window === 'undefined') return DUCKS[0];
  const key = `contact_avatar_${id}`;
  let avatar = localStorage.getItem(key);
  if (!avatar) {
    const index = Math.floor(Math.random() * DUCKS.length);
    avatar = DUCKS[index];
    localStorage.setItem(key, avatar);
  }
  return avatar;
};

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const avatarUrl = contact.avatar || getAvatarUrl(contact.id);

  return (
    <div className="contact-card">
      <img
        src={avatarUrl}
        alt={`Avatar de ${contact.name}`}
        className="avatar"
        onError={e => {
          e.target.onerror = null;
          e.target.src = duck1;
        }}
      />
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <div className="contact-line">
          <MapPin size={16} /> <span>{contact.address}</span>
        </div>
        <div className="contact-line">
          <Phone size={16} /> <span>{contact.phone}</span>
        </div>
        <div className="contact-line">
          <Mail size={16} /> <span>{contact.email}</span>
        </div>
      </div>
      <div className="contact-actions">
        {onEdit && (
          <button onClick={() => onEdit(contact)}>
            <Edit2 size={18} />
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(contact.id)}>
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id:      PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name:    PropTypes.string,
    address: PropTypes.string,
    phone:   PropTypes.string,
    email:   PropTypes.string,
    avatar:  PropTypes.string
  }).isRequired,
  onEdit:   PropTypes.func,
  onDelete: PropTypes.func
};

export default ContactCard;
