// src/Pages/RegisterPage.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

const RegisterPage = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "Voluntario",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://localhost:7003/api/Auth/register", form);
      alert("Registro exitoso");
      navigate({ to: "/login" });
    } catch (error: any) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          name="id"
          placeholder="ID de usuario"
          value={form.id}
          onChange={handleChange}
          required
          className="mb-4 p-3 border rounded w-full"
        />

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-4 p-3 border rounded w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-4 p-3 border rounded w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-4 p-3 border rounded w-full"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mb-6 p-3 border rounded w-full"
        >
          <option value="Voluntario">Voluntario</option>
          <option value="Aliado">Aliado</option>
          <option value="Administrador">Administrador</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
