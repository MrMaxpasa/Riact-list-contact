import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export const Agendas = () => {
  const { agendas, loading, error, fetchAgendas } = useContext(ContactContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendas();
  }, []);

  if (loading) return <p className="loading">Loading agendas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h2 className="view-title">Elige una agenda</h2>
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