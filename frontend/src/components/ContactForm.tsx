
import { useState, useRef } from "react";

interface ContactFormProps {
  username?: string;
  user_email?: string;
  user_phone?: string;
  property_type?: string;
  properties?: string;
  company?: string;
  user_photo?: string;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  username,
  user_email,
  user_phone,
  property_type,
  properties,
  company,
  user_photo,
  onSubmit,
  onCancel,
}) => {
  const [data, setData] = useState({
    username: username || "",
    user_email: user_email || "",
    user_phone: user_phone || "",
    property_type: property_type || "",
    properties: properties || "",
    company: company || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("user_email", data.user_email);
    formData.append("user_phone", data.user_phone);
    formData.append("property_type", data.property_type);
    formData.append("properties", data.properties);
    formData.append("company", data.company);
    console.log(formData);
    
    if (fileInputRef.current?.files?.[0]) {
      formData.append("user_photo", fileInputRef.current.files[0]);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      {user_photo && (
        <div className="mb-2">
          <img src={user_photo} alt="Current photo" className="w-20 h-20 object-cover" />
          <p>Current Photo</p>
        </div>
      )}
      <input
        type="text"
        name="username"
        placeholder="Name"
        value={data.username}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        name="user_email"
        placeholder="Email"
        value={data.user_email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="tel"
        name="user_phone"
        placeholder="Phone"
        value={data.user_phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="property_type"
        placeholder="Property Type"
        value={data.property_type}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="properties"
        placeholder="Properties"
        value={data.properties}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={data.company}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="file"
        placeholder="Photo"
        ref={fileInputRef}
        name="user_photo"
        accept="image/*"
        className="border p-2 w-full mb-2"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ContactForm;