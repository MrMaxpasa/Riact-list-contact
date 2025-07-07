import React, { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const API_URL = 'https://playground.4geeks.com/contact';
  const [agendas, setAgendas] = useState([]);
  const [agendaContacts, setAgendaContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgendas();
  }, []);

  const fetchAgendas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas?offset=0&limit=100`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setAgendas(data);
      } else if (data && Array.isArray(data.agendas)) {
        setAgendas(data.agendas);
      } else {
        console.error('fetchAgendas: unexpected response', data);
        setAgendas([]);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error loading agendas');
      setAgendas([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgendaContacts = async slug => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/agendas/${encodeURIComponent(slug)}/contacts`);
      const data = await res.json();
      setAgendaContacts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error loading agenda contacts');
      setAgendaContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const addContactToAgenda = async (slug, contact) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/agendas/${encodeURIComponent(slug)}/contacts`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: contact.name, phone: contact.phone, email: contact.email, address: contact.address })
        }
      );
      const result = await res.json();
      if (!res.ok) {
        console.error('addContactToAgenda error:', result);
        setError(`Error adding contact: ${result.msg || res.status}`);
        return;
      }
      setAgendaContacts(prev => [...prev, result]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error adding contact to agenda');
    } finally {
      setLoading(false);
    }
  };

  const removeContactFromAgenda = async (slug, contactId) => {
    setLoading(true);
    try {
      await fetch(
        `${API_URL}/agendas/${encodeURIComponent(slug)}/contacts/${contactId}`,
        { method: 'DELETE' }
      );
      setAgendaContacts(prev => prev.filter(c => c.id !== contactId));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error removing contact from agenda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider value={{
      agendas,
      agendaContacts,
      loading,
      error,
      fetchAgendas,
      fetchAgendaContacts,
      addContactToAgenda,
      removeContactFromAgenda
    }}>
      {children}
    </ContactContext.Provider>
  );
};