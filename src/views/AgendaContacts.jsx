jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactCard from '../components/ContactCard.jsx';
import ModalConfirm from '../components/ModalConfirm.jsx';
import { ContactContext } from '../context/ContactContext.jsx';

export const AgendaContacts = () => {
  const { slug } = useParams();
  const { agendaContacts, loading, error, fetchAgendaContacts, addContactToAgenda, removeContactFromAgenda } = useContext(ContactContext);
  const [newContact, setNewContact] = useState({ name:'', email:'', phone:'', address:'' });
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => { fetchAgendaContacts(slug); }, [slug]);
  const handleCreate = () => { addContactToAgenda(slug, newContact); setNewContact({ name:'',email:'',phone:'',address:'' }); };
  const handleDelete = id => { setToDelete(id); setModalOpen(true); };
  const confirmDelete = () => { removeContactFromAgenda(slug, toDelete); setModalOpen(false); };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h1>Contacts in {slug}</h1>
      <div className="create-form">
        <input placeholder="Name" value={newContact.name} onChange={e=>setNewContact(prev=>({...prev,name:e.target.value}))} />
        <input placeholder="Email" value={newContact.email} onChange={e=>setNewContact(prev=>({...prev,email:e.target.value}))} />
        <input placeholder="Phone" value={newContact.phone} onChange={e=>setNewContact(prev=>({...prev,phone:e.target.value}))} />
        <input placeholder="Address" value={newContact.address} onChange={e=>setNewContact(prev=>({...prev,address:e.target.value}))} />
        <button onClick={handleCreate}>Add to Agenda</button>
      </div>
      {agendaContacts.map(c => <ContactCard key={c.id} contact={c} onDelete={handleDelete} />)}
      <ModalConfirm isOpen={modalOpen} message="Remove this contact?" onConfirm={confirmDelete} onCancel={()=>setModalOpen(false)} />
    </div>
  );
};