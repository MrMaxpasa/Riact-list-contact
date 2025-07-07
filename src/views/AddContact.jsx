
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export const AddContact = () => {
  const { addContact, contacts, updateContact } = useContext(ContactContext);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', address: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const existing = contacts.find(c => c.id.toString() === id);
      if (existing) setForm(existing);
    }
  }, [id, contacts]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); if (id) updateContact(id, form); else addContact(form); navigate('/'); };

  return (
    <div className="view-container">
      <h1>{id ? 'Edit Contact' : 'Add Contact'}</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Full Name:<input name="full_name" value={form.full_name} onChange={handleChange} required /></label>
        <label>Email:<input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        <label>Phone:<input name="phone" value={form.phone} onChange={handleChange} /></label>
        <label>Address:<input name="address" value={form.address} onChange={handleChange} /></label>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};
