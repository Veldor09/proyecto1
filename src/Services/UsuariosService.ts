// src/Services/UsuariosService.ts
import axios from "axios";
import bcrypt from "bcryptjs";

const API_KEY = "$2a$10$JMHiHuAzVzegUTuogZLRq.GRbcBWpFNpkBJ2kgEK4SQ9LQYUxAF0K";
const BIN_ID_USUARIOS = "682806fd8960c979a59b20ad"; // tu nuevo bin
const BIN_ID_ALIADOS = "682807468a456b79669f616e";
const BIN_ID_VOLUNTARIOS = "6828075f8a456b79669f617b";

export async function registrarUsuario({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: "voluntario" | "aliado" | "admin";
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();

  const nuevoUsuario = { id, name, email, password: hashedPassword, role };

  // 1. Obtener usuarios actuales
  const { data: usuariosData } = await axios.get(
    `https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`,
    { headers: { "X-Master-Key": API_KEY } }
  );
  const usuariosActuales = usuariosData.record || [];

  // 2. Guardar nuevo usuario con contraseña
  await axios.put(
    `https://api.jsonbin.io/v3/b/${BIN_ID_USUARIOS}`,
    [...usuariosActuales, nuevoUsuario],
    {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  // 3. Agregar a bin público si es voluntario o aliado
  if (role !== "admin") {
    const binId =
      role === "voluntario" ? BIN_ID_VOLUNTARIOS : BIN_ID_ALIADOS;

    const { data: binData } = await axios.get(
      `https://api.jsonbin.io/v3/b/${binId}`,
      { headers: { "X-Master-Key": API_KEY } }
    );

    const actuales = binData.record || [];
    const publico = { id, name, email, role };

    await axios.put(
      `https://api.jsonbin.io/v3/b/${binId}`,
      [...actuales, publico],
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  }

  return { success: true, id };
}
