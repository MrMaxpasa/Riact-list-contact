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
    removeContactFromAgenda,
    updateContactInAgenda
  } = useContext(ContactContext);

  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editErrors, setEditErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (slug) fetchAgendaContacts(slug);
    
  }, [slug]);

  const validate = (contact) => {
    const errs = {};
    if (!contact.name.trim()) errs.name = 'El nombre es obligatorio.';
    if (!contact.email.includes('@')) errs.email = 'El email debe incluir @.';
    if (!/^[0-9]+$/.test(contact.phone)) errs.phone = 'El teléfono solo puede contener números.';
    if (!contact.address.trim()) errs.address = 'La dirección es obligatoria.';
    return errs;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const errs = validate(newContact);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    addContactToAgenda(slug, newContact);
    setNewContact({ name: '', email: '', phone: '', address: '' });
  };

  const handleDelete = id => { setToDelete(id); setModalOpen(true); };
  const confirmDelete = () => { removeContactFromAgenda(slug, toDelete); setModalOpen(false); };

  const handleEdit = contact => {
    setEditingId(contact.id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address
    });
    setEditErrors({});
    setEditModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const errs = validate(editForm);
    if (Object.keys(errs).length) {
      setEditErrors(errs);
      return;
    }
    setEditErrors({});
    updateContactInAgenda(slug, editingId, editForm);
    setEditModalOpen(false);
  };

  if (loading) return <p className="loading">Cargando contactos…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="view-title">Contactos en “{slug}”</h2>

      <form className="create-form" onSubmit={handleCreate} noValidate>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Full Name"
            name="name"
            value={newContact.name}
            onChange={e => setNewContact(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Email (debe incluir @)"
            name="email"
            type="email"
            value={newContact.email}
            onChange={e => setNewContact(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Phone (solo números)"
            name="phone"
            type="tel"
            pattern="[0-9]+"
            value={newContact.phone}
            onChange={e => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
          {errors.phone && <small className="error-text">{errors.phone}</small>}
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            placeholder="Address"
            name="address"
            value={newContact.address}
            onChange={e => setNewContact(prev => ({ ...prev, address: e.target.value }))}
            required
          />
          {errors.address && <small className="error-text">{errors.address}</small>}
        </div>
        <button className="btn-primary" type="submit">Añadir contacto</button>
      </form>

      <div className="contacts-list">
        {agendaContacts.length === 0 ? (
          <p>No hay contactos en esta agenda.</p>
        ) : (
          agendaContacts.map(c => (
            <ContactCard key={c.id} contact={c} onDelete={handleDelete} onEdit={handleEdit} />
          ))
        )}
      </div>

      <ModalConfirm
        isOpen={modalOpen}
        message="¿Eliminar este contacto?"
        onConfirm={confirmDelete}
        onCancel={() => setModalOpen(false)}
      />

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Contact</h3>
            <form className="contact-form" onSubmit={handleUpdate} noValidate>
              <div className="input-wrapper">
                <label className="input-label">
                  Name:
                  <input
                    className="input"
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </label>
                {editErrors.name && <small className="error-text">{editErrors.name}</small>}
              </div>
              <div className="input-wrapper">
                <label className="input-label">
                  Email:
                  <input
                    className="input"
                    type="email"
                    value={editForm.email}
                    onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </label>
                {editErrors.email && <small className="error-text">{editErrors.email}</small>}
              </div>
              <div className="input-wrapper">
                <label className="input-label">
                  Phone:
                  <input
                    className="input"
                    type="tel"
                    pattern="[0-9]+"
                    value={editForm.phone}
                    onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </label>
                {editErrors.phone && <small className="error-text">{editErrors.phone}</small>}
              </div>
              <div className="input-wrapper">
                <label className="input-label">
                  Address:
                  <input
                    className="input"
                    type="text"
                    value={editForm.address}
                    onChange={e => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </label>
                {editErrors.address && <small className="error-text">{editErrors.address}</small>}
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button type="submit" className="btn-primary" style={{ marginRight: '0.5rem' }}>
                  Save
                </button>
                <button type="button" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
