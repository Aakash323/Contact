import { useContext, useState } from "react";
import { authContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(authContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res =await login(formData.email, formData.password);
    if(res){
      alert("login sucessfull")
        navigate('/contact')
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Login
      </button>
    </form>
  );
}
