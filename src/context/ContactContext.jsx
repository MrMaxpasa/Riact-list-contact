
import React, { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const API_URL = 'https://playground.4geeks.com/contact';
  const [contacts, setContacts] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [agendaContacts, setAgendaContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
    fetchAgendas();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Error loading contacts');
    } finally { setLoading(false); }
  };

  const addContact = async contact => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      const newContact = await res.json();
      setContacts(prev => [...prev, newContact]);
    } catch {
      setError('Error creating contact');
    } finally { setLoading(false); }
  };

  const updateContact = async (id, updated) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      setContacts(prev => prev.map(c => c.id === id ? data : c));
    } catch {
      setError('Error updating contact');
    } finally { setLoading(false); }
  };

  const deleteContact = async id => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch {
      setError('Error deleting contact');
    } finally { setLoading(false); }
  };

  const fetchAgendas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas?offset=0&limit=100`);
      const data = await res.json();
      setAgendas(data);
    } catch {
      setError('Error loading agendas');
    } finally { setLoading(false); }
  };

  const createAgenda = async slug => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}`, { method: 'POST' });
      const newAgenda = await res.json();
      setAgendas(prev => [...prev, newAgenda]);
    } catch {
      setError('Error creating agenda');
    } finally { setLoading(false); }
  };

  const fetchAgendaBySlug = async slug => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}`);
      const data = await res.json();
      setSelectedAgenda(data);
    } catch {
      setError('Error loading agenda');
    } finally { setLoading(false); }
  };

  const fetchAgendaContacts = async slug => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}/contacts`);
      const data = await res.json();
      setAgendaContacts(data);
    } catch {
      setError('Error loading agenda contacts');
    } finally { setLoading(false); }
  };

  const addContactToAgenda = async (slug, contact) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      const newContact = await res.json();
      setAgendaContacts(prev => [...prev, newContact]);
    } catch {
      setError('Error adding contact to agenda');
    } finally { setLoading(false); }
  };

  const removeContactFromAgenda = async (slug, contactId) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}/contacts/${contactId}`, { method: 'DELETE' });
      setAgendaContacts(prev => prev.filter(c => c.id !== contactId));
    } catch {
      setError('Error removing contact from agenda');
    } finally { setLoading(false); }
  };

  return (
    <ContactContext.Provider value={{
      contacts,
      agendas,
      selectedAgenda,
      agendaContacts,
      loading,
      error,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
      fetchAgendas,
      createAgenda,
      fetchAgendaBySlug,
      fetchAgendaContacts,
      addContactToAgenda,
      removeContactFromAgenda
    }}>
      {children}
    </ContactContext.Provider>
  );
};
