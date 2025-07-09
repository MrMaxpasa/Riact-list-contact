import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export const Agendas = () => {
  const { agendas, loading, error, fetchAgendas, createAgenda } = useContext(ContactContext);
  const [newSlug, setNewSlug] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendas();
  }, []);

  const handleAdd = async () => {
    if (!newSlug.trim()) return;
    const agenda = await createAgenda(newSlug.trim());
    if (agenda) {
      
      navigate(`/agendas/${encodeURIComponent(agenda.slug)}/contacts`);
    }
  };

  if (loading) return <p className="loading">Loading agendas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h2 className="view-title">Elige una agenda</h2>

      <div className="create-form" style={{ marginBottom: '1rem' }}>
        <input
          className="input"
          placeholder="Nombre de la nueva agenda"
          value={newSlug}
          onChange={e => setNewSlug(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAdd}>
          Crear y abrir
        </button>
      </div>

      <ul className="agenda-list">
        {Array.isArray(agendas) && agendas.map(a => (
          <li
            key={a.id}
            className="agenda-item"
            onClick={() => navigate(`/agendas/${encodeURIComponent(a.slug)}/contacts`)}
          >
            {a.name || a.slug}
          </li>
        ))}
      </ul>
    </div>
  );
};