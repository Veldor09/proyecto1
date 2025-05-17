// src/Pages/RegisterPage.tsx
import { useState } from 'react';
import axios from 'axios';
import { hash } from 'bcryptjs';
import { useNavigate } from '@tanstack/react-router';

const API_KEY = '$2a$10$1WE9CA71m8Ipze4nUPEUSORtrEj2XD95J9mSOlGqY53PTrY4mdanW';
const BIN_ID_USUARIOS = '682806fd8960c979a59b20ad';
const BIN_ID_VOLUNTARIOS = '6828075f8a456b79669f617b';
const BIN_ID_ALIADOS = '68250c638561e97a50140565';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'voluntario',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const hashedPassword = await hash(form.password, 10);
      const id = crypto.randomUUID();

      const resUsuarios = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`, {
        headers: { 'X-Master-Key': API_KEY },
      });
      const usuarios = resUsuarios.data.record || [];

      const nuevoUsuario = {
        id,
        name: form.name,
        email: form.email,
        password: hashedPassword,
        role: form.role,
      };

      await axios.put(
        `https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`,
        [...usuarios, nuevoUsuario],
        {
          headers: {
            'X-Master-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (form.role !== 'admin') {
        const binPublico =
          form.role === 'voluntario' ? BIN_ID_VOLUNTARIOS : BIN_ID_ALIADOS;

        const resPublico = await axios.get(`https://api.jsonbin.io/v3/b/${binPublico}`, {
          headers: { 'X-Master-Key': API_KEY },
        });

        const datosPublicos = resPublico.data.record || [];

        const usuarioPublico = {
          id,
          name: form.name,
          email: form.email,
          role: form.role,
        };

        await axios.put(
          `https://api.jsonbin.io/v3/b/${binPublico}`,
          [...datosPublicos, usuarioPublico],
          {
            headers: {
              'X-Master-Key': API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      alert('Registro exitoso');
      navigate({ to: '/login' });
    } catch (error) {
      console.error(error);
      setError('Error al registrar usuario');
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
          <option value="voluntario">Voluntario</option>
          <option value="aliado">Aliado</option>
          <option value="admin">Administrador</option>
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
