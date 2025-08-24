
import { useState } from "react";
import { useData } from "../Context/contactContext";
import type { Contact } from "../Context/contactContext";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const ContactPage = () => {
  const { contacts, loading, addContact, updateContact, deleteContact, fetchContactsByID } = useData();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [currentContact, setCurrentContact] = useState<Contact | undefined>(undefined);

  const uniqueFilterTypes = Array.from(new Set(contacts.map(contact => contact.property_type)));

  const handleAdd = () => {
    setCurrentContact(undefined);
    setMode('add');
    setShowForm(true);
  };

  const handleEdit = async (id: number) => {
    setSelectedContactId(id);
    const contact = await fetchContactsByID(id);
    if (contact) {
      setCurrentContact(contact);
      setMode('edit');
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    deleteContact(id).then(() => {
      setSelectedContactId(null);
    });
  };

  const handleFormSubmit = (formData: FormData) => {
    if (mode === 'add') {
      addContact(formData).then(() => {
        setShowForm(false);
        setCurrentContact(undefined);
      });
    } else if (currentContact) {
      updateContact(currentContact.id, formData).then(() => {
        setShowForm(false);
        setCurrentContact(undefined);
      });
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentContact(undefined);
  };

  

  const isEditDeleteDisabled = selectedContactId === null;

  return (
    <div>
      <Header
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isEditDeleteDisabled={isEditDeleteDisabled}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
        selectedContactId={selectedContactId}
        filterOptions={uniqueFilterTypes}
      />
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <ContactForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              username={currentContact?.username}
              user_email={currentContact?.user_email}
              user_phone={currentContact?.user_phone}
              property_type={currentContact?.property_type}
              properties={currentContact?.properties}
              company={currentContact?.company}
              user_photo={currentContact?.user_photo}
            />
          </div>
        </div>
      )}
      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ContactList
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelectContact={setSelectedContactId}
        searchQuery={searchQuery}
        filterType={filterType}

        />
      )}
    </div>
  );
};

export default ContactPage;