import React from "react";
import type { Contact } from "../Context/contactContext";


interface ContactProps extends Contact {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ContactComp: React.FC<ContactProps> = ({
  id,
  username,
  user_email,
  user_phone,
  property_type,
  properties,
  company,
  user_photo,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded shadow mb-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{username}</h3>
        <p>Email: {user_email}</p>
        <p>Phone: {user_phone}</p>
        <p>Property Type: {property_type}</p>
        <p>Properties: {properties}</p>
        <p>Company: {company}</p>
        {user_photo && (
          <img
            src={user_photo}
            alt={username}
            className="w-16 h-16 object-cover rounded-full mt-2"
          />
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactComp;
