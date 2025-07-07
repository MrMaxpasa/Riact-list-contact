import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactCard from '../components/ContactCard.jsx';
import ModalConfirm from '../components/ModalConfirm.jsx';
import { ContactContext } from '../context/ContactContext.jsx';

export const AgendaContacts = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    agendaContacts,
    loading,
    error,
    fetchAgendaContacts,
    addContactToAgenda,
    removeContactFromAgenda
  } = useContext(ContactContext);

  // Cambiado a usar 'name' para cumplir contrato de la API
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    fetchAgendaContacts(slug);
  }, [slug]);

  const handleCreate = () => {
    addContactToAgenda(slug, newContact);
    setNewContact({ name: '', email: '', phone: '', address: '' });
  };

  const handleDelete = id => { setToDelete(id); setModalOpen(true); };
  const confirmDelete = () => { removeContactFromAgenda(slug, toDelete); setModalOpen(false); };

  if (loading) return <p className="loading">Loading contacts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="view-title">Contacts in "{slug}"</h2>

      <div className="create-form">
        <input
          className="input"
          placeholder="Full Name"
          name="name"
          value={newContact.name}
          onChange={e => setNewContact(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Email"
          name="email"
          value={newContact.email}
          onChange={e => setNewContact(prev => ({ ...prev, email: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Phone"
          name="phone"
          value={newContact.phone}
          onChange={e => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Address"
          name="address"
          value={newContact.address}
          onChange={e => setNewContact(prev => ({ ...prev, address: e.target.value }))}
        />
        <button className="btn-primary" onClick={handleCreate}>Add to Agenda</button>
      </div>

      <div className="contacts-list">
        {agendaContacts.map(c => (
          <ContactCard key={c.id} contact={c} onDelete={() => handleDelete(c.id)} />
        ))}
      </div>

      <ModalConfirm
        isOpen={modalOpen}
        message="Remove this contact?"
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};