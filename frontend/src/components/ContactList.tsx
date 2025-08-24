import type { Contact } from "../Context/contactContext";
import { useState } from "react";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: number | null;
  onSelectContact: (id: number | null) => void;
  searchQuery: string;
  filterType: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onSelectContact,
  searchQuery,
  filterType,
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const filteredContacts = contacts.filter((contact) => {
    if (!contact) return false;

    const username = contact.username ?? "";
    const company = contact.company ?? "";
    const propertyType = contact.property_type ?? "";

    const search = searchQuery?.toLowerCase() ?? "";
    const filter = filterType?.toLowerCase() ?? "";

    const matchesSearch =
      username.toLowerCase().includes(search) ||
      company.toLowerCase().includes(search) ||
      propertyType.toLowerCase().includes(search);

    const matchesFilter = !filter || propertyType.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedContacts([]);
      onSelectContact(null);
    } else {
      const ids = filteredContacts.map((c) => c.id);
      setSelectedContacts(ids);
      onSelectContact(ids.length > 0 ? ids[0] : null); 
    }
    setAllSelected(!allSelected);
  };

  const toggleSelectContact = (id: number) => {
    let newSelected: number[];
    if (selectedContacts.includes(id)) {
      newSelected = selectedContacts.filter((i) => i !== id);
    } else {
      newSelected = [...selectedContacts, id];
    }
    setSelectedContacts(newSelected);
    setAllSelected(newSelected.length === filteredContacts.length);
    onSelectContact(newSelected.length > 0 ? newSelected[0] : null);
  };

  return (
    <div className="p-4">
      <div className="grid gap-6">
        <div className="p-2 border-b font-semibold text-gray-700 flex items-center gap-6 bg-gray-50">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
            className="w-5 h-5 cursor-pointer"
            title="Select All"
          />
          <div className="w-12"></div>
          <div className="min-w-[190px]">Name</div>
          <div className="min-w-[200px]">Email</div>
          <div className="min-w-[180px]">Phone</div>
          <div className="min-w-[200px]">Property Type</div>
          <div className="min-w-[180px]">Company</div>
          <div className="min-w-[180px]">Properties</div>
        </div>

        {filteredContacts.map((contact) => {
          const isSelected = selectedContacts.includes(contact.id);

          return (
            <div
              key={contact.id}
              className={`p-4 border rounded shadow-sm flex items-center gap-4 ${
                isSelected ? "bg-gray-200" : "bg-white"
              } hover:bg-gray-100`}
            >
              <input
              placeholder="checkbox"
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectContact(contact.id)}
                className="w-5 h-5 cursor-pointer"
              />

              {contact.user_photo && (
                <img
                  src={`http://localhost:3000/uploads/${contact.user_photo}`}
                  alt={`${contact.username}'s photo`}
                  className="w-12 h-12 object-cover rounded"
                />
              )}

              <div className="min-w-[190px]">
                <h3 className="text-lg font-semibold">{contact.username}</h3>
              </div>
              <div className="min-w-[200px]">
                <p className="text-sm text-gray-600">{contact.user_email}</p>
              </div>
              <div className="min-w-[220px]">
                <p className="text-sm text-gray-600">{contact.user_phone}</p>
              </div>
              <div className="min-w-[200px]">
                <p className="text-sm text-gray-600">{contact.property_type}</p>
              </div>
              <div className="min-w-[200px]">
                <p className="text-sm text-gray-600">{contact.company}</p>
              </div>
              {contact.properties && (
                <div className="min-w-[180px]">
                  <p className="text-sm text-gray-600">{contact.properties}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
