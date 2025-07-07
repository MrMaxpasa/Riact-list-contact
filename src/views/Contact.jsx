
import React, { useContext, useState } from 'react';
import { ContactContext } from '../context/ContactContext.jsx';
import ContactCard from '../components/ContactCard.jsx';
import ModalConfirm from '../components/ModalConfirm.jsx';

export const Contact = () => {
  const { contacts, loading, error, deleteContact } = useContext(ContactContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const handleDelete = id => { setToDelete(id); setModalOpen(true); };
  const confirmDelete = () => { deleteContact(toDelete); setModalOpen(false); };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h1>Contacts</h1>
      {contacts.length === 0 ? <p>No contacts available.</p> : contacts.map(c => <ContactCard key={c.id} contact={c} onDelete={handleDelete} />)}
      <ModalConfirm isOpen={modalOpen} message="Are you sure?" onConfirm={confirmDelete} onCancel={() => setModalOpen(false)} />
    </div>
  );
};
