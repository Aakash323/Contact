import axios from "axios";
import { useState } from "react";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[a-zA-Z]/.test(formData.username)) {
      setError("Username must start with a letter.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores.");
      return;
    }

    if (
      !/^(?=[a-zA-Z0-9]*[a-zA-Z])[a-zA-Z0-9]+@(gmail\.com|hotmail\.com)$/.test(
        formData.email
      )
    ) {
      setError("Invalid email format.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const { username, email, password } = formData;
    const sendData = { username, email, password };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        sendData
      );
      console.log(res.data);
      alert("User registered sucessfully")
    
    } catch (error) {
      console.error(error);
      setError("Signup failed.Please try again.");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {error && <p className="text-[14px] text-red-700">{error}</p>}
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
