import { useState } from "react";
import { useData } from "../Context/contactContext";
import type { Contact } from "../Context/contactContext";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const ContactPage = () => {
  const {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    fetchContactsByID,
  } = useData();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentContact, setCurrentContact] = useState<Contact | undefined>(
    undefined
  );
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  const [multipleDeleteTrigger, setMultipleDeleteTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const contactsPerPage = 4;

  const uniqueFilterTypes = Array.from(
    new Set(contacts?.map((contact) => contact.property_type))
  );

  const handleAdd = () => {
    setCurrentContact(undefined);
    setMode("add");
    setShowForm(true);
  };

  const handleEdit = async (id: number) => {
    setSelectedContactId(id);
    const contact = await fetchContactsByID(id);
    if (contact) {
      setCurrentContact(contact);
      setMode("edit");
      setShowForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (selectedContactIds.length > 1) {
        await Promise.all(
          selectedContactIds.map((contactId) => deleteContact(contactId))
        );
        setMultipleDeleteTrigger((prev) => prev + 1);
        setSelectedContactIds([]);
        setSelectedContactId(null);
      } else {
        await deleteContact(id);
        setSelectedContactId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    if (mode === "add") {
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

  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

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
        <>
          <ContactList
            contacts={currentContacts}
            selectedContactId={selectedContactId}
            onSelectContact={setSelectedContactId}
            onSelectMultipleContacts={setSelectedContactIds}
            searchQuery={searchQuery}
            filterType={filterType}
            multipleDeleteTrigger={multipleDeleteTrigger}
          />
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactPage;
