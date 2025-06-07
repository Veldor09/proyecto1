// src/Components/Aliados/HiddenVoluntarios.ts
const STORAGE_KEY = "hiddenVoluntarios";

export const getHiddenVoluntarios = (): string[] => {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

export const hideAliado = (Id: string) => {
  const hidden = getHiddenVoluntarios();
  if (!hidden.includes(Id)) {
    hidden.push(Id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hidden));
  }
};
