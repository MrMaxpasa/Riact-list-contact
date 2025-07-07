
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext.jsx';
import { Contact } from './views/Contact.jsx';
import { AddContact } from './views/AddContact.jsx';
import { Agendas } from './views/Agendas.jsx';
import { AgendaDetail } from './views/AgendaDetail.jsx';
import { AgendaContacts } from './views/AgendaContacts.jsx';

const App = () => (
  <ContactProvider>
    <Router>
      <nav className="nav-bar">
        <Link to="/">Contacts</Link> |
        <Link to="/add">Add Contact</Link> |
        <Link to="/agendas">Agendas</Link>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/agendas" element={<Agendas />} />
          <Route path="/agendas/:slug" element={<AgendaDetail />} />
          <Route path="/agendas/:slug/contacts" element={<AgendaContacts />} />
        </Routes>
      </main>
    </Router>
  </ContactProvider>
);

export default App;