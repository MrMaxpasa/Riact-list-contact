import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext.jsx';
import { Agendas } from './views/Agendas.jsx';
import { AgendaContacts } from './views/AgendaContacts.jsx';

const App = () => (
  <ContactProvider>
    <Router>
      <header className="nav-bar">
        <h1 className="app-title">Mi Agenda de Contactos</h1>
      </header>
      <main className="main-content">
        <Routes>
          
          <Route path="/" element={<Agendas />} />
          
          <Route path="/agendas/:slug/contacts" element={<AgendaContacts />} />
        </Routes>
      </main>
    </Router>
  </ContactProvider>
);

export default App;