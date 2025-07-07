export const Agendas = () => {
  const { agendas, loading, error, createAgenda } = useContext(ContactContext);
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!slug) return;
    createAgenda(slug);
    setSlug('');
  };

  if (loading) return <p>Loading agendas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h1>Agendas</h1>
      <div className="create-form">
        <input
          placeholder="Agenda Slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <ul>
        {agendas.map(a => (
          <li
            key={a.id}
            onClick={() => navigate(`/agendas/${a.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            {a.name || a.slug}
          </li>
        ))}
      </ul>
    </div>
  );
};