import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter/Filter";
import Notification from "./components/Notification";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.find((contact) => contact.name === name)) {
      setNotification(`${name} is already in contacts.`);
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    const newContact = { id: Date.now(), name, number };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h1>Phone Book</h1>
      {notification && <Notification message={notification} />}
      <ContactForm addContact={addContact} />
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;