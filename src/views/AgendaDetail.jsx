import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/ContactContext.jsx';

export const AgendaDetail = () => {
  const { slug } = useParams();
  const { selectedAgenda, loading, error, fetchAgendaBySlug } = useContext(ContactContext);
  const navigate = useNavigate();
  useEffect(() => { fetchAgendaBySlug(slug); }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!selectedAgenda) return <p>No agenda found.</p>;

  return (
    <div className="view-container">
      <h1>{selectedAgenda.name||selectedAgenda.slug}</h1>
      <button onClick={() => navigate(`/agendas/${slug}/contacts`)}>View Contacts</button>
      <pre>{JSON.stringify(selectedAgenda,null,2)}</pre>
    </div>
  );
};